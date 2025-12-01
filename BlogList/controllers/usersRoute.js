const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/users')
const logger = require('../utils/logger')
const stringHelper = require('../utils/string_helper')
const { response } = require('../app')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  logger.info("users",users) //here you have _id
  response.json(users) //here id, because pf the toJSON method in the model folder
  })

usersRouter.post('/',async(request,response)=>{
  const {username,name,password} = request.body
  logger.info("stringHelper username",stringHelper.stringLen(username))
  if(stringHelper.stringLen(username)>3 && stringHelper.stringLen(password) >3)
  {
    logger.info("... creating user",username) //here you have _id
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password,saltRounds)

    const user = new User({username,name,password:passwordHash})

    try{
      const savedUser = await user.save()
      response.status(201).json(savedUser)
    }
    catch(error)
    {
      logger.error('Errore nel salvataggio:', error)

      if (error.name === 'ValidationError') {
        response.status(400).json({ error: error.message })
      } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error'))
        {
          response.status(400).json({ error: 'username must be unique!' })
      } else {
        response.status(500).json({ error: 'Errore interno del server' })
      }
    }
  }
  else
  {
    response.status(400).json({error:"username AND password should be at least 3 characters long!"})
  }
  
})

module.exports = usersRouter