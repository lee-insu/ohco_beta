import React, { useEffect, useState } from "react";
import axios from "axios";
import { defaultGeo, handleGeoSuccess } from "../service/location";
import { useDispatch } from "react-redux";
import style from "../styles/Temperature.module.css";
import * as tempAction from "../store/modules/temp";
import { logEvent } from "firebase/analytics";
import { analytics } from "../service/firebase";

const Temperature = () => {
  const dispatch = useDispatch();
  const [area, getArea] = useState("");
  const [weather, getWeather] = useState("");
  const [temp, getTemp] = useState("");
  const [triger, setTriger] = useState(false);

  const handleWeather = (weather) => {
    let main = "";

    switch (weather) {
      case "Clear":
        main = "맑음";
        break;
      case "Clouds":
        main = "흐림";
        break;
      case "Atmosphere":
        main = " 기압";
        break;
      case "Snow":
        main = "눈";
        break;
      case "Rain":
        main = "비";
        break;
      case "Drizzle":
        main = "이슬비";
        break;
      case "Thunderstorm":
        main = "천둥";
        break;
      case "Mist":
        main = "안개";
        break;
      case "Haze":
        main = "흐림";
      default:
        return main;
    }
    return main;
  };
  const weatherKr = handleWeather(weather);

  useEffect(() => {
    defaultGeo().then(
      axios.spread((res1, res2) => {
        getArea(res1.data.documents[0].region_2depth_name);
        dispatch(tempAction.getTemp(Math.round(res2.data.main.temp) - 273));
        getTemp(Math.round(res2.data.main.temp) - 273);
        getWeather(res2.data.weather[0].main);
      })
    );
  }, []);

  const handleLocation = (e) => {
    e.preventDefault();
    if (confirm("현재 위치로 코디를 찾을까요?")) {
      navigator.geolocation.getCurrentPosition(handleGeo);

      function handleGeo(position) {
        try {
          handleGeoSuccess(position).then(
            axios.spread((res1, res2) => {
              getArea(res1.data.documents[0].region_2depth_name);
              dispatch(
                tempAction.getTemp(Math.round(res2.data.main.temp) - 273)
              );
              getTemp(Math.round(res2.data.main.temp) - 273);
              getWeather(res2.data.weather[0].main);
              logEvent(analytics, "click_temperature", { name: "temperature" });
              setTriger(true);
            })
          );
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      return;
    }
  };

  return (
    <div className={style.container}>
      {!triger ? (
        <div className={style.flex}>
          <div>
            서울 {area}, {weatherKr} {temp ? `${temp}°C` : null}
          </div>
          <img
            src="/icon/location.svg"
            onClick={handleLocation}
            className={style.location_btn}
          />
        </div>
      ) : (
        <div className={style.flex}>
          <div>
            {area}, {weatherKr} {temp ? `${temp}°C` : null}
          </div>
          <img
            src="/icon/location.svg"
            onClick={handleLocation}
            className={style.location_btn}
          />
        </div>
      )}
    </div>
  );
};

export default Temperature;
