const { body } = require("express-validator")

const nameMinLength = 3
const passwordMinLength = 5

const comparePasswords = (value, { req }) => {
    if (value != req.body.password) {
        throw new Error("As senhas não correspondem")
    }

    return true
}

const userCreateValidation = () => {
    return [
        body("name")
            .isString().withMessage("O campo \"Nome\" é obrigatório")
            .isLength({ min: nameMinLength }).withMessage(`O nome precisa ter no mínimo ${nameMinLength} caracteres`),

        body("email")
            .isString().withMessage("O campo \"E-mail\" é obrigatório")
            .isEmail().withMessage("Insira um e-mail válido"),

        body("password")
            .isString().withMessage("O campo \"Senha\" é obrigatório")
            .isLength({ min: passwordMinLength }).withMessage(`A senha precisa ter no mínimo ${passwordMinLength} caracteres`),

        body("confirmpassword")
            .isString().withMessage("O campo \"Confirmar senha\" é obrigatório")
            .custom(comparePasswords),
    ]
}

const loginValidation = () => {
    return [
        body("email")
            .isString().withMessage("O campo \"E-mail\" é obrigatório")
            .isEmail().withMessage("Insira um e-mail válido"),

        body("password")
            .isString().withMessage("O campo \"Senha\" é obrigatório")
            .isLength({ min: passwordMinLength }).withMessage(`A senha precisa ter no mínimo ${passwordMinLength} caracteres`),
    ]
}

const userUpdateValidation = () => {
    return [
        body("name")
            .optional()
            .isLength({ min: nameMinLength }).withMessage(`O nome precisa ter no mínimo ${nameMinLength} caracteres`),

        body("password")
            .optional()
            .isLength({ min: passwordMinLength }).withMessage(`A senha precisa ter no mínimo ${passwordMinLength} caracteres`),
    ]
}

module.exports = { userCreateValidation, loginValidation, userUpdateValidation }