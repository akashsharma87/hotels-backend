const mongoose = require('mongoose');
require('dotenv').config();
// mongodb connection url
 const mongoURL =  process.env.DB_URL_LOCAL;
//const mongoURL = process.env.DB_URL;
// setup mongodb connectio
mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
})

// get the default connection
//  mongoose maintains a default connection object representing the mongodb connection

const db = mongoose.connection;

// event listener key for db connection
db.on('connected', () => {
    console.log('connected to mongoDB server')
})
db.on('error', (err)=>{
    console.error('MongoDB conection error:', err);
})
db.on('disconnected', ()=>{
    console.log('MOngoDb disconnected')
})

module.exports = db;