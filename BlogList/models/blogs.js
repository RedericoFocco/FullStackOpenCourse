const mongoose = require('mongoose')


const blogSchema = mongoose.Schema({
  title: String,
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
  likes: Number, //add that must be >0 as validation eventually
})

blogSchema.set('toJSON',{
    transform:(document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)

