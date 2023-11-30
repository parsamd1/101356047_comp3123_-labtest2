import React, {useContext} from 'react';
import WeatherContext from "../context/WeatherContext";

function WeatherDetails() {
    const {weatherInfo}=useContext(WeatherContext)
    return (
        <div>
            <h2>{weatherInfo.name}</h2>
        </div>
    );
}

export default WeatherDetails;