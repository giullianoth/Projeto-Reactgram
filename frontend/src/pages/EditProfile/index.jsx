import { useState } from "react"
import Container from "../../components/Container"
import styles from "./EditProfile.module.css"
import Message from "../../components/Message"

const EditProfile = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [profileImage, setProfileImage] = useState("")
    const [bio, setBio] = useState("")
    const [password, setPassword] = useState("")
    const [previewImage, setPreviewImage] = useState("")

    const user = {}

    const handleFile = event => {
        const image = event.target.files[0]
        setPreviewImage(image)
        setProfileImage(image)
    }

    const handleSubmit = event => {
        event.preventDefault()
    }

    return (
        <section>
            <Container>
                <div className="bordered-wrapper unique">
                    <header className={styles.profile__title}>
                        <h2>Edite seus dados</h2>
                        <p>Adicione uma imagem de perfil e conte mais sobre você...</p>
                    </header>

                    <div className={styles.profile__imagePreview}>
                        <img
                            src={
                                user.profileImage || previewImage
                                    ? (previewImage
                                        ? URL.createObjectURL(previewImage)
                                        : "/images/user.png")
                                    : "/images/user.png"
                            }
                            alt="User" />
                    </div>

                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Nome"
                            value={name ?? ""}
                            onChange={event => setName(event.target.value)} />

                        <input
                            type="email"
                            name="email"
                            placeholder="E-mail"
                            value={email ?? ""}
                            disabled />

                        <label>
                            <span>Imagem de perfil:</span>
                            <input type="file" name="profileImage" onChange={handleFile} />
                        </label>

                        <label>
                            <span>Bio:</span>

                            <textarea
                                name="bio"
                                rows="5"
                                placeholder="Fale mais sobre você"
                                value={bio ?? ""}
                                onChange={event => setBio(event.target.value)}></textarea>
                        </label>

                        <label>
                            <span>Quer alterar sua senha?</span>

                            <input
                                type="password"
                                name="password"
                                placeholder="Digite sua nova senha"
                                value={password ?? ""}
                                onChange={event => setPassword(event.target.value)} />
                        </label>

                        <button type="submit" className="button">Atualizar</button>
                    </form>

                    <Message message="Mensaaaaaaaaaagem!" type="success" />
                </div>
            </Container>
        </section>
    )
}

export default EditProfile