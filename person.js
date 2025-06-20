const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,

    },
    work:{
        type:String,
        enum: ['chief','waiter','manager'],
        required: true
    },
    mobile:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true

    },
    address:{
        type:String
    }
})

const person = mongoose.model('person',personSchema);
module.exports = person;