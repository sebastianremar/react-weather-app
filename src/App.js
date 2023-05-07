import './App.css';
import Search from './components/search/search';
import CurrentWeather from './components/current-weather/current-weather';
import { validateResponse } from 'react-select-async-paginate';
import { WEATHER_API } from './api';
import { useState } from 'react';
import Forecast from "./components/forecast/forecast";


function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeather = fetch(`${WEATHER_API.url}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API.key}`);
    const currentForecast = fetch(`${WEATHER_API.url}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API.key}`);

    Promise.all([currentWeather, currentForecast])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setWeather({city: searchData.label, ...weatherResponse});
        setForecast({city: searchData.label, ...forecastResponse});
      }).catch((err) => console.log(err));
  }

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange}/>
      {weather && <CurrentWeather data={weather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
