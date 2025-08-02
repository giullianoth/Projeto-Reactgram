import { FaComment, FaEye, FaHeart, FaPencil, FaXmark } from "react-icons/fa6"
import styles from "./PhotosList.module.css"
import { Link } from "react-router-dom"
import { uploads } from "../../utils/config"
import Message from "../Message"

const PhotosList = ({ photos, userId, userAuthId, message, onEdit, onDelete }) => {
  return (
    photos && photos.length
      ? <>
        <div className={styles.photos}>
          {photos.map(photo => (
            <article key={photo._id} className={styles.photo}>
              {photo.image &&
                <img src={`${uploads}/photos/${photo.image}`} alt={photo.title} />}

              <div className={styles.photo__actions}>
                <div className={styles.photo__stats}>
                  <div>
                    <FaHeart /> {photo.likes.length ?? 0}
                  </div>

                  <div>
                    <FaComment /> {photo.comments.length ?? 0}
                  </div>
                </div>

                <div className={styles.photo__stats}>
                  <div>
                    <Link to={`/fotos/${photo._id}`} title="Ver foto">
                      <FaEye />
                    </Link>
                  </div>

                  {userId === userAuthId &&
                    <>
                      <div>
                        <button className="button clear" title="Editar foto" onClick={() => onEdit(photo)}>
                          <FaPencil />
                        </button>
                      </div>

                      <div>
                        <button className="button clear" title="Excluir foto" onClick={() => onDelete(photo._id)}>
                          <FaXmark />
                        </button>
                      </div>
                    </>}
                </div>
              </div>
            </article>
          ))}
        </div>

        {message && <Message message={message} type="success" />}
      </>

      : <p className={styles.photos__empty}>Ainda não há fotos publicadas</p>
  )
}

export default PhotosList