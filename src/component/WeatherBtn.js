import React from 'react'
import { Button } from 'react-bootstrap';
import "../App.css";

const WeatherBtn = ({city, cities, setCity}) => {
    console.log("도시는 " + cities);

    
return (
    <div>
    <Button variant={`${city == null ? "primary" : "secondary"}`} onClick={()=>setCity(null)} >
        현 위치
    </Button>

    {cities.map((item , idx) => (
        <Button variant={`${city === item ? "primary" : "secondary"}`} key={idx}
        onClick={()=>setCity(item)}>
            {item}
        </Button>
        ))}


    </div>
)
}

export default WeatherBtn
