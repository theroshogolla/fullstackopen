import React from 'react';
import ReactDOM from 'react-dom';


const Header = (props) => (
  <h1>{props.courseName}</h1>
)

const Part = (props) => (<p>{props.name} {props.numEx}</p>)

const Content = (props) => {
  const tags = props.parts.map(({partName, exNum}) => (<Part name={partName} numEx = {exNum} />))
  return tags
}

const Total = (props) => {
  let totalEx = 0
  props.parts.forEach(({exNum}) => totalEx += exNum)
  return (<p> Number of exercises: {totalEx}</p>)
}
const App = () => {
  const course = 'Half Stack Application Development'
  const parts = [{
    partName: 'Fundamentals of React',
    exNum: 10
  },
  {
    partName: 'Using props to pass data',
    exNum: 7
  },
  {
    partName: 'State of a component',
    exNum: 14
  }
  ]


  return(
     <>
     <Header courseName={course} />
     <Content parts={parts} />
     <Total parts={parts} />
     </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
