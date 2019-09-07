const express = require('express')
const app = express()
let success = false

app.listen(3000, () => {
    console.log('Server Stated!')
    success = true
})

module.exports = app