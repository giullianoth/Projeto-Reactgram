import { Link, useParams } from "react-router-dom"
import Container from "../../components/Container"
import styles from "./Profile.module.css"
import PhotosList from "../../components/PhotosList"
import { useEffect, useState } from "react"
import PhotoForm from "../../components/PhotoForm"
import { useDispatch, useSelector } from "react-redux"
import { getUserDetails } from "../../slices/userSlice"
import { uploads } from "../../utils/config"
import { deletePhoto, getPhotosByUser, publishPhoto, resetMessage, updatePhoto } from "../../slices/photoSlice"
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage"

const Profile = () => {
    const [formIsOpen, setFormIsOpen] = useState(false)
    const [editing, setEditing] = useState(false)
    const [photoToEdit, setPhotoToEdit] = useState(null)

    const { id } = useParams()
    const dispatch = useDispatch()
    const { user, loading } = useSelector(state => state.user)
    const { user: userAuth } = useSelector(state => state.auth)
    const { photos, loading: photoLoading, message: photoMessage, error: photoError } = useSelector(state => state.photo)
    const resetMessage = useResetComponentMessage(dispatch)

    useEffect(() => {
        dispatch(getUserDetails(id))
        dispatch(getPhotosByUser(id))
    }, [dispatch, id])

    const handleOpenFormEdit = photo => {
        setEditing(true)
        setFormIsOpen(true)
        setPhotoToEdit(photo)
    }

    const handleCancelForm = () => {
        setEditing(false)
        setFormIsOpen(false)
    }

    const handleCreatePhoto = photoData => {
        const formData = new FormData()
        Object.keys(photoData).forEach(key => formData.append(key, photoData[key]))

        dispatch(publishPhoto(formData))
        resetMessage()
    }

    const handleDeletePhoto = id => {
        const confirmDelete = window.confirm("Excluir foto?")

        if (confirmDelete) {
            dispatch(deletePhoto(id))
            resetMessage()
        }
    }

    const handleUpdatePhoto = photoData => {
        dispatch(updatePhoto(photoData))
        resetMessage()
    }

    if (loading) {
        return <div className='loading'>Carregando...</div>
    }

    return (
        <>
            <section className={styles.profile}>
                <Container className={styles.profile__container}>
                    <div className={styles.profile__image}>
                        <img src={user.profileImage ? `${uploads}/users/${user.profileImage}` : "/images/user.png"} alt={user.name} />
                    </div>

                    <div className={styles.profile__info}>
                        <header className={styles.profile__name}>
                            <h2>{user.name}</h2>
                        </header>

                        <div className={styles.profile__actions}>
                            {formIsOpen
                                ? <button className="button small" onClick={handleCancelForm}>Ver publicações</button>

                                : <>
                                    <Link to="/perfil" className="button small not-highlighted">Editar Perfil</Link>
                                    <button className="button small" onClick={() => setFormIsOpen(true)}>Novo Post</button>
                                </>}
                        </div>
                    </div>

                    <div className={styles.profile__bio}>
                        <p>{user.bio}</p>
                        <p className={styles.profile__postsQt}>
                            {photos.length ?? 0}&nbsp;
                            {photos && photos.length === 1 ? "publicação" : "publicações"}
                        </p>
                    </div>
                </Container>
            </section>

            <section className={styles.photos}>
                <Container>
                    {formIsOpen
                        ? (editing
                            ? <PhotoForm
                                action="edit"
                                onCancel={handleCancelForm}
                                onSubmit={handleUpdatePhoto}
                                photoToEdit={photoToEdit}
                                loading={photoLoading}
                                message={photoMessage}
                                error={photoError} />

                            : <PhotoForm
                                action="create"
                                onCancel={handleCancelForm}
                                onSubmit={handleCreatePhoto}
                                loading={photoLoading}
                                message={photoMessage}
                                error={photoError} />)

                        : <PhotosList
                            onEdit={handleOpenFormEdit}
                            photos={photos}
                            userId={id}
                            userAuthId={userAuth._id}
                            message={photoMessage}
                            onDelete={handleDeletePhoto} />}
                </Container>
            </section>
        </>
    )
}

export default Profile