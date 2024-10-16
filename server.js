const dotenv = require('dotenv') // require package
dotenv.config() // Loads the environment variables from .env file
const express = require('express')
const mongoose = require('mongoose') // require package
const morgan = require('morgan')

const app = express()

//////////////////////////////////////////////////////
///////////////      MODELS    ///////////////////////
//////////////////////////////////////////////////////
const Fruit = require('./models/fruit.js')

//////////////////////////////////////////////////////
///////////////     MIDDLEWARE     ///////////////////
//////////////////////////////////////////////////////
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))

//////////////////////////////////////////////////////
///////////////     DB CONNECTION    /////////////////
//////////////////////////////////////////////////////
// Connect to MongoDB using the connection string in the .env file
mongoose.connect(process.env.MONGODB_URI)
// log connection status to terminal on start
mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name} 🍒`)
})

//////////////////////////////////////////////////////
///////////////     ROUTES     ///////////////////////
//////////////////////////////////////////////////////
// GET
app.get('/', async (req, res) => {
  res.render('index.ejs')
})

// GET /fruits/new
app.get('/fruits/new', (req, res) => {
  res.render('fruits/new.ejs')
})

// POST /fruits
app.post('/fruits', async (req, res) => {
  //   convert this "on" or undefined value to a Boolean
  const formData = req.body
  if (req.body.isReadyToEat === 'on') {
    formData.isReadyToEat = true
  } else {
    formData.isReadyToEat = false
  }

  //   Create fruit in database
  await Fruit.create(formData)

  //   redirect the user back to the form page
  res.redirect('/fruits/new')
})

app.listen(3000, () => {
  console.log('Listening on port 3000')
})
