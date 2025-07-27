import { Link, NavLink } from "react-router-dom"
import Container from "../Container"
import styles from "./Header.module.css"
import Logo from "../Logo"
import { FaMagnifyingGlass, FaXmark } from "react-icons/fa6"
import { useState } from "react"

const Header = () => {
    const [searchIsOpen, setSearchIsOpen] = useState(false)

    return (
        <header className={styles.header}>
            <Container className={styles.header__container} large>
                <div className={styles.header__logo}>
                    <Link to="/">
                        <Logo />
                    </Link>
                </div>

                <div className={styles.header__navigation}>
                    <nav>
                        <ul className={styles.header__navigationLinks}>
                            <li className={styles.header__navLink}>
                                <NavLink to="/login" className="main-navigation-link">Entrar</NavLink>
                            </li>

                            <li className={styles.header__navLink}>
                                <NavLink to="/cadastrar" className="main-navigation-link">Cadastrar</NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>

                <div className={styles.header__search}>
                    <button
                        className={`button clear ${styles.header__searchOpen}`}
                        onClick={() => setSearchIsOpen(true)}>
                        <FaMagnifyingGlass />
                    </button>

                    <div className={styles.header__searchWrapper + (searchIsOpen ? ` ${styles.open}` : "")}>
                        <div className={styles.header__searchForm}>
                            <FaMagnifyingGlass className={styles.header__searchIcon} />

                            <form>
                                <input type="text" name="search" placeholder="Pesquisar" />
                            </form>

                            <button
                                className={`button clear ${styles.header__searchClose}`}
                                onClick={() => setSearchIsOpen(false)}>
                                <FaXmark />
                            </button>
                        </div>
                    </div>
                </div>
            </Container>
        </header>
    )
}

export default Header