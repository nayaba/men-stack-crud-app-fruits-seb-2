const dotenv = require('dotenv') // require package
dotenv.config() // Loads the environment variables from .env file
const express = require('express')
const mongoose = require('mongoose') // require package
const methodOverride = require('method-override')
const morgan = require('morgan')
const path = require('path')

const app = express()

const fruitsCtrl = require('./controllers/fruits')

//////////////////////////////////////////////////////
///////////////     MIDDLEWARE     ///////////////////
//////////////////////////////////////////////////////
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'public')))

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
// GET homepage
app.get('/', async (req, res) => {
  res.render('index.ejs')
})

// GET /fruits (Read - Index)
app.get('/fruits', fruitsCtrl.index)

// GET /fruits/new (New form)
app.get('/fruits/new', fruitsCtrl.new)

// DELETE /fruits/:fruitId (Delete)
app.delete('/fruits/:fruitId', fruitsCtrl.delete)

// GET /fruits/:fruitId (Read - Show)
app.get('/fruits/:fruitId', fruitsCtrl.show)

// POST /fruits (Create)
app.post('/fruits', fruitsCtrl.create)

// GET /fruits/:fruitId/edit
app.get('/fruits/:fruitId/edit', fruitsCtrl.edit)

app.put('/fruits/:fruitId', fruitsCtrl.update)

app.listen(3000, () => {
  console.log('Listening on port 3000')
})
