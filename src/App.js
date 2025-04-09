import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherBox from './component/WeatherBox';
import WeatherBtn from './component/WeatherBtn';
import { useEffect, useState } from 'react';
import ClipLoader from "react-spinners/ClipLoader";


/** 이것은 주석이고 나는 서민관이다 고로 존재하지만 난 고로켓을 좋아하진 않는다. 하지만 난 새우가 좋다 고로고로롱 그렇다 그리하였다 여름이 아니다 그렇다 봄이었다.*/
function App() {

  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState(null);

  const cities = ["Seoul", "Berlin", "Moscow", "London"];
  // const cities = ["서울", "베를린", "모스크바", "런던"]; //인덱스 번호 부여해서 넘기는 방법을 생각하긴 했지만 비효율 적인 거 같다

  

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

  //중요: useEffect는 컴포넌트가 처음 렌더링 될 때와 state(배열안에 있는 값)가 바뀔 때마다 실행된다.
  // useEffect(() => {
  //   console.log("city: ", city);
  //   getCity();
  // }, [city]);

  /** 추천어 띄어주는 알고리즘 ㅈㄴ 신기해 "아 서울영감 처음타는 기차놀이에 아오에"*/
  const searchCity = async () => {
    let cityName = 'London';
    /** 하하 이해 안 되노 "차표 파는 아가씨와 실갱이 하네 아오에"*/
    let url = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=aacba06b1013c772f557217737a010a6&units$lang=kr`
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
    setLoading(false);
  }

  const search = () => {
    if(searchInput != null){
      setCity(searchInput);
      setSearchInput(null);
    }
  }

  return (
    <div className="layout">
          {loading ? (<ClipLoader color="red" loading={loading} size={150} aria-label="Loading Spinner" data-testid="loader"/>) :
            (
                <div>
                  {/*<div>*/}
                  {/*  <input type="text" placeholder="검색할 도시를 입력하세요"*/}
                  {/*         value={searchInput}  onClick={searchCity}*/}
                  {/*         style={{margin: '0 20px 20px 0', width: '240px'}}/>*/}
                  {/*  <button onClick={search}>검색</button>*/}
                  {/*</div>*/}
                  <WeatherBox weather={weather}/>
                  <p></p>
                  <WeatherBtn city={city} cities={cities} setCity={setCity}/>
                </div>
            )
          }
      <div className="copyRight">(C) Ms Copilot for making img</div>
    </div>
  );
}

export default App;
