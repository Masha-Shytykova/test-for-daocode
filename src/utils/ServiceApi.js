const API_KEY = "5595ed04020806764d837300571a7295";

export const getWeatherByCoordsAPI = ({ latt, long }) => {
  return fetch(
    `http://api.openweathermap.org/data/2.5/weather?lat=${latt}&lon=${long}&units=metric&appid=${API_KEY}`
  ).then((r) => {
    if (r.ok) {
      return r.json();
    }
    return Promise.reject(
      new Error(`No results were found for ${latt}, ${long}`)
    );
  });
};

export const getWeatherByCityName = (cityName) => {
  return fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
  ).then((r) => {
    if (r.ok) {
      return r.json();
    }
    return Promise.reject(new Error(`No results were found for ${cityName}`));
  });
};
