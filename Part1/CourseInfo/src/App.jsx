const Header = (course) => {
  console.log(course)
  return(
  <>
    <h1>Course {course.course_name}</h1>
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

export default App