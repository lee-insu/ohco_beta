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
      `https://api.openweathermap.org/data/2.5/weather?lon=${lon}&lat=${lat}&appid=${weatherApi}`
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
      `https://api.openweathermap.org/data/2.5/weather?lon=127.04020267241&lat=37.547076399306&appid=${weatherApi}`
    ),
  ]);
  return location;
};

export { handleGeoSuccess, defaultGeo };
