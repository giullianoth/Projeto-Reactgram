import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import User from "../models/User.js"
import mongoose from "mongoose"

const jwtSecret = process.env.JWT_SECRET

// Generate user token
const generateToken = id => jwt.sign({ id }, jwtSecret, { expiresIn: "7d" })

// Register user and sign in
export const register = async (req, res) => {
    const { name, email, password } = req.body

    // Check if user exists
    const user = await User.findOne({ email })

    if (user) {
        res.status(422).json({ errors: ["E-mail já cadastrado."] })
        return
    }

    // Generate password hash
    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(password, salt)

    // Create user
    const newUser = await User.create({
        name,
        email,
        password: passwordHash
    })

    // If user was created successfully, return token
    if (!newUser) {
        res.status(422).json({ errors: ["Ocorreu um erro, por favor, tente mais tarde."] })
        return
    }

    res.status(201).json({
        _id: newUser._id,
        token: generateToken(newUser._id)
    })
}

// Sign user in
export const login = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    // Check if user exists
    if (!user) {
        res.status(404).json({ errors: ["Usuário não encontrado."] })
        return
    }

    // Check if password matches
    if (!(await bcrypt.compare(password, user.password))) {
        res.status(422).json({ errors: ["Senha incorreta."] })
        return
    }

    // Return user with token
    res.status(201).json({
        _id: user._id,
        profileImage: user.profileImage,
        token: generateToken(user._id)
    })
}

// Get current logged in user
export const getCurrentUser = async (req, res) => {
    const user = req.user
    res.status(200).json(user)
}

// Update an user
export const update = async (req, res) => {
    const { name, password, bio } = req.body
    let profileImage = req.file ? req.file.filename : null
    const reqUser = req.user

    const user = await User.findById(new mongoose.Types.ObjectId(reqUser._id))

    if (name) {
        user.name = name
    }

    if (password) {
        // Generate password hash
        const salt = await bcrypt.genSalt()
        const passwordHash = await bcrypt.hash(password, salt)
        user.password = passwordHash
    }

    if (profileImage) {
        user.profileImage = profileImage
    }

    if (bio) {
        user.bio = bio
    }

    await user.save()
    res.status(200).json(user)
}

// Get user by ID
export const getUserById = async (req, res) => {
    const { id } = req.params

    try {
        const user = await User.findById(new mongoose.Types.ObjectId(id)).select("-password")

        // Check if user exists
        if (!user) {
            res.status(404).json({ errors: ["Usuário não encontrado."] })
            return
        }

        res.status(200).json(user)
    } catch (error) {
        res.status(404).json({ errors: ["Usuário não encontrado."] })
    }
}