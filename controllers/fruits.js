//////////////////////////////////////////////////////
///////////////      MODELS    ///////////////////////
//////////////////////////////////////////////////////
const Fruit = require('../models/fruit.js')

const index = async (req, res) => {
  const allFruits = await Fruit.find({})
  //   pass the fruits data from our database to the EJS file by passing { fruits: allFruits }
  res.render('fruits/index.ejs', { fruits: allFruits })
}

const newFruit = (req, res) => {
  res.render('fruits/new.ejs')
}

const create = async (req, res) => {
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
    res.redirect('/fruits')
  }

const show = async (req, res) => {
    const foundFruit = await Fruit.findById(req.params.fruitId)
    res.render('fruits/show.ejs', { fruit: foundFruit })
  }

const deleteFruit = async (req, res) => {
    await Fruit.findByIdAndDelete(req.params.fruitId)
    res.redirect('/fruits')
  }

const edit = async (req, res) => {
    const foundFruit = await Fruit.findById(req.params.fruitId)
    console.log(foundFruit)
    res.render('fruits/edit.ejs', { fruit: foundFruit })
  }

const update = async (req, res) => {
    //   convert this "on" or undefined value to a Boolean
    const formData = req.body
    if (req.body.isReadyToEat === 'on') {
      formData.isReadyToEat = true
    } else {
      formData.isReadyToEat = false
    }
    await Fruit.findByIdAndUpdate(req.params.fruitId, formData)
    res.redirect(`/fruits/${req.params.fruitId}`)
  }

module.exports = {
  index,
  new: newFruit,
  create,
  show,
  delete: deleteFruit,
  edit, 
  update,
}
