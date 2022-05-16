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
    if (Bread[req.params.arrayIndex]) {
        res.render('Show', {
        bread: bread[req.params.arrayIndex]
    })
    } else {
        res.send('404')
    }

})

module.exports = breads