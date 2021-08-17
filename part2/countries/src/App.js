import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Countries from './components/Countries'

const App = () => {
    const [ countries, setCountries ] = useState([])
    const [ showCountries, setShowCountries ] = useState([])
    const [ weatherData, setWeatherData ] = useState({})
    const [ search, setSearch ] = useState('')

    useEffect(() => {
        axios
        .get("https://restcountries.eu/rest/v2/all")
        .then(response => {
            setCountries(response.data)
        })
    }, [])

    //use an effect to fetch weather data
    //use this effect only when the list of displayed countries changes
    //and fetch the weather data of the first country in the list.
    //this works because I only render weather data when there is
    //only one country in showCountries.
    //when there are no countries to display,
    //the GET request is not performed and the weather data is reset,
    //to avoid stale data and requesting from an invalid address
    useEffect(() => {
        if(showCountries.length === 0) {
            setWeatherData({})
        }
        else {
            const api_key = process.env.REACT_APP_API_KEY
            axios
            .get(`http://api.openweathermap.org/data/2.5/weather?q=${showCountries[0]["capital"]}&appid=${api_key}&units=metric`)
            .then(response => {
                setWeatherData(response.data)
            })
        }
    }, [showCountries])



    const handleSearch = (event) => {
        setSearch(event.target.value)
        if(event.target.value === '') {
            setShowCountries([])
        }
        else {
            setShowCountries(countries.filter(({name}) => name.toLowerCase().includes(event.target.value.toLowerCase())))
        }

    }

    return (
        <div>
            <h1>Country Data</h1>
            Search: <input value={search} onChange={handleSearch}/>
            <Countries show={showCountries} setShow={setShowCountries} weather={weatherData} />
        </div>
    )
}

export default App;
