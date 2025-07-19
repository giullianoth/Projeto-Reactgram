import { Link } from "react-router-dom"
import { uploads } from "../../utils/config"
import Container from "../Container"
import styles from "./PhotosList.module.css"
import { BsFillEyeFill, BsFillSuitHeartFill, BsPencilFill, BsXLg } from "react-icons/bs"
import { FaComment } from "react-icons/fa"

const PhotosList = ({ photos, userAuth, userId, onDelete, setPhotoToEdit, setShowFormEdit }) => {
    const handleShowFormEdit = photo => {
        setPhotoToEdit(photo)
        setShowFormEdit(true)
    }

    return (
        <section>
            <Container>
                {photos && photos.length
                    ? <div className={styles.photos__grid}>
                        {photos.map(photo => (
                            <div key={photo._id} className={styles.photo}>
                                <img src={`${uploads}/photos/${photo.image}`} alt={photo.title} />

                                <div className={styles.photo__view}>
                                    <div className={styles.photo__row}>
                                        <div>
                                            <BsFillSuitHeartFill />&nbsp;
                                            <strong>{photo.likes.length}</strong>
                                        </div>

                                        <div>
                                            <FaComment />&nbsp;
                                            <strong>{photo.comments.length}</strong>
                                        </div>
                                    </div>

                                    <div className={styles.photo__row}>
                                        <div>
                                            <Link to={`/fotos/${photo._id}`} title="Ver foto">
                                                <BsFillEyeFill />
                                            </Link>
                                        </div>

                                        {userId === userAuth._id &&
                                            <>
                                                <div>
                                                    <button
                                                        className="button clear"
                                                        title="Editar foto"
                                                        onClick={() => handleShowFormEdit(photo)}>
                                                        <BsPencilFill />
                                                    </button>
                                                </div>

                                                <div>
                                                    <button
                                                        className="button clear"
                                                        title="Excluir foto"
                                                        onClick={() => onDelete(photo._id)}>
                                                        <BsXLg />
                                                    </button>
                                                </div>
                                            </>}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    : <div className={styles.photos__empty}>Ainda não há publicações</div>}
            </Container>
        </section>
    )
}

export default PhotosList