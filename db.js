const mongoose = require('mongoose');

// mongodb connection url
// const mongoURL =  'mongodb://localhost:27017/mydatabase';
const mongoURL = 'mongodb+srv://isarassharma68:pbOBgEgCmJaTbQMQ@cluster0.xvdsbnm.mongodb.net/';
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
db.on('disconnecte', ()=>{
    console.log('MOngoDb disconnected')
})

module.exports = db;