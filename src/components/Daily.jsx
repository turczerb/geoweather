import React, { useState, useEffect } from "react";

const Daily = () => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);
  const [data, setData] = useState([]);
  const [weather, setWeather] = useState({});
  const [input, setInput] = useState("");

  useEffect(() => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("Locating...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(null);
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
        },
        () => {
          setStatus("Unable to retrieve your location");
        }
      );
    }
  }, []);

  /*const getForecast = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=` +
        lat +
        `&lon=` +
        lng +
        `&appid=177a04130a3df2d906d4ae4c080dc475`
    )
      .then((response) => response.json())
      .then((data) => setData(data));
  };*/

  //https://us1.locationiq.com/v1/reverse.php?key=pk.c45758c2b83581dc069f69549827039f&lat=47.4922662&lon=19.0318616&format=json

  const cityName = (props) => {
    console.log("getting cityname");
    fetch(
      `https://us1.locationiq.com/v1/reverse.php?key=pk.c45758c2b83581dc069f69549827039f&lat=` +
        lat +
        `&lon=` +
        lng +
        `&format=json`
    )
      .then((response) => response.json())
      .then((data) => setData(data));
    console.log("finished get cityname");
  };

  const search = (props) => {
    fetch(
      `http://api.weatherapi.com/v1/current.json?key=f8ea03577810484b92f140651222803&q=${data.address.city}&aqi=no`
    )
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
        setInput("");
        console.log(result);
      });
  };

  return data.address !== undefined ? (
    weather.current !== undefined ? (
      <div>
        <div>
          {lat && <p>Latitude: {lat}</p>}
          {lng && <p>Longitude: {lng}</p>}
          <p>
            {data.address.city}, {data.address.country}
          </p>
          <div> {weather.location.name}</div>
          <img src={weather.current.condition.icon} alt="Logo" />
          <div>{weather.current.condition.text}</div>
          <div>temperature {weather.current.temp_c}°C</div>
          <div>wind speed {weather.current.wind_kph}kph</div>
          <div> UV {weather.current.uv}</div>
        </div>
      </div>
    ) : (
      <div>
        <div>
          <button onClick={search}>Get Forecast</button>
          {lat && <p>Latitude: {lat}</p>}
          {lng && <p>Longitude: {lng}</p>}
          <p>{data.address.city}</p>
        </div>
      </div>
    )
  ) : (
    <div>
      <button onClick={cityName}>Get Location</button>
    </div>
  );
};

export default Daily;
