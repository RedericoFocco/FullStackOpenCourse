import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

//const getAll = () => axios.get(baseUrl).then(response=>(response.data))

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const insertNew = (object) => axios.post(baseUrl,object).then(response=>(response.data))

const updateRecord = (id,newObject) => axios.put(`${baseUrl}/${id}`,newObject).then(response=>(response.data))

const deleteRecord = (id) => axios.delete(`${baseUrl}/${id}`)

export default {getAll, insertNew, deleteRecord, updateRecord}