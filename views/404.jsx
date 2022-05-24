const React = require('react')
const Default = require('./layouts/default')

function error404() {
    return (
        <Default>
            <h2>404- this is an error</h2>
            <a href="/breads"><button>Go Back</button></a>
        </Default>
    )
}

module.exports = error404