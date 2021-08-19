import React from 'react'

const Person = ({name, number, handler}) => (
    <>
        <p>{name} {number}</p>
        <button onClick={handler}>delete</button>
    </>
)

const Persons = ({show, delHandler}) => (
    <>
        {show.map(({name, number, id}) => <Person key={name} name={name} number={number} handler={() => delHandler(id)}/>)}
    </>
)

export default Persons
