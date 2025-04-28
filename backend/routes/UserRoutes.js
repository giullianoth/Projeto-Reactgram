const express = require("express")
const router = express.Router()

// Controller
const { register } = require("../controllers/UserController")

// Middlewares
const validate = require("../middlewares/handleValidate")
const { userCreateValidation } = require("../middlewares/validateUser")

// Routes
router.post("/register", userCreateValidation(), validate, register)

module.exports = router