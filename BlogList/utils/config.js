require('dotenv').config() // need to be imported before calling modules, models ecc

const PORT = process.env.PORT
const MONGO_DB_URI = process.env.MONGO_URI_BLOGS

module.exports = {PORT,MONGO_DB_URI}