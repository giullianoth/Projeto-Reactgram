import { Link, NavLink } from "react-router-dom"
import Container from "../Container"
import styles from "./Header.module.css"
import { BsSearch, BsX } from "react-icons/bs"
import { useState } from "react"

const Header = () => {
    const [formIsVisible, setFormIsVisible] = useState(false)

    const handleSubmit = event => {
        event.preventDefault()

        setFormIsVisible(false)
    }

    return (
        <header className={styles.header}>
            <Container className={styles.header__container}>
                <h1 className={styles.header__title}>
                    <Link to="/">
                        <span className="logo">
                            <span>th</span> Thgram
                        </span>
                    </Link>
                </h1>

                <nav>
                    <ul className={`navbar ${styles.header__navbar}`}>
                        <li>
                            <NavLink to="/login">Entrar</NavLink>
                        </li>

                        <li>
                            <NavLink to="/cadastrar">Cadastrar</NavLink>
                        </li>
                    </ul>
                </nav>

                <div className={styles.header__search}>
                    <button className={styles.header__searchButton} onClick={() => setFormIsVisible(true)}>
                        <BsSearch />
                    </button>

                    <div className={styles.header__searchForm + (formIsVisible ? ` ${styles.visible}` : "")}>
                        <form onSubmit={handleSubmit}>
                            <BsSearch className={styles.header__searchIcon} />
                            <input type="text" placeholder="Procurar" />
                        </form>

                        <button className={styles.header__searchClose} onClick={() => setFormIsVisible(false)}>
                            <BsX />
                        </button>
                    </div>
                </div>
            </Container>
        </header>
    )
}

export default Header