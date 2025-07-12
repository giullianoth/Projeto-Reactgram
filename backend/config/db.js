import mongoose from "mongoose"

const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASSWORD

const Connect = async () => {
    try {
        const dbConnect = await mongoose.connect(
            `mongodb+srv://${dbUser}:${dbPassword}@cluster0.rzzz95l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
        )

        console.log("Conexão bem sucedida com o banco de dados!")
        return dbConnect
    } catch (error) {
        console.error(error)
    }
}

export default Connect