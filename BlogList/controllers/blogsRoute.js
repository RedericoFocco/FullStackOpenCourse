const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')
const logger = require('../utils/logger')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  logger.info("blogs",blogs) //here you have _id
  response.json(blogs) //here id, because pf the toJSON method in the model folder
  })

blogsRouter.post('/', async (request, response) => {
  logger.info('Entered [POST]')
  const blog = new Blog(request.body)
  logger.info('[POST] blog:',blog)
  const savedNote = await blog.save()
  response.status(201).json(blog)
  })

module.exports = blogsRouter