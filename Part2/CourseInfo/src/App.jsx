import Course from "../components/Course"

const App = () => {
  const courses = [{
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
  },
  {
    id: 1,
    name: 'Fe exercises',
    parts: [
      {
        name: 'Fundamentals of Piedmont',
        exercises: 5,
        id: 1
      },
      {
        name: 'Eating Gianduiotti',
        exercises: 7,
        id: 2
      }
    ]
  },
  {
    id: 1,
    name: 'Scalable systems',
    parts: [
      {
        name: 'Container',
        exercises: 2,
        id: 1
      },
      {
        name: 'Kubbe',
        exercises: 77,
        id: 2
      }
    ]
  }
  ]

  return (
    <>
      {courses.map((c)=><Course course={c}/>)}
    </>
  )
}

export default App