import React from 'react'

const Header = ({coursename}) => (
	<>
	   <h1>{coursename}</h1>
	</>
)

const Part = ({name, exercises}) => (
	<>
        <p> {name} {exercises} </p>
	</>
)

const Content = ({parts}) => (
    <>
        {parts.map(({name, num_ex}) => (
            <Part name={name} exercises={num_ex} />
        ))}
    </>
)

const Total = ({parts}) => (
    <>
        <p>
            Number of exercises {parts.reduce((sum, {name, num_ex}) => (
                sum + num_ex
            ), 0)}
        </p>
    </>
)

const App = () => {
  const course = 'Half Stack application development'
  const part_data = [
      {name: 'Fundamentals of React', num_ex: 10},
      {name: 'Using props to pass data', num_ex: 7},
      {name: 'State of a component', num_ex: 14}
  ]

  return (
    <div>
      <Header coursename={course}/>
      <Content parts={part_data} />
      <Total parts={part_data} />
    </div>
  )
}

export default App
