import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const getCurrentLocation = () => {
    // console.log("getCurrentLocation");
    navigator.geolocation.getCurrentPosition((position) => { //위도 경도 받기
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      console.log("현재 위치: ", lat, lon);
    });

  }
  

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <div >
      ssss
    </div>
    // API keys: aacba06b1013c772f557217737a010a6 이거 도용하면 고소할 거임
  );
}

export default App;
