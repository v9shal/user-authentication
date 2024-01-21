import React, { useState } from "react";
import"./weather.css";
const Weather=()=>{

    const [searchInput,setSearchInput]=useState('');
    const [weatherInput,setWeatherInput]=useState({
        temp:20,
        city:'London',
        windspeed:2.3,
        humidity:56,
    });
const api_key="d15c46d289d2970e7f16fd806e4e5793";
const search= async()=>{

    if(searchInput===''){
        return 0;
    }
    
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&units=Metric&appid=${api_key}`
    
 try {
    let response= await fetch(url);
    let data= await response.json();
    console.log(data)

    setWeatherInput({
        temp:data.main.temp,
        windspeed:data.wind.speed,
        humidity:data.main.humidity,
        city:data.name,
    })
 } catch (error) {
    console.error(error);
    
 }
}




    return (
      <div className="weather">
        <div className="COntainer-search">
            <input type="text" id="search" placeholder="Search" onChange={(e)=>{
                setSearchInput(e.target.value);
            }}/>
            <button onClick={search}>Search</button>
        </div>
        <div className="temp"> Temperature:{weatherInput.temp}</div>
        <div className="city"> city name:{weatherInput.city}</div>
        <div className="humidity"> humidity:{weatherInput.humidity}</div>
        <div className=" windspeed"> windspeed:{weatherInput.windspeed} </div>
      </div>
    )
}
export default Weather;