import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'

const Search = ({text, handler}) => {
  return (
    <>
    <strong>find countries: </strong>
    <input value={text} onChange={handler} />
    </>
  )
}
const Weather = ({data, display}) => {
  if(display){
    return(<>
      <strong>Temperature: </strong> {data.temperature} Celsius
      <br />
      <img src={data["weather_icons"][0]} width='100px' height='100px' alt='weather icon' />
      <br />
      <strong>Wind: </strong> {data.wind_speed} mph direction {data.wind_dir}
      </>)
  }
  return(
    <>
    <p><strong>Unable to display weather. API Error :(</strong></p>
    <p><strong>Info: </strong> {data.info}</p>
    </>)
}
const Country = ({data}) => {
  const [displayWeather, setDisplayWeather] = useState(true)
  const [weatherInfo, setWeatherInfo] = useState({
    temperature: 0,
    weather_icons: [],
    wind_speed: 0,
    wind_dir: ''
  })
  const api_key = process.env.REACT_APP_WEATHER_API_KEY

  useEffect(() => {
    axios
    .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${data.capital}`)
    .then((response) => {
      if(response.data.hasOwnProperty("error")){
          setDisplayWeather(false)
          setWeatherInfo(response.data.error)
      }
      else{
        setDisplayWeather(true)
        setWeatherInfo(response.data.current)
      }

    })
  }, [data])

  return (
    <>
    <h2>{data.name}</h2>
    <br />
    <p>Capital {data.capital}</p>
    <p> Population {data.population}</p>
    <br />
    <h3>Languages</h3>
    <ul>
    {data.languages.map((language) => <li key={language.iso639_2}>{language.name}</li>)}
    </ul>
    <img src={data.flag} width='100px' height='100px' alt={`${data.name}'s flag`}/>
    <h3>Weather in {data.capital}</h3>
    <Weather data={weatherInfo} display={displayWeather} />
    </>
  )
}

const Display = ({countries, viewHandler}) => {
  const handleClick = (id) => {
    const index = countries.findIndex((country) => country.alpha3Code === id)
    const newViewSetting = [...viewHandler.array]
    newViewSetting[index] = !newViewSetting[index]
    viewHandler.set(newViewSetting)
  }

  if(countries.length > 10){
    return (<p>Too many matches, specify another filter</p>)
  }
  else if (countries.length > 1 && countries.length <= 10){
    return (countries.map((country, index) => {
      const displayCountry = viewHandler.array[index]?
        (<div key={country.alpha3Code}>
          <Country key={country.alpha3Code} data={country} />
          <button key={country.alpha2Code} onClick={() => handleClick(country.alpha3Code)}>hide</button>
        </div>)
        :
        (<div key={country.alpha3Code}>
          <p key={country.alpha3Code}>{country.name}</p>
          <button key={country.alpha2Code} onClick={() => handleClick(country.alpha3Code)}>show</button>
        </div>)
      return (displayCountry)
    }))
  }
  else if (countries.length === 1){
    return (<Country data={countries[0]} />)
  }
  return null
}

const App = () => {
  const [data, setData] = useState([])
  const [query, setQuery] = useState('')
  const [display, setDisplay] = useState([])
  const [showDetailed, setShowDetailed] = useState([])
  useEffect(() => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then((response) => setData(response.data))
  }, [])

  const searchHandler = (event) => {
      if(event.target.value === ''){
        setDisplay([])
        setShowDetailed([])
      }
      else{
        const newDisplay = data.filter(({name}) => name.toLowerCase().includes(event.target.value.toLowerCase()))
        const newShowDetailed = new Array(newDisplay.length)
        newShowDetailed.fill(false)
        setDisplay(newDisplay)
        setShowDetailed(newShowDetailed)
      }
      setQuery(event.target.value)

  }

  return (
    <div>
    <Search text={query} handler={searchHandler} />
    <Display countries={display} viewHandler={{array: showDetailed, set: setShowDetailed}} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
