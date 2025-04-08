import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import sun_icon from '../assets/sun.png'
import rain_icon from '../assets/rain.png'
import wind_icon from '../assets/wind.png'
import partlycloudy_icon from '../assets/partlycloudy.png'
import storm_icon from '../assets/storm.png'
import cloudy_icon from '../assets/cloudy.png'
import snow_icon from '../assets/snow.png'
import night_icon from '../assets/night.png'
import cnight_icon from '../assets/cloudnight.png'
import humidity_icon from '../assets/humidity.png'


const Weather = () => {

    const inputRef = useRef()

    const [weatherData, setWeatherData] = useState(false);

    const allIcons = {
        "01d": sun_icon,
        "01n": night_icon,
        "02d": partlycloudy_icon,
        "02n": cnight_icon,
        "03d": cloudy_icon,
        "03n": cloudy_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "11d": storm_icon,
        "11n": storm_icon,
        "13d": snow_icon,
        "13n": snow_icon
    }

    const search = async (city)=>{
        if(city === ""){
            alert("Enter a City Name Please")
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

            const response = await fetch(url);
            const data = await response.json();

            if(!response.ok){
                alert(data.message);
                return;
            }

            console.log(data);
            const icon = allIcons[data.weather[0].icon] || clear_icon;
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor (data.main.temp),
                location: data.name,
                icon: icon
            })
        } catch (error) {
            setWeatherData(false);
            console.error("error fetching the weather data")
        }
    }

    useEffect(()=>{
        search("Orlando");
    },[]);



  return (
    <div className='weather'>
      <div className="search-bar">
        <input ref={inputRef} type='text' placeholder='Search'/>
        <img src={search_icon} alt="" onClick={()=>search(inputRef.current.value)}/>
      </div>
      {weatherData?<>
        <img src={weatherData.icon} alt="" className='weather-icon'/>
      <p className='temperature'>{weatherData.temperature}°c</p>
      <p className='location'> {weatherData.location}</p>
      <div className="weather-data">
        <div className='col'>
            <img src={wind_icon} alt=""/>
            <div>
                <p>{weatherData.windSpeed} Km/h</p>
                <span>Wind Speed</span>
            </div>
        </div>
        <div className='col'>
            <img src={humidity_icon} alt=""/>
            <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
            </div>
        </div>
      </div>
      </>:<></>}
      
    </div>
  )
}

export default Weather
