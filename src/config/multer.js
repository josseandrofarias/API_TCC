const path = require('path')
const crypto = require('crypto')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: path.resolve(__dirname, '..',  '..', 'temp', 'uploads'),
    filename: (req, file, cb) =>{
        crypto.randomBytes(16, (err, raw) => {
            if(err) return cb(err)

            cb(null, raw.toString('hex') + path.extname(file.originalname))
        })
    }
})

return { storage }
