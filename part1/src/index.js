import React from 'react';
import ReactDOM from 'react-dom';


const Header = (props) => (
  <h1>{props.courseName}</h1>
)

const Part = (props) => (<p>{props.name} {props.numEx}</p>)

const Content = (props) => {
  const tags = props.parts.map(({name, exercises}) => (<Part name={name} numEx = {exercises} />))
  return tags
}

const Total = (props) => {
  let totalEx = 0
  props.parts.forEach(({exercises}) => totalEx += exercises)
  return (<p> Number of exercises: {totalEx}</p>)
}
const App = () => {
  const course = {
    name: 'Half Stack Application Development',
    parts: [{
     name: 'Fundamentals of React',
     exercises: 10
   },
   {
     name: 'Using props to pass data',
     exercises: 7
   },
   {
     name: 'State of a component',
     exercises: 14
   }
   ]
  }



  return(
     <>
     <Header courseName={course.name} />
     <Content parts={course.parts} />
     <Total parts={course.parts} />
     </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
