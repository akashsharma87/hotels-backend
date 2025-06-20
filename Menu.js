const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required: true,
    },
    
    taste:{
        type:String,
        enum:['Sweet','Spicy','Sour'],
        required: true,
    }
})

const menu = mongoose.model('menuItem',menuSchema);
module.exports = menu;