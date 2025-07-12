import express from "express"
import path from "path"
import { fileURLToPath } from "url"
import cors from "cors"
import "dotenv/config"
import router from "./routes/Router.js"
import Connect from "./config/db.js"

const port = process.env.PORT
const app = express()

// Config JSON and form data response
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Solve CORS
app.use(cors({ credentials: true, origin: "http://localhost:5173" }))

// Upload directory
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.use("/uploads", express.static(path.join(__dirname, "/uploads")))

// DB Connection
Connect()

// Routes
app.use(router)

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`)
})