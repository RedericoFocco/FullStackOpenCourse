const express = require('express')
const config = require('./utils/config')
const mongoose = require('mongoose')
const app = express()
const logger = require('./utils/logger')
const Blog = require('./models/blogs')


const url=config.MONGO_DB_URI

mongoose.set('strictQuery',false)

mongoose.connect(url).then(
    ()=>{
        console.log('connected to mongo')
    }
).catch(error=>{
    console.log('error connecting to mongo',error.message)
})

app.use(express.json())

app.get('/api/blogs', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

app.post('/api/blogs', (request, response) => {
  logger.info('Entered [POST]')
  const blog = new Blog(request.body)
  logger.info('[POST] blog:',blog)
  blog.save().then((result) => {
    response.status(201).json(result)
  })
})

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})