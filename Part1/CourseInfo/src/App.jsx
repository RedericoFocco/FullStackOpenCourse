const Header = (course) => {
  console.log(course)
  return(
  <>
    <h1>Course {course.name}</h1>
  </>
  )
}

const Part = (part) => {
  console.log('in part')
  console.log(part)
  return (
    <p>Part {part.name} has {part.number} exercises</p>
  )
}

const Content = ({content1,content2,content3}) => {
  console.log(content1.name)
  return (
    <div>
      <Part name={content1.name} number={content1.exercises} />
      <Part name={content2.name} number={content2.exercises} />
      <Part name={content3.name} number={content3.exercises} />
    </div>
  )
}

const Total = (tot) => {
  console.log(tot)
  return(
  <>
    <p>Total number of exercises {tot.tot_num_of_exercises}</p>
  </>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header name={course}/>
      <Content content1={part1} content2={part2} content3={part3}/>
      <Total tot_num_of_exercises={part1.exercises+part2.exercises+part3.exercises}/>
    </div>
  )
}

export default App