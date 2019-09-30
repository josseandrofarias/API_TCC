const bodyParser = require('body-parser')
const cors = require('cors') //permite conexões qualquer origem

module.exports = app => {
    app.use(bodyParser.json())
    app.use(cors({
        origin: '*'
    }))
}