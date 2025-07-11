const Header = ({course_name}) => {
  console.log(course_name)
  return(
  <>
    <h1>{course_name}</h1>
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

const Course = ({course})=>{
    console.log('Course receiving prop',course)
    //2.3 as well
    return (
        <>
        <Header course_name={course.name}/>
        <Content content1={course.parts[0]} content2={course.parts[1]} content3={course.parts[2]}/> 
        <p>
            <b>Total of  {course.parts.reduce((sum,part)=>sum+part.exercises,0)} exercises</b>
        </p>
        </>
    )
}

export default Course