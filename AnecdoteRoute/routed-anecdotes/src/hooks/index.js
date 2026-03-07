import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const setValue_ = (value) => {
    setValue(value)
  }

  const resetValue = () => {setValue('')}

  return {
    type,
    value,
    onChange,
    resetValue,
    setValue_
  }
}

export const useFieldArray = (type) => {
  const [value, setValue] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const addElementToArray = (obj) => {
    setValue(value.concat(obj))
  }

  const setVote = (obj,id) => {
    setValue(value.map(a => a.id === id ? obj : a))
  }

  return {
    type,
    value,
    addElementToArray,
    setVote
  }
}