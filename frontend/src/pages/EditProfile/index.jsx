import { useEffect, useState } from "react"
import Container from "../../components/Container"
import styles from "./EditProfile.module.css"
import Message from "../../components/Message"
import { useDispatch, useSelector } from "react-redux"
import { profile, resetMessage, updateProfile } from "../../slices/userSlice"
import { uploads } from "../../utils/config"

const EditProfile = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [profileImage, setProfileImage] = useState("")
    const [bio, setBio] = useState("")
    const [password, setPassword] = useState("")
    const [previewImage, setPreviewImage] = useState("")

    const dispatch = useDispatch()
    const { user, message, error, loading } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(profile())
    }, [dispatch])

    useEffect(() => {
        if (user) {
            setName(user.name)
            setEmail(user.email)
            setBio(user.bio)
        }
    }, [user])

    const handleFile = event => {
        const image = event.target.files[0]
        setPreviewImage(image)
        setProfileImage(image)
    }

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
                                        : `${uploads}/users/${user.profileImage}`)
                                    : "/images/user.png"
                            }
                            alt={user.name} />
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

                        <button type="submit" className="button" disabled={loading}>
                            {loading ? "Aguarde..." : "Atualizar"}
                        </button>
                    </form>

                    {error && <Message message={error} type="error" />}
                    {message && <Message message={message} type="success" />}
                </div>
            </Container>
        </section>
    )
}

export default EditProfile