import axios from "axios";

const handleGeoSuccess = async (position) => {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const weatherApi = process.env.NEXT_PUBLIC_WEATHER_API;

  const location = await axios.all([
    axios.get(
      `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${lon}&y=${lat}`,
      {
        headers: {
          Authorization: process.env.NEXT_PUBLIC_KAKAO_AUTHZ,
        },
      }
    ),
    axios.get(
      `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=2&appid=${weatherApi}`
    ),
  ]);
  return location;
};

const defaultGeo = () => {
  const weatherApi = process.env.NEXT_PUBLIC_WEATHER_API;

  const location = axios.all([
    axios.get(
      `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=127.04020267241&y=37.547076399306`,
      {
        headers: {
          Authorization: process.env.NEXT_PUBLIC_KAKAO_AUTHZ,
        },
      }
    ),
    axios.get(
      `https://api.openweathermap.org/data/2.5/forecast/daily?lat=36.8166117&lon=127.1580958&cnt=2&appid=${weatherApi}`
    ),
  ]);
  return location;
};

export { handleGeoSuccess, defaultGeo };
