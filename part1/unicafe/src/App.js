import React, { useState } from 'react'

const Header = () => (
    <>
        <h1>Give Feedback</h1>
    </>
)

const Button = ({text, handler}) => (
    <>
        <button onClick={handler}>{text}</button>
    </>
)

const StatLine = ({text, value}) => (
    <>
        <tr>
            <td>{text}</td><td>{value}</td>
        </tr>
    </>
)

const Stats = ({numGood, numBad, numNeutral}) => {
    if(numGood === 0 && numBad === 0 && numNeutral === 0) {
        return (
            <>
                <h1>Statistics</h1>
                <p>No feedback given</p>
            </>
        )
    }
    else {
        return (
            <>
                <h1>Statistics</h1>
                <table>
                    <tbody>
                        <StatLine text="Good" value={numGood} />
                        <StatLine text="Neutral" value={numNeutral} />
                        <StatLine text="Bad" value={numBad} />
                        <StatLine text="Average"
                        value={(numGood - numBad) / (numGood + numNeutral +numBad)} />
                        <StatLine text="Positive"
                        value={`${((numGood) / (numGood + numNeutral +numBad)) * 100}%`} />
                    </tbody>
                </table>
            </>
        )
    }
}

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
    <div>
      <Header />
      <Button text="Good" handler={() => setGood(good + 1)} />
      <Button text="Neutral" handler={() => setNeutral(neutral + 1)} />
      <Button text="Bad" handler={() => setBad(bad + 1)} />
      <Stats numGood={good} numNeutral={neutral} numBad={bad} />
    </div>
    )
}

export default App
