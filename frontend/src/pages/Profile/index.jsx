import { Link } from "react-router-dom"
import Container from "../../components/Container"
import styles from "./Profile.module.css"
import PhotosList from "../../components/PhotosList"
import { useState } from "react"
import PhotoForm from "../../components/PhotoForm"

const Profile = () => {
    const [formIsOpen, setFormIsOpen] = useState(false)

    return (
        <>
            <section className={styles.profile}>
                <Container className={styles.profile__container}>
                    <div className={styles.profile__image}>
                        <img src="/images/user.png" alt="User" />
                    </div>

                    <div className={styles.profile__info}>
                        <header className={styles.profile__name}>
                            <h2>User</h2>
                        </header>

                        <div className={styles.profile__actions}>
                            {formIsOpen
                                ? <button className="button small" onClick={() => setFormIsOpen(false)}>Ver publicações</button>

                                : <>
                                    <Link to="/profile" className="button small not-highlighted">Editar Perfil</Link>
                                    <button className="button small" onClick={() => setFormIsOpen(true)}>Novo Post</button>
                                </>}
                        </div>
                    </div>

                    <div className={styles.profile__bio}>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, commodi!</p>
                        <p className={styles.profile__postsQt}>10 publicações</p>
                    </div>
                </Container>
            </section>

            <section className={styles.photos}>
                <Container>
                    {formIsOpen
                        ? <PhotoForm />

                        : <PhotosList />}
                </Container>
            </section>
        </>
    )
}

export default Profile