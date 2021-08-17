import React from 'react'

const Country = ({data, weatherData}) => {
    return (
    <>
        <h2>{data["name"]}</h2>
        <p>Capital {data["capital"]}</p>
        <p>Population {data["population"]}</p>
        <h3>Languages</h3>
        <ul>
            {data["languages"].map(({iso639_1, name}) => <li key={iso639_1}>{name}</li>)}
        </ul>
        <img src={data["flag"]} alt={`Flag of ${data["name"]}`}/>
        <h3>Weather in {data["capital"]}</h3>
        <p><strong>Temperature:</strong> {weatherData["main"]["temp"]} Celsius</p>
        <p><strong>Wind:</strong></p>
        <p>Speed {weatherData["wind"]["speed"]} m/s</p>
        <p>Direction {weatherData["wind"]["deg"]} degrees</p>
        <img src={`http://openweathermap.org/img/wn/${weatherData["weather"][0]["icon"]}@2x.png`} alt={`Icon for weather in ${data["capital"]}`}/>
    </>
)}

export default Country
