import express from "express"
import { getCurrentUser, getUserById, login, register, update } from "../controllers/UserController.js"
import validate from "../middlewares/handleValidate.js"
import { validateCreateUser, validateLogin, validateUpdateUser } from "../middlewares/validateUser.js"
import authGuard from "../middlewares/authGuard.js"
import { imageUpload } from "../middlewares/imageUpload.js"

const userRouter = express.Router()

// Routes
userRouter.post("/register", validateCreateUser(), validate, register)
userRouter.post("/login", validateLogin(), validate, login)
userRouter.get("/profile", authGuard, getCurrentUser)
userRouter.put("/", authGuard, validateUpdateUser(), validate, imageUpload.single("profileImage"), update)
userRouter.get("/:id", getUserById)

export default userRouter