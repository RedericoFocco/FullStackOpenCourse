const express = require('express')
const config = require('./utils/config')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogsRoute')
const usersRouter = require('./controllers/usersRoute')
const loginRouter = require('./controllers/login')

const app = express()

logger.info('[APP] connecting to mongo')

const url=config.MONGO_DB_URI

logger.info(process.env.PORT)
logger.info(process.env.NODE_ENV)

mongoose.set('strictQuery',false)

mongoose.connect(url).then(
    ()=>{
        logger.info(`connected to mongo`)
    }
).catch(error=>{
    logger.error('error connecting to mongo',error.message)
})

app.use(express.json())
app.use('/api/blogs',blogsRouter)
app.use('/api/users',usersRouter)
app.use('/api/login',loginRouter)

app.use(middleware.tokenExtractor)

module.exports=app