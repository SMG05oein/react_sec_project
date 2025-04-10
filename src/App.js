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
  const [searchInput, setSearchInput] = useState(""); //그냥 한잔해 시원시원해 어 그래
  const [suggestions, setSuggestions] = useState([]); //추천어 띄울 때 배열 담는 거임.

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
  let url =  `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=aacba06b1013c772f557217737a010a6&units=metric&lang=kr`;
  try{
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    setWeather(data);
    setLoading(false);
  }catch(error){alert("위도 경도 데이터를 못 불러왔습니다. \n페이지를 새로고침 합니다.");window.location.reload();}
}

const getCity = async () => {
  console.log("getCity");
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=aacba06b1013c772f557217737a010a6&units=metric&lang=kr`;
  try{
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
    setLoading(false);
  }catch(error){alert("도시 데이터를 못 불러왔습니다. \n페이지를 새로고침 합니다.");window.location.reload();}


}

  useEffect(() => {
    city == null ? getCurrentLocation() : getCity();
  }, [city]);

  //중요: useEffect는 컴포넌트가 처음 렌더링 될 때와 state(배열안에 있는 값)가 바뀔 때마다 실행된다.
  // useEffect(() => {
  //   console.log("city: ", city);
  //   getCity();
  // }, [city]);

  /** 추천어 띄어주는 알고리즘 ㅈㄴ 신기해 "아 서울영감 처음타는 기차놀이에 아오에"
   * 이 함수는 input박스에서 입력 받은 value값을 비동기적로 받고 처리함*/
  const searchCity = async (e) => {
    let cityName = e.target.value;
    setSearchInput(cityName);

    if(cityName.length > 0){
      /**"차표 파는 아가씨와 실갱이 하네 아오에"*/
      let url = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=aacba06b1013c772f557217737a010a6&units&lang=kr`
      let response = await fetch(url);
      let data = await response.json();
      const cityNames = data.map(city => city.name);;
      setSuggestions(cityNames);
      // setLoading(false);
    }else {
      setSuggestions([]);
    }
  }

  const handleSearch = () => {
    if(searchInput != null){
      setCity(searchInput);
      setSearchInput("");
      setSuggestions([]);
    }
  }
  const handleSuggestionClick = (suggestedCity) => {
    setCity(suggestedCity);
    setSearchInput("");
    setSuggestions([]);
  }

  return (
    <div className="layout">
          {loading ? (<ClipLoader color="red" loading={loading} size={150} aria-label="Loading Spinner" data-testid="loader"/>) :
            (
                <div className="layout">
                  <div className="search">
                    <i style={{fontSize: "10px"}}>이거 이거 신기하구만~~</i><br></br>
                    <input type="text" placeholder="검색할 도시를 입력하세요"
                           value={searchInput}  onChange={searchCity}
                           style={{margin: '0 20px 20px 0', width: '300px'}}/>
                    {/*<button onClick={handleSearch}>검색</button>*/}
                    {/**일단 이 주석이 있다는 건 내가 이해 못 했다는 거 "이세상에 에누리 장사어딨어? 아 깎아달라 졸라대니 와이런 질색"*/}
                    {suggestions.length > 0 && (
                        <ul className="suggestion-box">
                          {suggestions.map((suggestedCity, idx) => (
                              <li
                                  key={idx}
                                  style={{ cursor: 'pointer' }}
                                  onClick={() => handleSuggestionClick(suggestedCity)}
                              > {/*!--이거 누구껀가 했다ㅋㅋㅋㅋㅋㅋ--*/}
                                {suggestedCity} {/*검색어 넣었을 때 배열 출력*/}
                              </li>
                          ))}
                        </ul>
                    )}
                  </div>
                  <WeatherBox weather={weather}/>
                  <br/>
                  <WeatherBtn city={city} cities={cities} setCity={setCity}/>
                </div>
            )
          }
      <div className="copyRight">(C) Ms Copilot for making img</div>
    </div>
  );
}

export default App;
