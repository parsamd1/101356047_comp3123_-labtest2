import React, {useEffect, useState} from 'react';
import './weather.css'
import WeatherContext from "../context/WeatherContext";
import WeatherDetails from "./WeatherDetails";

function Weather() {
    // const [icon, setIcon]=useState('10d')
    const [city, setCity]=useState('London')
    const [weatherInfo, setWeatherInfo]=useState([])


    // let iconURL=`https://openweathermap.org/img/wn/${icon}@2x.png`

        useEffect(()=>{
            const fetchData=async ()=>{
                await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=9b30575ac7ea5e4698b0b68b4d895a97`)
                    .then(res=> res.json())
                    .then(data => {

                            console.log(data)
                            setWeatherInfo(data)

                    })
                    .catch((e)=> {
                        console.log('Error caught: ' + e)
                    })
            }
            fetchData()
        }, [city])


    function kelvinToCelsius(kelvin){
        try {
            return (parseFloat(kelvin) - 273).toFixed(2)
        }
        catch (e) {
            return null;
        }
    }
    function handleData(){
        try{
            let icon=weatherInfo.weather[0].icon
            let iconURL=`https://openweathermap.org/img/wn/${icon}@2x.png`
            return (
                <div id='container' className='weather-container'>
                    <div>
                    <h1>City Information</h1>
                        <div className='citymain'>
                <h2>{weatherInfo.name}, {weatherInfo.sys.country}</h2>
                <h4>Coordinates</h4>
                    <p>Longitude: {weatherInfo.coord.lon}</p>
                    <p>Latitude: {weatherInfo.coord.lat}</p>
                        </div>
                    </div>



                    <div>
                <h1>Weather Information</h1>
                        <div className='main'>
                <h2>Main</h2>
                        <p>Temperature: {kelvinToCelsius(weatherInfo.main.temp)}</p>
                        <p>Feels like: {kelvinToCelsius(weatherInfo.main.feels_like)}</p>
                        <p>Min. Temperature: {kelvinToCelsius(weatherInfo.main.temp_min)}</p>                        <p>Minimum Temperature: {weatherInfo.main.temp_min}</p>
                        <p>Max. Temperature: {kelvinToCelsius(weatherInfo.main.temp_max)}</p>
                        <p>Pressure: {weatherInfo.main.pressure}</p>
                        <p>Humidity: {weatherInfo.main.humidity}%</p>
                        <p>Visibility: {weatherInfo.main.visibility}</p>
                        </div>
                        <div className='wind'>
                        <h2>Wind</h2>
                            <p>Speed: {weatherInfo.wind.speed}</p>
                            <p>Degree: {weatherInfo.wind.deg}</p>
                        </div>
                        <div className='clouds'>
                            <h2>Clouds</h2>
                            <p>Clouds: {weatherInfo.clouds.all}</p>
                        </div>
                        <div className='weather'>
                            <h2>Details</h2>
                            <p>Main: {weatherInfo.weather[0].main}</p>
                            <p>Description: {weatherInfo.weather[0].description}</p>

                            <img src={iconURL} alt='iconWeather' />

                        </div>
                    </div>
                </div>
            )
        }catch (e){
            console.log(e)
        }
    }

    return (
        <div>
            <h2>Weather Information</h2>
            <input
            type='text'
            placeholder='City Name...'
            onChange={(event)=>setCity(event.target.value)}
            />
            {handleData()}


        </div>
    );
}

export default Weather;