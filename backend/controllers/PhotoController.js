import User from "../models/User.js"
import Photo from "../models/Photo.js"
import mongoose from "mongoose"

// Insert a photo with an user related to it
export const insertPhoto = async (req, res) => {
    const { title } = req.body
    const image = req.file.filename
    const reqUser = req.user
    const user = await User.findById(reqUser._id)

    // Create a photo
    const newPhoto = await Photo.create({
        image,
        title,
        userId: user._id,
        userName: user.name
    })

    // If photo was create successfully, return data
    if (!newPhoto) {
        res.status(422).json({ errors: ["Ocorreu um erro, por favor, tente mais tarde."] })
        return
    }

    res.status(201).json(newPhoto)
}

// Remode photo from DB
export const deletePhoto = async (req, res) => {
    const { id } = req.params
    const reqUser = req.user

    try {
        const photo = await Photo.findById(new mongoose.Types.ObjectId(id))

        // Check if photo exists
        if (!photo) {
            res.status(404).json({ errors: ["Foto não encontrada."] })
            return
        }

        // Check if photo belongs to user
        if (!photo.userId.equals(reqUser._id)) {
            res.status(422).json({ errors: ["Ocorreu um erro, por favor, tente mais tarde."] })
            return
        }

        await Photo.findByIdAndDelete(photo._id)

        res.status(200).json({
            id: photo._id,
            message: "Foto excluída com sucesso."
        })
    } catch (error) {
        res.status(404).json({ errors: ["Foto não encontrada."] })
    }
}

// Get all photos
export const getAllPhotos = async (req, res) => {
    const photos = await Photo.find({}).sort([["createdAt", -1]]).exec()
    return res.status(200).json(photos)
}
// Get user photos
export const getPhotosByUser = async (req, res) => {
    const { id } = req.params
    const photos = await Photo.find({ userId: id }).sort([["createdAt", -1]]).exec()

    return res.status(200).json(photos)
}

// Get photo by ID
export const getPhotoById = async (req, res) => {
    const { id } = req.params

    try {
        const photo = await Photo.findById(new mongoose.Types.ObjectId(id))

        // Check if photo exists
        if (!photo) {
            res.status(404).json({ errors: ["Foto não encontrada."] })
            return
        }

        res.status(200).json(photo)
    } catch (error) {
        res.status(404).json({ errors: ["Foto não encontrada."] })
    }
}

// Update a photo
export const updatePhoto = async (req, res) => {
    const { id } = req.params
    const { title } = req.body
    const reqUser = req.user
    const photo = await Photo.findById(id)

    // Check if photo exists
    if (!photo) {
        res.status(404).json({ errors: ["Foto não encontrada."] })
        return
    }

    // Check if photo belongs to user
    if (!photo.userId.equals(reqUser._id)) {
        res.status(422).json({ errors: ["Ocorreu um erro, por favor, tente mais tarde."] })
        return
    }

    if (title) {
        photo.title = title
    }

    await photo.save()

    res.status(200).json({ photo, message: "Foto atualizada com sucesso." })
}

// Like feature
export const likePhoto = async (req, res) => {
    const { id } = req.params
    const reqUser = req.user
    const photo = await Photo.findById(id)

    // Check if photo exists
    if (!photo) {
        res.status(404).json({ errors: ["Foto não encontrada."] })
        return
    }

    // Check if user already liked the photo
    if (photo.likes.includes(reqUser.id)) {
        res.status(422).json({ errors: ["Você já curtiu a foto."] })
        return
    }

    // Put user ID in likes array
    photo.likes.push(reqUser._id)
    photo.save()

    res.status(200).json({ photo: id, userId: reqUser._id, message: "Foto curtida." })
}

// Comment feature
export const commentPhoto = async (req, res) => {
    const { id } = req.params
    const { comment } = req.body
    const reqUser = req.user
    const user = await User.findById(reqUser._id)
    const photo = await Photo.findById(id)

    // Check if photo exists
    if (!photo) {
        res.status(404).json({ errors: ["Foto não encontrada."] })
        return
    }

    // Put comment in comments array
    const userComment = {
        comment,
        userName: user.name,
        userImage: user.profileImage,
        userId: user._id
    }

    photo.comments.push(userComment)
    await photo.save()

    res.status(200).json({
        comment: userComment,
        message: "Comentário adicionado com sucesso."
    })
}

// Search photos by title
export const searchPhotos = async (req, res) => {
    const { q } = req.query
    const photos = await Photo.find({ title: new RegExp(q, "i") }).exec()
    res.status(200).json(photos)
}