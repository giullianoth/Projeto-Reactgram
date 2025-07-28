import { FaRegComment, FaRegHeart } from "react-icons/fa6"
import Container from "../Container"
import styles from "./PhotoItem.module.css"
import { Link } from "react-router-dom"

const PhotoItem = () => {
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
                <button className="button clear">
                    <FaRegHeart />
                </button>

                <button className="button clear">
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

                <p className={styles.photo__comments}>Ver todos os 48 comentários</p>
            </div>
        </Container>
    )
}

export default PhotoItem