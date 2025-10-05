const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')
const logger = require('../utils/logger')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  logger.info("blogs",blogs) //here you have _id
  response.json(blogs) //here id, because pf the toJSON method in the model folder
  })

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  logger.info("id param",id)
  const resp = await Blog.findByIdAndDelete(id)
  if(!resp)
  {
    console.log("id doesn't exist")
    response.status(404).json('id doesnt exist')
  }
  else
  {
    response.status(200).json(resp)
  }
  }
  )

  blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  logger.info("id param",id)
  const resp = await Blog.findByIdAndUpdate(id,request.body,{ new: true, runValidators: true })
  if(!resp)
  {
    console.log("id doesn't exist")
    response.status(404).json('id doesnt exist')
  }
  else
  {
    logger.info("id good, resp:",resp)
    response.status(200).json(resp)
  }
  }
  )

blogsRouter.post('/', async (request, response) => {
  logger.info('Entered [POST]')
  const blog = new Blog(request.body)
  logger.info('[POST] blog:',blog)

  //const savedNote = await blog.save()
  //response.status(201).json(savedNote)
  
  try{
    const savedNote = await blog.save()
    response.status(201).json(savedNote)
  }
  catch(error)
  {
    logger.error('Errore nel salvataggio:', error)

    if (error.name === 'ValidationError') {
      response.status(400).json({ error: error.message })
    } else {
      response.status(500).json({ error: 'Errore interno del server' })
    }
  }
  })

module.exports = blogsRouter