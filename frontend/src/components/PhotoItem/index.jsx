import { FaRegComment, FaRegHeart } from "react-icons/fa6"
import Container from "../Container"
import styles from "./PhotoItem.module.css"
import { Link } from "react-router-dom"
import { useState } from "react"
import AnimateHeight from "react-animate-height"
import Message from "../Message"

const PhotoItem = () => {
    const [formCommentIsOpen, setFormCommentIsOpen] = useState(false)
    const [commentsIsOpen, setCommentsIsOpen] = useState(false)
    const [commentText, setCommentText] = useState("")

    const handleComment = event => {
        event.preventDefault()
    }

    return (
        <Container className={styles.photo}>
            <div className={styles.photo__heading}>
                <div className={styles.photo__profileImage}>
                    <Link>
                        <img src="/images/user.png" alt="User" />
                    </Link>
                </div>

                <header className={styles.photo__userName}>
                    <h2>
                        <Link>User</Link>
                    </h2>

                    <p>27 de julho de 2025</p>
                </header>
            </div>

            <div className={styles.photo__image}>
                <img src="https://portalhortolandia.com.br/wp-content/uploads/2025/07/Ozzy-Osbourne.jpg" alt="Photo" />
            </div>

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

                <p className={styles.photo__likesQt}>256 curtidas</p>
            </div>

            <div className={styles.photo__info}>
                <p className={styles.photo__title}>
                    <Link>
                        <strong>User</strong>
                    </Link>&nbsp;
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. R.I.P Ozzy
                </p>

                <button
                    className={`button clear ${styles.photo__comments}`}
                    onClick={() => setCommentsIsOpen(!commentsIsOpen)}>Ver todos os 48 comentários</button>
            </div>

            <AnimateHeight
                height={commentsIsOpen ? "auto" : 0}
                duration={300}>
                <article className={styles.photo__commentsWrapper}>
                    <header className={styles.photo__commentsTitle}>
                        <h3>Comentários (48)</h3>
                        <button className="button clear" onClick={() => setCommentsIsOpen(false)}>Fechar</button>
                    </header>

                    <div className={styles.photo__commentsList}>
                        <div className={styles.photo__comment}>
                            <div className={styles.photo__commentImage}>
                                <img src="/images/user.png" alt="User" />
                            </div>

                            <div className={styles.photo__commentInfo}>
                                <p><strong>User</strong> Comentááááááááário!!</p>
                                <p className={styles.photo__commentDate}>27 de julho de 2025</p>
                            </div>
                        </div>

                        <div className={styles.photo__comment}>
                            <div className={styles.photo__commentImage}>
                                <img src="/images/user.png" alt="User" />
                            </div>

                            <div className={styles.photo__commentInfo}>
                                <p><strong>User</strong> Comentááááááááário!!</p>
                                <p className={styles.photo__commentDate}>27 de julho de 2025</p>
                            </div>
                        </div>
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