const mongoose = require('mongoose')
const User = require('../models/users')

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'title is mandatory'] // mandatory 
  },
  author: String,
  url: {
    type:String,
    validate:{
        validator: function(v) {
            return /^https:\/\//.test(v) //just to test
        },
        message:props => `${props.value} is not a valid phone number`
    }
  },
  likes: {
    type:Number,
    default:0,
  }, //add that must be >0 as validation eventually
  user_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
})

blogSchema.set('toJSON',{
    transform:(document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)

