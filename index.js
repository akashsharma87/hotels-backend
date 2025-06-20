const db = require('./db')

const menu = require('./Menu')

const express = require("express");

const personRoutes = require('./Routes/personRoutes')



const app = express();
app.use(express.json());
app.use('/person',personRoutes)

app.get('/', (req, res) => {
    return res.send(`hello welcome buddy`);
})

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










app.listen(8000, () => console.log("Server Started!"))


// const myServer = http.createServer(app);
// myServer.listen(8000,() => console.log("Server Started!"));

