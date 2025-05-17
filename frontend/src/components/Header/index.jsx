import styles from "./Header.module.css"
import Container from "../Container"
import { NavLink } from "react-router-dom"
import { BsSearch, BsX } from "react-icons/bs"
import { useState } from "react"

const Header = () => {
  const [searchIsVisible, setSearchIsVisible] = useState(false)

  return (
    <header className={styles.header}>
      <Container className={styles.header__container} expanded>
        <NavLink to="/">
          <h1 className={styles.header__title}>
            <span className="logo">Thgram</span>
          </h1>
        </NavLink>

        <nav>
          <ul className={styles.header__menu}>
            <li>
              <NavLink to="/login" className="mainMenuLink">Entrar</NavLink>
            </li>

            <li>
              <NavLink to="/cadastrar" className="mainMenuLink">Cadastrar</NavLink>
            </li>
          </ul>
        </nav>

        <div className={styles.header__search}>
          <button className={`button clear ${styles.open}`} onClick={() => setSearchIsVisible(true)}>
            <BsSearch />
          </button>

          <form className={searchIsVisible ? styles.visible : ""}>
            <div className={styles.header__searchWrapper}>
              <span className={styles.search}>
                <BsSearch />
              </span>

              <input type="text" placeholder="Pesquisar" />

              <span className={styles.close} onClick={() => setSearchIsVisible(false)}>
                <BsX />
              </span>
            </div>
          </form>
        </div>
      </Container>
    </header>
  )
}

export default Header