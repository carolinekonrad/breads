const express = require('express')
const Bread = require('../models/bread')
const bread = require('../models/bread')
const breads = express.Router()

//INDEX
breads.get('/', (req, res) => {
    bread.find()
        .then(foundBreads => {
            res.render('index', {
                breads: foundBreads,
                title: 'Index Page'
            })
        })
})

//NEW
breads.get('/new', (req, res) => {
    res.render('new')
})


//EDIT
breads.get('/:indexArray/edit', (req, res) => {
    res.render('edit', {
        bread: bread[req.params.indexArray],
        index: req.params.indexArray
    })
})

//SHOW
breads.get('/:id', (req, res) => {
    bread.findById(req.params.id)
        .then(foundBread => {
            res.render('show', {
                bread: foundBread
            })
        })
        .catch(err => {
          res.send('404')
        })
  })

//CREATE
breads.post('/', (req, res) => {
    //no image provided on form
    if (!req.body.image) {
        req.body.image = undefined
    }
    //Gluten checkmark
    if (req.body.hasGluten === 'on') {
        req.body.hasGluten = true
    } else {
        req.body.hasGluten = false
    }
    bread.create(req.body)
    res.redirect('/breads')
})

//DELETE
breads.delete('/:indexArray', (req, res) => {
    bread.splice(req.params.indexArray, 1)
    res.status(303).redirect('/breads')
})

//UPDATE
breads.put('/:arrayIndex', (req, res) => {
    if (req.body.gluten === 'on') {
        req.body.hasGluten = true
    } else {
        req.body.hasGluten = false
    }
    bread[req.params.arrayIndex] = req.body
    res.redirect(`/breads/${req.params.arrayIndex}`)
})

module.exports = breads