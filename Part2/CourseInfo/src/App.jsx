/*

const Total = (tot) => {
  console.log(tot)
  return(
  <>
    <p>Total number of exercises {tot.tot_num_of_exercises}</p>
  </>
  )
}

const sum = (arr) => {
  let init = 0
  arr.forEach(x=>{init=init+x.exercises})
  return init
}

const App = () => {
  const course =
  {
    name:'Half Stack application development',
    parts :[{
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
    }]
  }

  return (
    <div>
      <Header course_name={course.name}/>
      <Content content1={course.parts[0]} content2={course.parts[1]} content3={course.parts[2]}/>
      <Total tot_num_of_exercises={sum(course.parts)}/>
    </div>
  )
}

export default App*/
import Course from "../components/Course"

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App