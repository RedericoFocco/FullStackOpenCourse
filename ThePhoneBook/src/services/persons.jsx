import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

//const getAll = () => axios.get(baseUrl).then(response=>(response.data))

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const insertNew = (object) => axios.post(baseUrl,object).then(response=>(response.data))

export default {getAll, insertNew}