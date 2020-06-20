import React from 'react';

const Header = ({courseName}) => (
  <h1>{courseName}</h1>
)

const Content = ({parts}) => {
  const tags = parts.map(({id, name, exercises}) => (<Part key={id} name={name} numEx = {exercises} />))
  return (
    <>
    {tags}
    <br />
    <Total parts={parts} />
    </>
  )
}

const Total = ({parts}) => {
  const totalEx = parts.reduce((sum, {exercises}) => sum + exercises, 0)
  return (
    <p><strong> Number of exercises: {totalEx}</strong></p>
  )
}

const Part = ({name, numEx}) => (<p>{name} {numEx}</p>)

const Course = ({course}) => {
  return(
    <div>
    <Header courseName={course.name} />
    <Content parts={course.parts} />
    </div>
    )
}

export default Course
