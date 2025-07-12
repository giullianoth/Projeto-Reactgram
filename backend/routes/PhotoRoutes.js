import express from "express"
import authGuard from "../middlewares/authGuard.js"
import { imageUpload } from "../middlewares/imageUpload.js"
import { validateComment, validateInsertPhoto, validateUpdatePhoto } from "../middlewares/validatePhoto.js"
import validate from "../middlewares/handleValidate.js"
import { commentPhoto, deletePhoto, getAllPhotos, getPhotoById, getPhotosByUser, insertPhoto, likePhoto, searchPhotos, updatePhoto } from "../controllers/PhotoController.js"

const photoRouter = express.Router()

photoRouter.post("/", authGuard, imageUpload.single("image"), validateInsertPhoto(), validate, insertPhoto)
photoRouter.delete("/:id", authGuard, deletePhoto)
photoRouter.get("/", authGuard, getAllPhotos)
photoRouter.get("/user/:id", authGuard, getPhotosByUser)
photoRouter.get("/search", authGuard, searchPhotos)
photoRouter.get("/:id", authGuard, getPhotoById)
photoRouter.put("/like/:id", authGuard, likePhoto)
photoRouter.put("/comment/:id", authGuard, validateComment(), validate, commentPhoto)
photoRouter.put("/:id", authGuard, validateUpdatePhoto(), validate, updatePhoto)

export default photoRouter