const dotenv = require('dotenv') // require package
dotenv.config() // Loads the environment variables from .env file
const express = require('express')
const mongoose = require('mongoose') // require package

// MODELS
const Fruit = require('./models/fruit.js')

const app = express()

// Connect to MongoDB using the connection string in the .env file
mongoose.connect(process.env.MONGODB_URI)
// log connection status to terminal on start
mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name} 🍒`)
})

app.listen(3000, () => {
  console.log('Listening on port 3000')
})

///////////////     ROUTES      ///////////////////


// GET 
app.get('/', async (req, res) => {
  res.render('index.ejs')
})

// GET /fruits/new
app.get('/fruits/new', (req, res) => {
    res.render("fruits/new.ejs")
})