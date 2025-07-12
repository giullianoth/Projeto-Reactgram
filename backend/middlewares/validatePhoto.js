import { body } from "express-validator"

const titleMinLength = 3

export const validateInsertPhoto = () => [
    body("title")
        .not().equals("undefined").withMessage("Preencha o título.")
        .isString().withMessage("Preencha o título.")
        .isLength({ min: titleMinLength }).withMessage(`O título precisa ter, no mínimo, ${titleMinLength} caracteres.`),

    body("image")
        .custom((value, { req }) => {
            if (!req.file) {
                throw new Error("Selecione uma imagem.")
            }
            return true
        })
]

export const validateUpdatePhoto = () => [
    body("title")
        .optional()
        .isString().withMessage("Preencha o título.")
        .isLength({ min: titleMinLength }).withMessage(`O título precisa ter, no mínimo, ${titleMinLength} caracteres.`),
]

export const validateComment = () => [
    body("comment").isString().withMessage("Escreva um comentário.")
]