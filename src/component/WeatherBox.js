import React from 'react'


/*object형으로 파라미터를 받을 때는 {}로 감싸서 데이터를 받을 수 있다.
근데 JS안 들어서 모르겠다. 그러므로 들어야겠다 그런 것이다. 시원하게 가자잇
가지고 올 때 주의사항: 값을 던질 때 키값(파라미터 명)이 받는 쪽에서 이름이 같아야 함 */
const WeatherBox = ({weather}) => {
    console.log("날씨는" + weather);
    try {
        return (
            <div className="weather-box">
                <div>{weather ? "선택한 위치: " + weather.name : ""}</div>
                <h2>{weather ? weather.main.temp : ""}°C
                    | {weather ? (weather.main.temp * 1.8 + 32).toFixed(2) : ""}°F</h2>
                <h3>{weather ? weather.weather[0].description : ""}</h3>

            </div>
        )
    }catch(err) {alert("오류 발생 페이지를 새로고침 합니다");window.location.reload();}
}
export default WeatherBox
