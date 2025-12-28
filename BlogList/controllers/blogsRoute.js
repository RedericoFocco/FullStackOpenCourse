const blogsRouter = require('express').Router()
const { resource } = require('../app')
const Blog = require('../models/blogs')
const User = require('../models/users')
const logger = require('../utils/logger')
const jwt = require('jsonwebtoken')
const { tokenExtractor, userExtractor } = require('../utils/middleware')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate("user_id")
  logger.info("blogs",blogs) //here you have _id
  response.json(blogs) //here id, because pf the toJSON method in the model folder
  })

blogsRouter.delete('/:id', async (request, response) => {
  logger.info('Entered [DELETE]')
  const id = request.params.id
  logger.info("id param",id)
  const usersReq = userExtractor(request)
  logger.info("usersReq",usersReq)
  const blogUser = await Blog.findById(id)
  const userId = blogUser.user_id
  logger.info("userId",userId.toString())
  logger.info("reqUserId",usersReq.userId)
  if (userId.toString() === usersReq.userId)
  {
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
  else
  {
    logger.info("else")
    response.status(401).json(`Unauthorized, user with id ${reqUserId} is not the author`) //TBcheck
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
  const usersReq = userExtractor(request)
  logger.info("usersReq",usersReq)
  const body = request.body
  logger.info("body:",body)
  const user = await User.findById(body.userId)
  logger.info("user",user)
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