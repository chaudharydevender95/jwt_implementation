const mongoose = require('mongoose')
const Schema = mongoose.Schema

var transactionSchema = new Schema({
    amount:{
        type:Number,
        default:100000
    },
    currency:{
        type:String,
        default:"INR"
    },
    user:{
        type:Schema.ObjectId,
        ref:'users'
    },
    description:{
        type:String,
        default:"Description for transaction"
    },
    date:{
        type:Date,
        default:Date.now
    }
})

mongoose.model('transactions',transactionSchema)