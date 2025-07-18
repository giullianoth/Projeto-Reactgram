import { useDispatch, useSelector } from "react-redux"
import Container from "../../components/Container"
import { uploads } from "../../utils/config"
import styles from "./EditProfile.module.css"
import { useEffect, useState } from "react"
import { profile, resetMessage, updateProfile } from "../../slices/userSlice"
import userIcon from "/images/user.png"
import Trigger from "../../components/Trigger"

const EditProfile = () => {
    const dispatch = useDispatch()
    const { user, message, error, loading } = useSelector(state => state.user)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [profileImage, setProfileImage] = useState("")
    const [bio, setBio] = useState("")
    const [previewImage, setPreviewImage] = useState("")

    useEffect(() => {
        dispatch(profile())
    }, [dispatch])

    useEffect(() => {
        if (user) {
            setName(user.name ?? "")
            setEmail(user.email ?? "")
            setBio(user.bio ?? "")
        }
    }, [user])

    const handleSubmit = event => {
        event.preventDefault()

        const userData = { name }

        if (profileImage) {
            userData.profileImage = profileImage
        }

        if (bio) {
            userData.bio = bio
        }

        if (password) {
            userData.password = password
        }

        const formData = new FormData()
        Object.keys(userData).forEach(key => formData.append(key, userData[key]))

        dispatch(updateProfile(formData))

        setTimeout(() => {
            dispatch(resetMessage())
        }, 2000)
    }

    const handleFile = event => {
        const image = event.target.files[0]
        setPreviewImage(image)
        setProfileImage(image)
    }

    return (
        <section>
            <Container>
                <header className="title">
                    <h2>Edite seus dados</h2>
                    <p>Adicione uma foto e conte mais sobre você...</p>
                </header>

                <div>
                    <div className={styles.editProfile__imagePreview}>
                        <img
                            src={
                                user.profileImage || previewImage
                                    ? previewImage ? URL.createObjectURL(previewImage) : `${uploads}/users/${user.profileImage}`
                                    : userIcon
                            }
                            alt={`Foto de ${user.name}`} />
                    </div>

                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Nome"
                            value={name}
                            onChange={event => setName(event.target.value)} />

                        <input
                            type="email"
                            placeholder="E-mail"
                            value={email}
                            onChange={event => setEmail(event.target.value)}
                            disabled
                            className={styles.editProfile__separated} />

                        <label className={styles.editProfile__separated}>
                            <span>Imagem de perfil:</span>
                            <input type="file" onChange={handleFile} />
                        </label>

                        <label className={styles.editProfile__separated}>
                            <span>Bio:</span>

                            <textarea
                                placeholder="Descrição do perfil"
                                rows={4}
                                value={bio}
                                onChange={event => setBio(event.target.value)}></textarea>
                        </label>

                        <label className={styles.editProfile__separated}>
                            <span>Quer alterar sua senha?</span>

                            <input
                                type="password"
                                placeholder="Digite sua nova senha"
                                value={password}
                                onChange={event => setPassword(event.target.value)} />
                        </label>

                        <button type="submit" className="button" disabled={loading}>
                            {loading ? "Aguarde..." : "Atualizar"}
                        </button>

                        {error && <Trigger type="error" message={error} />}
                        {message && <Trigger type="success" message={message} />}
                    </form>
                </div>
            </Container>
        </section>
    )
}

export default EditProfile