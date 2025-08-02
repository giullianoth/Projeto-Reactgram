import { useEffect, useState } from "react"
import Message from "../Message"
import styles from "./PhotoForm.module.css"
import { uploads } from "../../utils/config"

const PhotoForm = ({ action, onCancel, onSubmit, loading, message, error, photoToEdit }) => {
    const [title, setTitle] = useState("")
    const [image, setImage] = useState("")

    useEffect(() => {
        if (action === "edit" && photoToEdit) {
            setTitle(photoToEdit.title)
            setImage(photoToEdit.image)
        }
    }, [photoToEdit])

    const handleSubmit = event => {
        event.preventDefault()
        const data = { title, image }

        if (action === "edit") {
            data.id = photoToEdit._id
        }

        onSubmit(data)
    }

    return (
        <article>
            <header className={styles.form__title}>
                <h3>
                    {action === "create" && "Compartilhe algum momento seu:"}
                    {action === "edit" && "Editando foto:"}
                </h3>
            </header>

            {action === "edit" && photoToEdit.image &&
                <div className={styles.form__photoPreview}>
                    <img src={`${uploads}/photos/${photoToEdit.image}`} alt={photoToEdit.title} />
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

                {action === "create" &&
                    <label>
                        <span>Imagem:</span>

                        <input
                            type="file"
                            name="image"
                            onChange={event => setImage(event.target.files[0])} />
                    </label>}

                <div className="form-button-wrapper">
                    <button type="submit" className="button" disabled={loading}>
                        {loading
                            ? "Aguarde..."
                            : <>
                                {action === "create" && "Postar"}
                                {action === "edit" && "Atualizar"}
                            </>}
                    </button>

                    <button className="button not-highlighted" onClick={onCancel}>Cancelar</button>
                </div>
            </form>

            {error && <Message message={error} type="error" />}
            {message && <Message message={message} type="success" />}
        </article>
    )
}

export default PhotoForm