const express = require('express')
const bread = require('../models/bread')
const breads = express.Router()

//INDEX
breads.get('/', (req, res) => {
    res.render('index', 
        {
            breads: bread,
            title: 'Index Page'
        }
    )
})

//SHOW
breads.get('/:arrayIndex', (req, res) => {
    res.send(bread[req.params.arrayIndex])
})

module.exports = breads