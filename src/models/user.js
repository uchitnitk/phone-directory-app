const mongoose = require('mongoose')
const validator = require('validator')

const User = mongoose.model('User',{
  name : {
      type : String,
      required : true,
      trim : true
  },

  contact : {
      type : String,
      required : true,
      minlength : 10,
      maxlength : 10,
      validate(value){
          if(!validator.isMobilePhone(value)){
              throw new Error('Not a valid phone number')
          }
      }
  },

  email : {
      type : String,
      required : true,
      trim : true,
      lowercase : true,
      unique : true,
      validate(value){
          if(!validator.isEmail(value)){
              throw new Error('Email is invalid')
          }
      }
  },

  age : {
      type : Number,
      default : 0,
      validate(value){
        if(value<0){
          throw new Error('Age must be a positive number ')
        }
      }
  },

  city : {
      type : String,
      trim : true,
      lowercase : true,
      default : 'none'
  }
})

module.exports = User
