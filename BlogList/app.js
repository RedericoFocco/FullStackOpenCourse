const express = require('express')
const config = require('./utils/config')
const mongoose = require('mongoose')
const app = express()
const logger = require('./utils/logger')
const blogsRouter = require('./controllers/blogsRoute')

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
app.use('/api/blogs',blogsRouter)

const PORT = config.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})