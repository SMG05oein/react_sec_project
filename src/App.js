import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherBox from './component/WeatherBox';
import WeatherBtn from './component/WeatherBtn';
import { useEffect, useState } from 'react';
import ClipLoader from "react-spinners/ClipLoader";


function App() {

  const [weather, setWeather] = useState(null);
  const cities = ["Seoul", "Berlin", "Moscow", "London"];
  const [city, setCity] = useState(null);

  let [loading, setLoading] = useState(true);

  

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
  let url =  `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=aacba06b1013c772f557217737a010a6&units=metric`;
  setLoading(true);
  let response = await fetch(url);
  let data = await response.json();
  console.log(data);
  setWeather(data);
  setLoading(false);
}

const getCity = async () => {
  console.log("getCity");
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=aacba06b1013c772f557217737a010a6&units=metric`;
  setLoading(true);
  let response = await fetch(url);
  let data = await response.json();
  setWeather(data);
  setLoading(false);


}

  useEffect(() => {
    city == null ? getCurrentLocation() : getCity();
  }, [city]);

  //중요: useEffect는 컴포넌트가 처음 렌더링 될 때와 state가 바뀔 때마다 실행된다.
  // useEffect(() => {
  //   console.log("city: ", city);
  //   getCity();
  // }, [city]);


  return (
    <div className="layout">
          {loading ? 
          (<ClipLoader color="red" loading={loading} size={150} aria-label="Loading Spinner" data-testid="loader"/>)
          : 
            (
              <div>
                <WeatherBox weather={weather}/>
                <WeatherBtn city={city} cities={cities} setCity={setCity}/>
              </div>
            )
          }
        <div className="copyRight">(C) Ms Copilot for making img</div>
    </div>
  );
}

export default App;
