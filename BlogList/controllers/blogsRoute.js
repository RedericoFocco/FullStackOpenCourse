const blogsRouter = require('express').Router()
const { resource } = require('../app')
const Blog = require('../models/blogs')
const User = require('../models/users')
const logger = require('../utils/logger')
const jwt = require('jsonwebtoken')
const { tokenExtractor } = require('../utils/middleware')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate("user_id")
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
  const bearer = tokenExtractor(request)
  //logger.info("bearer",bearer)
  //logger.info(bearer) => last char is "
  const decodedToken = jwt.verify(bearer.slice(0,-1),process.env.SECRET)
  logger.info("decodedToken",decodedToken)
  if(!decodedToken.id)
  {
    console.log("token not valid")
    response.status(401).json("invalid jwt")
  }

  const body = request.body
  logger.info("body:",body)
  const user = await User.findById(body.userId)
  const blog = new Blog({
    title: body.title,
    url:body.url,
    likes:body.likes,
    user_id:user._id
  })
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