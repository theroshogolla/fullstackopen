import React from 'react'

const Search = ({inputVal, handler}) => (
    <>
        filter results containing: <input value={inputVal} onChange={handler}/>
    </>
)

export default Search
