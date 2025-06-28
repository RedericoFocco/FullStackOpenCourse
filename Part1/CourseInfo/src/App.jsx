const Header = (course) => {
  console.log(course)
  return(
  <>
    <h1>Course {course.name}</h1>
  </>
  )
}

const Part = (part) => {
  console.log(part)
  return (
    <p>Part {part.name} has {part.number} exercises</p>
  )
}

const Content = ({exercise_number}) => {
  console.log(Array.isArray(exercise_number))
  const part1 = 'Fundamentals of React'
  const part2 = 'Using props to pass data'
  const part3 = 'State of a component'
  return (
    <div>
      <Part name={part1} number={exercise_number[0]}/>
      <Part name={part2} number={exercise_number[1]}/>
      <Part name={part3} number={exercise_number[2]}/>
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
  const exercises = [10,20,30]

  console.log('exercises in App:', exercises)
  console.log('Array.isArray(exercises):', Array.isArray(exercises))
  

  return (
    <div>
      <Header name={course}/>
      <Content exercise_number={exercises}/>
      <Total tot_num_of_exercises={exercises.reduce((totalExercises, ex) => totalExercises + ex, 0)} />
    </div>
  )
}

export default App