import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({text}) => <h1>{text}</h1>
const Button = ({text, handleClick}) => <button onClick={handleClick}>{text}</button>
const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [voteData, setVotes] = useState({
    votes: (new Array(props.anecdotes.length)).fill(0),
    max: 0
  })

  const updateVotes = () => {
    const newVotes = [...voteData.votes]
    newVotes[selected] += 1
    const newMax = updateMax(newVotes)
    setVotes({...voteData, votes: newVotes, max: newMax})
  }
  const updateMax = (arr) => {
    let maxVote = 0
    let maxIndex = 0
    arr.forEach((vote, index) => {
      if(vote > maxVote){
        maxVote = vote
        maxIndex = index
      }
    });
    return maxIndex
  }


  return (
    <div>
      <Header text='Anecdote of the day' />
      {props.anecdotes[selected]}
      <br />
      <p>has {voteData.votes[selected]} votes</p>
      <Button text='vote' handleClick={updateVotes} />
      <Button text='next anecdote' handleClick={() => setSelected(Math.floor(Math.random() * props.anecdotes.length))} />
      <br />
      <Header text='Anecdote with most votes' />
      {props.anecdotes[voteData.max]}
      <p>has {voteData.votes[voteData.max]} votes</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
