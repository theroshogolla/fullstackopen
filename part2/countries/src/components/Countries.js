import React from 'react'

import Country from './Country'

const Display = ({name, handler}) => (
    <>
        <p>{name}</p><button value={name} onClick={handler}>show</button>
    </>
)

const Countries = ({show, setShow, weather, setWeather}) => {

    const handleShow = (event) => {
        const country = show.find(({name}) => name === event.target.value)
        setShow([country])
    }

    if(show.length > 10) {
        return (
            <>
                <p>Too many matches, narrow the search.</p>
            </>
        )
    }
    else if(show.length <= 10 && show.length !== 1) {
        return (
            <>
                {show.map(({name}) => <Display key={name} name={name} handler={handleShow} />)}
            </>
        )
    }
    else {

        return (
            <>
                <Country data={show[0]} weatherData={weather} />
            </>
        )
    }
}

export default Countries
