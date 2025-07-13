import styles from "./Header.module.css"
import Container from "../Container"
import { NavLink, useNavigate } from "react-router-dom"
import { BsFillCameraFill, BsFillPersonFill, BsHouseDoorFill, BsSearch, BsX } from "react-icons/bs"
import { useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import { useDispatch, useSelector } from "react-redux"
import { RiLogoutBoxRLine } from "react-icons/ri"
import { logout, reset } from "../../slices/authSlice"

const Header = () => {
  const [searchIsVisible, setSearchIsVisible] = useState(false)
  const { auth } = useAuth()
  const { user } = useSelector(state => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate("/login")
  }

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
            {auth
              ? <>
                <li>
                  <NavLink to="/" className="mainMenuLink">
                    <BsHouseDoorFill />
                  </NavLink>
                </li>

                {user &&
                  <li>
                    <NavLink to={`/usuarios/${user._id}`} className="mainMenuLink">
                      <BsFillCameraFill />
                    </NavLink>
                  </li>}

                <li>
                  <NavLink to={"/perfil"} className="mainMenuLink">
                    <BsFillPersonFill />
                  </NavLink>
                </li>

                <li>
                  <button className="button clear" onClick={handleLogout}>
                    <RiLogoutBoxRLine />
                  </button>
                </li>
              </>

              : <>
                <li>
                  <NavLink to="/login" className="mainMenuLink">Entrar</NavLink>
                </li>

                <li>
                  <NavLink to="/cadastrar" className="mainMenuLink">Cadastrar</NavLink>
                </li>
              </>}
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