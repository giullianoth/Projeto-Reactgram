import { Link, NavLink } from "react-router-dom"
import Container from "../Container"
import styles from "./Header.module.css"
import Logo from "../Logo"
import { FaHouseChimney, FaMagnifyingGlass, FaXmark } from "react-icons/fa6"
import { useState } from "react"
import { BsFillPersonFill } from "react-icons/bs"
import { RiLogoutBoxRLine } from "react-icons/ri"

const Header = () => {
    const [searchIsOpen, setSearchIsOpen] = useState(false)
    const auth = true
    const user = {}

    return (
        <header className={styles.header}>
            <Container className={styles.header__container} large>
                <div className={styles.header__logo}>
                    <h1>
                        <Link to="/">
                            <Logo />
                        </Link>
                    </h1>
                </div>

                <div className={styles.header__navigation}>
                    <nav>
                        <ul className={styles.header__navigationLinks}>
                            {auth
                                ? <>
                                    {user &&
                                        <li>
                                            <NavLink to={`/usuarios/${user._id}`} className="main-navigation-link">
                                                <img src="/images/user.png" alt="User" className={styles.header__profileImage} />
                                            </NavLink>
                                        </li>}

                                    <li>
                                        <NavLink to="/" className="main-navigation-link">
                                            <FaHouseChimney />
                                        </NavLink>
                                    </li>

                                    <li>
                                        <NavLink to="/perfil" className="main-navigation-link">
                                            <BsFillPersonFill />
                                        </NavLink>
                                    </li>

                                    <li>
                                        <button className="button clear" title="Sair">
                                            <RiLogoutBoxRLine />
                                        </button>
                                    </li>
                                </>

                                : <>
                                    <li>
                                        <NavLink to="/login" className="main-navigation-link">Entrar</NavLink>
                                    </li>

                                    <li>
                                        <NavLink to="/cadastrar" className="main-navigation-link">Cadastrar</NavLink>
                                    </li>
                                </>}
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