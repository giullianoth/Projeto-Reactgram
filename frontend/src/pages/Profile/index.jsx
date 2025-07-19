import Container from "../../components/Container"
import styles from "./Profile.module.css"
import { getUserDetails } from "../../slices/userSlice"
import { Link, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import userIcon from "/images/user.png"
import { uploads } from "../../utils/config"
import PhotoForm from "../../components/PhotoForm"
import { deletePhoto, getPhotosByUser, publishPhoto, resetMessage, updatePhoto } from "../../slices/photoSlice"
import PhotosList from "../../components/PhotosList"

const Profile = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { user, loading } = useSelector(state => state.user)
    const { user: userAuth } = useSelector(state => state.auth)
    const { photos, loading: photoLoading, message: photoMessage, error: photoError, success: photoSuccess } = useSelector(state => state.photo)
    const [showFormCreate, setShowFormCreate] = useState(false)
    const [showFormEdit, setShowFormEdit] = useState(false)
    const [photoToEdit, setPhotoToEdit] = useState(null)

    useEffect(() => {
        dispatch(getUserDetails(id))
        dispatch(getPhotosByUser(id))
    }, [dispatch, id])

    const resetComponentMessage = () => {
        setTimeout(() => {
            dispatch(resetMessage())
        }, 2000)
    }

    const handleCreate = data => {
        const formData = new FormData()
        Object.keys(data).forEach(key => formData.append(key, data[key]))
        dispatch(publishPhoto(formData))
        resetComponentMessage()
    }

    const handleUpdate = data => {
        const photoData = {
            _id: photoToEdit._id,
            title: data.title
        }

        dispatch(updatePhoto(photoData))
        resetComponentMessage()
    }

    const handleDelete = id => {
        const confirmDelete = window.confirm("Excluir foto?")

        if (confirmDelete) {
            dispatch(deletePhoto(id))
            resetComponentMessage()
        }
    }

    const handleCancel = () => {
        setShowFormCreate(false)
        setShowFormEdit(false)
        setPhotoToEdit(null)
        dispatch(resetMessage())
    }

    if (loading) {
        return <div className="loading">Carregando...</div>
    }

    return (
        <>
            <section className={styles.profile}>
                <Container>
                    <div className={styles.profile__userInfo}>
                        <div className={styles.profile__userPhoto}>
                            <img src={user.profileImage ? `${uploads}/users/${user.profileImage}` : userIcon} alt={user.name} />
                        </div>

                        <header className={styles.profile__userName}>
                            <h2>{user.name}</h2>

                            <div className={styles.profile__userActions}>
                                {showFormCreate || showFormEdit
                                    ? <button className="button small" onClick={handleCancel}>Ver publicações</button>

                                    : (id === userAuth._id &&
                                        <>
                                            <Link to="/perfil" className="button small">Editar Perfil</Link>
                                            <button className="button small" onClick={() => setShowFormCreate(true)}>Novo Post</button>
                                        </>)}
                            </div>
                        </header>

                        <div className={styles.profile__userBio}>
                            <p>{user.bio}</p>
                            <p className={styles.profile__postsQt}><strong>{photos.length}</strong> publicações</p>
                        </div>
                    </div>
                </Container>
            </section>

            {showFormCreate || showFormEdit
                ? (id === userAuth._id &&
                    <>
                        {showFormCreate &&
                            <PhotoForm
                                onSubmit={handleCreate}
                                onCancel={handleCancel}
                                message={photoMessage}
                                error={photoError}
                                loading={photoLoading}
                                action="create" />}

                        {showFormEdit &&
                            <PhotoForm
                                photoTitle={photoToEdit.title}
                                photoImage={photoToEdit.image}
                                onSubmit={handleUpdate}
                                onCancel={handleCancel}
                                message={photoMessage}
                                error={photoError}
                                loading={photoLoading}
                                action="edit" />}
                    </>)

                : <PhotosList
                    photos={photos}
                    userAuth={userAuth}
                    userId={id}
                    onDelete={handleDelete}
                    setPhotoToEdit={setPhotoToEdit}
                    setShowFormEdit={setShowFormEdit} />}
        </>
    )
}

export default Profile