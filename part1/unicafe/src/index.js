import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({text}) => <h1>{text}</h1>
const Button = ({handler, text}) => <button onClick={handler}>{text}</button>
const Statistic = ({name, value}) => {
  return(
    <tr><th>{name}</th>
    <td>{value}</td></tr>)}
const Stats = ({list}) => {
  if(list[0].calc === 0 && list[1].calc === 0 && list[2].calc === 0){
    return (<p>No feedback given</p>)
  }
  else{
    return(list.map(({name, calc}) => <Statistic name={name} value={calc} />))
  }
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const stateIncrementer = (state, setFunc) => () => {
    return setFunc(state + 1)
  }
  const sum = () => good + neutral + bad

  const avg = () => {
    const total = sum()
    if(total === 0)
      return 0
    else
      return (good - bad)/total
  }
  const ppPositive = () => {
    const total = sum()
    if(total === 0)
      return 0 + '%'
    else
      return (good/total) * 100 + '%'
  }

  const statList = [
    {
      name: 'good',
      calc: good
    },
    {
      name: 'neutral',
      calc: neutral
    },
    {
      name: 'bad',
      calc: bad
    },
    {
      name: 'all',
      calc: sum()
    },
    {
      name: 'average',
      calc: avg()
    },
    {
      name: 'positive',
      calc: ppPositive()
    }
  ]
  return (
    <div>
      <Header text="give feedback" />
      <br />
      <Button handler={stateIncrementer(good, setGood)} text='good' />
      <Button handler={stateIncrementer(neutral, setNeutral)} text='neutral' />
      <Button handler={stateIncrementer(bad, setBad)} text='bad' />
      <br />
      <Header text="statistics" />
      <Stats list={statList} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
