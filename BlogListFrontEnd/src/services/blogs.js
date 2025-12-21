import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const postNewBlog = async ({title_,author_,url_,token_}) => {
  const response = await axios.post(baseUrl,
    {
      "title":title_,
      "author":author_,
      "url":url_
    },
    {
      headers: {
        "Authorization":`Bearer ${token_}`,
        "Content-Type": "application/json; charset=utf-8"
      }
  }
  )
  return response.data
}

export default { getAll,postNewBlog }