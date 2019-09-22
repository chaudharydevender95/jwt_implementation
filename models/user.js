const mongoose = require('mongoose')
const Schema = mongoose.Schema

var userSchema = new Schema({
    balance:{
        type:Number,
        default:100000
    },
    currency:{
        type:String,
        default:"INR"
    }
})

mongoose.model('users',userSchema)