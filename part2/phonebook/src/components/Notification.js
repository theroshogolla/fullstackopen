import React from 'react'

const Notification = ({message, error}) => {
    const successStyle = {
        color: 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }

    const errorStyle = {
        color: 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }

    if(message) {
        return (
            <div style={error ? errorStyle : successStyle}>
                {message}
            </div>
        )
    }
    else {
        return null
    }

}

export default Notification
