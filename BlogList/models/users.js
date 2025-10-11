const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name is mandatory']  
  },
  password: {
    type: String,
    required: [true, 'password is mandatory']
  },
})

userSchema.set('toJSON',{
    transform:(document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('User', userSchema)

