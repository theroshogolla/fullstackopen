import React from 'react'

const Header = ({course}) => (
	<>
	   <h2>{course["name"]}</h2>
	</>
)

const Part = ({name, exercises}) => (
	<>
        <p> {name} {exercises} </p>
	</>
)

const Content = ({course}) => {
    return(
        <>
            {course["parts"].map(({name, exercises, id}) => (
                <Part key={id} name={name} exercises={exercises} />
            ))}
        </>
    )
}

const Total = ({course}) => (
    <>
        <p>
            <strong>
                Number of exercises {course["parts"].reduce((sum, {exercises}) => (
                    sum + exercises
                ), 0)}
            </strong>
        </p>
    </>
)

const Course = ({course}) => (
    <>
        <Header course={course}/>
        <Content course={course} />
        <Total course={course} />
    </>
)

export default Course
