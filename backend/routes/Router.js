import express from "express"
import userRouter from "./UserRoutes.js"
import photoRouter from "./PhotoRoutes.js"

const router = express()

router.use("/api/users", userRouter)
router.use("/api/photos", photoRouter)

// Test Router
router.get("/", (req, res) => {
    res.send("API em funcionamento!")
})

export default router