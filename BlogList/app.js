const express = require('express')
const config = require('./utils/config')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const blogsRouter = require('./controllers/blogsRoute')

const app = express()

logger.info('[APP] connecting to mongo')

const url=config.MONGO_DB_URI

mongoose.set('strictQuery',false)

mongoose.connect(url).then(
    ()=>{
        logger.info('connected to mongo')
    }
).catch(error=>{
    logger.error('error connecting to mongo',error.message)
})

app.use(express.json())
app.use('/api/blogs',blogsRouter)

module.exports=app