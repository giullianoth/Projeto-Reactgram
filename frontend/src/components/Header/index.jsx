import styles from "./Header.module.css"
import Container from "../Container"
import { NavLink, useNavigate } from "react-router-dom"
import { BsHouseDoorFill, BsSearch, BsX } from "react-icons/bs"
import { FaUserEdit } from "react-icons/fa"
import { useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import { useDispatch, useSelector } from "react-redux"
import { RiLogoutBoxRLine } from "react-icons/ri"
import { logout, reset } from "../../slices/authSlice"
import userIcon from "/images/user.png"
import { uploads } from "../../utils/config"

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
                {user &&
                  <li>
                    <NavLink to={`/usuarios/${user._id}`} className="mainMenuLink">
                      <img src={`${uploads}/users/${user.profileImage}` ?? userIcon} alt={user.name} className={styles.header__profileImage} />
                    </NavLink>
                  </li>}

                <li>
                  <NavLink to="/" className="mainMenuLink">
                    <BsHouseDoorFill />
                  </NavLink>
                </li>

                <li>
                  <NavLink to={"/perfil"} className="mainMenuLink">
                    <FaUserEdit />
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