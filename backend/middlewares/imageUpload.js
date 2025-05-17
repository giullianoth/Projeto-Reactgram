const multer = require("multer")
const path = require("path")

// Destination to store
const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        let folder = ""

        if (req.baseUrl.includes("users")) {
            folder = "users"
        } else if (req.baseUrl.includes("photos")) {
            folder = "photos"
        }

        cb(null, `uploads/${folder}/`)
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const imageUpload = multer({
    storage: imageStorage,
    fileFilter: (req, file, cb) => {        
        // Upload only png and jpeg formats
        if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
            return cb(new Error("Formato inválido (Envie apenas png ou jpeg)"))
        }

        cb(null, true)
    }
})

module.exports = { imageUpload }