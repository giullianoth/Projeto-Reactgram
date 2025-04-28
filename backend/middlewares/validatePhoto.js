const { body } = require("express-validator")

const titleMinLength = 3

const photoInsertValidation = () => {
    return [
        body("title")
            .not().equals("undefined").withMessage("O campo \"Título\" é obrigatório")
            .isString().withMessage("O campo \"Título\" é obrigatório")
            .isLength({ min: titleMinLength }).withMessage(`O título precisa ter no mínimo ${titleMinLength} caracteres`),

        body("image").custom((value, { req }) => {
            if (!req.file) {
                throw new Error("A imagem é obrigatória")
            }

            return true
        })
    ]
}

module.exports = { photoInsertValidation }