const blogsRouter = require('express').Router()
const Blog = require('./models/blogs')

blogsRouter.get('/', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

blogsRouter.post('/', (request, response) => {
  logger.info('Entered [POST]')
  const blog = new Blog(request.body)
  logger.info('[POST] blog:',blog)
  blog.save().then((result) => {
    response.status(201).json(result)
  })
})

module.exports = blogsRouter