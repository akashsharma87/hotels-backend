const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
    },
    username:{
        required: true,
        type: String
    },
    password:{
        required: true,
        type: String
    }
});

personSchema.pre('save',async function(next){
    const person = this;
    // hash the password only if it has been modified (or its new)
    if(!person.isModified('password')) return next();
    try{
        // hash password generation
        const salt = await bcrypt.genSalt(10);

        // hash password
        const hashedPassword = await bcrypt.hash(person.password,salt);
       // Override the plain password with the hashed one 
       person.password = hashedPassword;
        next();
    }catch(error){
        return next(error);

    }
});

personSchema.methods.comparePassword = async function (candidatePassword) {
    try{
        // use bcrypt to compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(candidatePassword,this.password)
        return isMatch;

    }catch(error){
        throw error;
    }
}

// akash ----> jbdjdsbjshbaksabajbcjahbcja
// login ----> iakashpassword

// jbdjdsbjshbaksabajbcjahbcja ----> extract salt
// salt + iakashpassword ===> hash ===> ajsbdsbdwcjdjhxhchdsabx
// jbdjdsbjshbaksabajbcjahbcja ==== ajsbdsbdwcjdjhxhchdsabx



const person = mongoose.model('person',personSchema);
module.exports = person;