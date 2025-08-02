import { FaHeart, FaRegComment, FaRegHeart } from "react-icons/fa6"
import Container from "../Container"
import styles from "./PhotoItem.module.css"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import AnimateHeight from "react-animate-height"
import Message from "../Message"
import { uploads } from "../../utils/config"
import { useDispatch, useSelector } from "react-redux"
import { getUserDetails } from "../../slices/userSlice"
import { comment, like } from "../../slices/photoSlice"
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage"

const PhotoItem = ({ photo, userAuth, error, message }) => {
    const [formCommentIsOpen, setFormCommentIsOpen] = useState(false)
    const [commentsIsOpen, setCommentsIsOpen] = useState(false)
    const [commentText, setCommentText] = useState("")

    const dispatch = useDispatch()
    const { user } = useSelector(state => state.user)
    const resetMessage = useResetComponentMessage(dispatch)

    const photoDate = (new Date(photo.createdAt)).toLocaleDateString()
    const commentDate = date => (new Date(date)).toLocaleDateString()

    useEffect(() => {
        if (photo.userId) {
            dispatch(getUserDetails(photo.userId))
        }
    }, [dispatch, photo])

    const handleLike = () => {
        dispatch(like(photo._id))
        resetMessage()
    }

    const handleComment = event => {
        event.preventDefault()

        const commentData = {
            comment: commentText,
            id: photo._id
        }

        dispatch(comment(commentData))
        setCommentText("")
        resetMessage()
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
                {photo.likes && photo.likes.includes(userAuth._id)
                    ? <FaHeart className={styles.photo__liked} />

                    : <button className="button clear" title="Curtir" onClick={handleLike}>
                        <FaRegHeart />
                    </button>}

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
                            ? photo.comments.map((comment, index) => (
                                <div key={`comment-${index + 1}`} className={styles.photo__comment}>
                                    <div className={styles.photo__commentImage}>
                                        <Link to={`/usuarios/${comment.userId}`}>
                                            <img src={comment.userImage ? `${uploads}/users/${comment.userImage}` : "/images/user.png"} alt={comment.userName} />
                                        </Link>
                                    </div>

                                    <div className={styles.photo__commentInfo}>
                                        <p>
                                            <Link to={`/usuarios/${comment.userId}`}>
                                                <strong>{comment.userName}</strong>
                                            </Link>&nbsp;
                                            {comment.comment}
                                        </p>

                                        <p className={styles.photo__commentDate}>{commentDate(photo.updatedAt)}</p>
                                    </div>
                                </div>
                            ))

                            : <p>Ainda não há comentários</p>}
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
                            value={commentText ?? ""}
                            onChange={event => setCommentText(event.target.value)} />

                        <div className="form-button-wrapper">
                            <button type="submit" className="button">Enviar</button>

                            <button
                                type="reset"
                                className="button not-highlighted"
                                onClick={() => setFormCommentIsOpen(false)}>Cancelar</button>
                        </div>
                    </form>
                </div>
            </AnimateHeight>

            {error && <Message message={error} type="error" />}
            {message && <Message message={message} type="success" />}
        </Container>
    )
}

export default PhotoItem