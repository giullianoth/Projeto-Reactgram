import { body } from "express-validator"

const nameMinLength = 3
const passwordMinLength = 5

export const validateCreateUser = () => [
    body("name")
        .isString().withMessage("Preencha o nome.")
        .isLength({ min: nameMinLength }).withMessage(`O nome precisa ter no mínimo ${nameMinLength} caracteres.`),

    body("email")
        .isString().withMessage("Preencha o e-mail.")
        .isEmail().withMessage("Insira um e-mail válido."),

    body("password")
        .isString().withMessage("Forneça uma senha.")
        .isLength({ min: passwordMinLength }).withMessage(`A senha precisa ter no mínimo ${passwordMinLength} caracteres.`),

    body("confirmPassword")
        .isString().withMessage("Confirme a sua senha.")
        .custom((value, { req }) => {
            if (value != req.body.password) {
                throw new Error("As senhas não correspondem.")
            }
            return true
        })
]


export const validateLogin = () => [
    body("email")
        .isString().withMessage("Preencha o e-mail.")
        .isEmail().withMessage("Insira um e-mail válido."),

    body("password")
        .isString().withMessage("Confirme a sua senha.")
]


export const validateUpdateUser = () => [
    body("name")
        .optional()
        .isLength({ min: nameMinLength }).withMessage(`O nome precisa ter no mínimo ${nameMinLength} caracteres.`),

    body("password")
        .optional()
        .isLength({ min: passwordMinLength }).withMessage(`A senha precisa ter no mínimo ${passwordMinLength} caracteres.`),
]