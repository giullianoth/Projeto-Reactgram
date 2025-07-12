import multer from "multer"
import path from "path"

// Destination to store image
const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        let folder = ""

        if (req.baseUrl.includes("users")) {
            folder = "users"
        }

        if (req.baseUrl.includes("photos")) {
            folder = "photos"
        }

        cb(null, `uploads/${folder}/`)
    },

    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
})

export const imageUpload = multer({
    storage: imageStorage,

    fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
            // Upload only PNG and JPG/JPEG formats
            return cb(new Error("Formato inválido, apenas PNG ou JPEG."))
        }

        cb(undefined, true)
    }
})