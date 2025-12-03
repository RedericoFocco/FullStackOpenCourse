const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
  name: {
    type: String
  },
  username: {
    type: String,
    required: [true, 'username is mandatory'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'password is mandatory']
  },
  blogs: [{
    type:mongoose.Schema.Types.ObjectId,
    ref: "Blogs"
  }]
})

userSchema.set('toJSON',{
    transform:(document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.password
  }
})

module.exports = mongoose.model('User', userSchema)

