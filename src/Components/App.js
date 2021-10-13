import React, { useState, useEffect } from "react";
import { makeBackgroundColor } from "../utils/color";
import {
  getWeatherByCityName,
  getWeatherByCoordsAPI,
} from "../utils/ServiceApi";
import Searchbar from "./Searchbar/Searchbar";

export default function App() {
  const [latt, setLatt] = useState("");
  const [long, setLong] = useState("");
  const [query, setQuery] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLatt(position.coords.latitude);
      setLong(position.coords.longitude);
    });
  }, []);

  useEffect(() => {
    if (latt === "" || long === "") {
      return;
    }
    getWeather();
  }, [latt, long]); /* eslint-disable-line*/

  useEffect(() => {
    if (query === "") {
      return;
    }
    getWeatherByQuery();
  }, [query]); /* eslint-disable-line*/

  const getWeather = () => {
    getWeatherByCoordsAPI({ latt, long })
      .then((data) => {
        console.log(data);
        setWeatherData({
          icon: data.weather[0].icon,
          description: data.weather[0].description,
          temp: data.main.temp,
          // temp_min: data.main.temp_min,
          // temp_max: data.main.temp_max,
          // name: data.name,
          // country: data.sys.country,
          // coord: data.coord,
        });
      })
      .catch((error) => {
        setError(error);
      });
  };

  const getWeatherByQuery = () => {
    getWeatherByCityName(query)
      .then((data) => {
        console.log(data);
        setWeatherData({
          icon: data.weather[0].icon,
          description: data.weather[0].description,
          temp: data.main.temp,
          temp_min: data.main.temp_min,
          temp_max: data.main.temp_max,
          name: data.name,
          country: data.sys.country,
          coord: data.coord,
        });
      })
      .catch((error) => {
        setError(error);
      });
  };

  const handleFormSubmit = (query) => {
    setQuery(query);
  };

  const handleChange = (event) => {
    setWeatherData({ temp: event.target.value });
  };

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />
      {error && (
        <div className="container">
          <h4>{error.message}</h4>
        </div>
      )}
      {latt && long && !error && !query && (
        <div
          className="container"
          style={{
            backgroundColor: makeBackgroundColor(weatherData.temp),
          }}
        >
          {weatherData.icon && (
            <img
              src={`http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
              alt={weatherData.description}
              className="icon"
            />
          )}
          {weatherData.temp && (
            <div className="slidecontainer">
              <label className="label">
                Temperature: {weatherData.temp} °С
                <input
                  className="slider"
                  type="range"
                  min="-50"
                  max="50"
                  value={weatherData.temp}
                  onChange={handleChange}
                  step="1"
                />
              </label>
            </div>
          )}
        </div>
      )}
      {query && weatherData.coord && (
        <div className="resultContainer">
          <img
            src={`http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
            alt={weatherData.description}
          />
          <div className="wrapper">
            <p className="accent">
              {weatherData.name}, {weatherData.country}
              <span className="description">{weatherData.description}</span>
            </p>
            <p className="tempData">
              <span className="temp">{weatherData.temp} °С</span> temperature
              from
              {weatherData.temp_min} to {weatherData.temp_max} °С
            </p>
            <p>
              Geo coords{" "}
              <span className="accent">
                [{weatherData.coord.lat}, {weatherData.coord.lon}]
              </span>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
