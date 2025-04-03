import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherBox from './component/WeatherBox';
import WeatherBtn from './component/WeatherBtn';
import { useEffect, useState } from 'react';

function App() {

  const getCurrentLocation = () => {
    // console.log("getCurrentLocation");
    navigator.geolocation.getCurrentPosition((position) => { //위도 경도 받기
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon);
      // console.log("현재 위치: ", lat, lon);
    });
  }

const getWeatherByCurrentLocation = async(lat, lon) =>{
  let url =  `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=aacba06b1013c772f557217737a010a6`;
  let response = await fetch(url);
  let data = await response.json();
  console.log(data);
}

  useEffect(() => {
    getCurrentLocation();
  }, []);

  useState([], () => {});

  return (
    <div className="layout">
        <div>
          <WeatherBox />
          <WeatherBtn />
        </div>
    </div>
  );
}

export default App;
