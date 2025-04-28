const express = require("express")
const router = express.Router()

// Controller

// Middlewares
const { photoInsertValidation } = require("../middlewares/validatePhoto")
const authGuard = require("../middlewares/authGuard")
const validate = require("../middlewares/handleValidate")

// Routes

module.exports = router