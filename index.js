const db = require('./db')
const menu = require('./Menu')
const express = require("express");
const personRoutes = require('./Routes/personRoutes')
require('dotenv').config();
const passport = require('./auth');
const person = require('./person');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// middleware function
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
    next();
}

app.use(logRequest);
// authentication logic is here
app.use(passport.initialize());



const localAuthMiddleware = passport.authenticate('local', { session: false });
app.get('/', localAuthMiddleware, function (req, res) {
    return res.send(`hello welcome buddy`);
})

app.use('/person', personRoutes)


app.post('/food', async (req, res) => {
    try {
        const data = req.body;
        const newMenu = new menu(data);

        const response = await newMenu.save();
        console.log('data saved');
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'internal server error' })
    }
})

app.get('/menu', async (req, res) => {
    try {
        const data = await menu.find();
        console.log('data fetched');
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'internal server error' })
    }
})










app.listen(PORT, () => console.log("Server Started!"))


// const myServer = http.createServer(app);
// myServer.listen(8000,() => console.log("Server Started!"));

