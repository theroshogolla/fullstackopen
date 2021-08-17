import React from 'react'

const Person = ({name, number}) => (
    <>
        <p>{name} {number}</p>
    </>
)

const Persons = ({show}) => (
    <>
        {show.map(({name, number}) => <Person key={name} name={name} number={number} />)}
    </>
)

export default Persons
