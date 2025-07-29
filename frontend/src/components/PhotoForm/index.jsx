import { useState } from "react"
import Message from "../Message"
import styles from "./PhotoForm.module.css"

const PhotoForm = ({ action, onCancel }) => {
    const [title, setTitle] = useState("")
    const [image, setImage] = useState("")

    const handleSubmit = event => {
        event.preventDefault()
    }

    return (
        <article>
            <header className={styles.form__title}>
                <h3>
                    {action === "create" && "Compartilhe algum momento seu:"}
                    {action === "edit" && "Editando foto:"}
                </h3>
            </header>

            {action === "edit" &&
                <div className={styles.form__photoPreview}>
                    <img src="https://portalhortolandia.com.br/wp-content/uploads/2025/07/Ozzy-Osbourne.jpg" alt="Photo" />
                </div>}

            <form onSubmit={handleSubmit}>
                <label>
                    <span>Título para a foto:</span>

                    <input
                        type="text"
                        name="title"
                        placeholder="Insira um título"
                        value={title ?? ""}
                        onChange={event => setTitle(event.target.value)} />
                </label>

                <label>
                    <span>Imagem:</span>

                    <input
                        type="file"
                        name="image"
                        onChange={event => setImage(event.target.files[0])} />
                </label>

                <div className="form-button-wrapper">
                    <button type="submit" className="button">
                        {action === "create" && "Postar"}
                        {action === "edit" && "Atualizar"}
                    </button>

                    <button className="button not-highlighted" onClick={onCancel}>Cancelar</button>
                </div>
            </form>

            <Message message="Mensaaaaaaaaaagem!" type="error" />
        </article>
    )
}

export default PhotoForm