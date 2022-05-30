const express = require('express')
const bread = require('../models/bread')
const breads = express.Router()
const Baker = require('../models/bakers')

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
    Baker.find()
        .then(foundBakers => {
            res.render('new', {
                bakers: foundBakers
            })
        })

})


//EDIT
breads.get('/:indexArray/edit', (req, res) => {
    Baker.find()
    .then (foundBakers => {
    bread.findById(req.params.indexArray)
        .then(foundBread => {
            res.render('edit', {
                bread: foundBread,
                bakers: foundBakers
            })
        })
        .catch(err => {
            console.log('err', err)
            res.send('404')
        })
    })
})

//SHOW
breads.get('/:id', (req, res) => {
    bread.findById(req.params.id)
        .populate('baker')
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
        req.body.image = 'http://placekitten.com/400/400'
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