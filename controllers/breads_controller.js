const express = require('express')
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
    bread.findById(req.params.indexArray)
        .then(foundBread => {
            res.render('edit', {
                bread: foundBread
            })
        })
        .catch(err => {
            console.log('err', err)
            res.send('404')
        })
})

//SHOW
breads.get('/:id', (req, res) => {
    bread.findById(req.params.id)
        .then(foundBread => {
            const bakedBy = foundBread.getBakedBy()
            console.log(bakedBy)
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
breads.delete('/:arrayIndex', (req, res) => {
    bread.findByIdAndDelete(req.params.arrayIndex)
        .then(deletedBread => {
            res.status(303).redirect('/breads')
        })
})

//UPDATE
breads.put('/:arrayIndex', (req, res) => {
    if(req.body.hasGluten === 'on'){
        req.body.hasGluten = true;
    }
    else{
        req.body.hasGluten = false;
    }
    bread.findByIdAndUpdate(req.params.arrayIndex, req.body, {new: true})
        .then(updatedBread => {
            console.log(updatedBread)
            res.render('show', {
                bread: updatedBread
            })
        })
})

module.exports = breads