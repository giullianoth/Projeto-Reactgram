import { useEffect, useState } from "react"
import Container from "../Container"
import styles from "./PhotoForm.module.css"
import Trigger from "../Trigger"
import { uploads } from "../../utils/config"

const PhotoForm = ({ photoTitle, photoImage, action, onSubmit, onCancel, message, error, loading }) => {
    const [title, setTitle] = useState("")
    const [image, setImage] = useState("")

    useEffect(() => {
        if (photoTitle && photoImage && action === "edit") {
            setTitle(photoTitle)
            setImage(photoImage)
        }
    }, [])

    const handleSubmit = event => {
        event.preventDefault()
        onSubmit({ title, image })

        if (action === "create") {
            setTitle("")
        }
    }

    const handleFile = event => {
        const image = event.target.files[0]
        setImage(image)
    }

    return (
        <section>
            <Container>
                <header className={styles.form__heading}>
                    <h2>
                        {action === "create" && "Compartilhe algum momento seu:"}
                        {action === "edit" && "Editando foto:"}
                    </h2>
                </header>

                <div className={styles.form__photoPreview}>
                    {action === "edit" && photoImage &&
                        <img src={`${uploads}/photos/${photoImage}`} alt={photoTitle} />}
                </div>

                <form onSubmit={handleSubmit}>
                    <label className={styles.form__label}>
                        <span>Título para a foto:</span>
                        <input
                            type="text"
                            placeholder="Escreva um título"
                            value={title}
                            onChange={event => setTitle(event.target.value)} />
                    </label>

                    {action === "create" &&
                        <label className={styles.form__label}>
                            <span>Imagem:</span>
                            <input
                                type="file"
                                onChange={handleFile} />
                        </label>}

                    <div className={styles.form__actions}>
                        <button type="submit" className="button" disabled={loading}>
                            {loading ? "Aguarde..." : "Postar"}
                        </button>

                        <button className={`button ${styles.cancel}`} onClick={onCancel}>Cancelar</button>
                    </div>

                    {error && <Trigger type="error" message={error} />}
                    {message && <Trigger type="success" message={message} />}
                </form>
            </Container>
        </section>
    )
}

export default PhotoForm