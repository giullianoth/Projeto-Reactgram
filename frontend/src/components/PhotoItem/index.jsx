import { FaRegComment, FaRegHeart } from "react-icons/fa6"
import Container from "../Container"
import styles from "./PhotoItem.module.css"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import AnimateHeight from "react-animate-height"
import Message from "../Message"
import { uploads } from "../../utils/config"
import { useDispatch, useSelector } from "react-redux"
import { getUserDetails } from "../../slices/userSlice"

const PhotoItem = ({ photo }) => {
    const [formCommentIsOpen, setFormCommentIsOpen] = useState(false)
    const [commentsIsOpen, setCommentsIsOpen] = useState(false)
    const [commentText, setCommentText] = useState("")

    const dispatch = useDispatch()
    const { user } = useSelector(state => state.user)

    const photoDate = (new Date(photo.createdAt)).toLocaleDateString()

    useEffect(() => {
        if (photo.userId) {
            dispatch(getUserDetails(photo.userId))
        }
    }, [dispatch, photo])

    const handleComment = event => {
        event.preventDefault()
    }

    return (
        <Container className={styles.photo}>
            <div className={styles.photo__heading}>
                <div className={styles.photo__profileImage}>
                    <Link to={`/usuarios/${photo.userId}`}>
                        <img
                            src={user && user.profileImage ? `${uploads}/users/${user.profileImage}` : "/images/user.png"}
                            alt={photo.userName} />
                    </Link>
                </div>

                <header className={styles.photo__userName}>
                    <h2>
                        <Link to={`/usuarios/${photo.userId}`}>{photo.userName}</Link>
                    </h2>

                    <p>{photoDate}</p>
                </header>
            </div>

            {photo.image &&
                <div className={styles.photo__image}>
                    <img src={`${uploads}/photos/${photo.image}`} alt={photo.title} />
                </div>}

            <div className={styles.photo__actions}>
                <button className="button clear" title="Curtir">
                    <FaRegHeart />
                </button>

                <button
                    className="button clear"
                    title="Comentar"
                    onClick={() => setFormCommentIsOpen(!formCommentIsOpen)}>
                    <FaRegComment />
                </button>

                <p className={styles.photo__likesQt}>
                    {photo.likes ? photo.likes.length : 0}&nbsp;
                    {photo.likes && photo.likes.length === 1 ? "curtida" : "curtidas"}
                </p>
            </div>

            <div className={styles.photo__info}>
                <p className={styles.photo__title}>
                    <Link to={`/usuarios/${photo.userId}`}>
                        <strong>{photo.userName}</strong>
                    </Link>&nbsp;
                    {photo.title}
                </p>

                <button
                    className={`button clear ${styles.photo__comments}`}
                    onClick={() => setCommentsIsOpen(!commentsIsOpen)}>
                    {photo.comments && photo.comments.length
                        ? (photo.comments.length === 1 ? `Ver ${photo.comments.length} comentário` : `Ver todos os ${photo.comments.length} comentários`)
                        : "Ainda não tem comentários"}
                </button>
            </div>

            <AnimateHeight
                height={commentsIsOpen ? "auto" : 0}
                duration={300}>
                <article className={styles.photo__commentsWrapper}>
                    <header className={styles.photo__commentsTitle}>
                        <h3>Comentários ({photo.comments ? photo.comments.length : 0})</h3>
                        <button className="button clear" onClick={() => setCommentsIsOpen(false)}>Fechar</button>
                    </header>

                    <div className={styles.photo__commentsList}>
                        {photo.comments && photo.comments.length
                            ? <div className={styles.photo__comment}>
                                <div className={styles.photo__commentImage}>
                                    <img src="/images/user.png" alt="User" />
                                </div>

                                <div className={styles.photo__commentInfo}>
                                    <p><strong>User</strong> Comentááááááááário!!</p>
                                    <p className={styles.photo__commentDate}>27 de julho de 2025</p>
                                </div>
                            </div>

                            : <p>Ainda não tem comentários</p>}
                    </div>
                </article>
            </AnimateHeight>

            <AnimateHeight
                height={formCommentIsOpen ? "auto" : 0}
                duration={300}>
                <div className={styles.photo__commentsForm}>
                    <p>Adicionar comentário:</p>

                    <form onSubmit={handleComment}>
                        <input
                            type="text"
                            name="comment"
                            placeholder="Escreva seu comentário..."
                            value={commentText}
                            onChange={event => setCommentText(event.target.value)} />

                        <div className="form-button-wrapper">
                            <button type="submit" className="button">Enviar</button>
                            <button className="button not-highlighted" onClick={() => setFormCommentIsOpen(false)}>Cancelar</button>
                        </div>
                    </form>

                    <Message message="Mensaaaaaaaaaagem!" type="error" />
                </div>
            </AnimateHeight>
        </Container>
    )
}

export default PhotoItem