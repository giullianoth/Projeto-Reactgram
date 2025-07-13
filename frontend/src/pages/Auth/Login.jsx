import { Link } from "react-router-dom"
import Container from "../../components/Container"
import styles from "./Auth.module.css"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { login, reset } from "../../slices/authSlice"
import Trigger from "../../components/Trigger"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const { loading, error } = useSelector(state => state.auth)

  const handleSubmit = event => {
    event.preventDefault()
    const user = { email, password }
    dispatch(login(user))
  }

  useEffect(() => {
    dispatch(reset())
  }, [dispatch])

  return (
    <section className={styles.auth}>
      <Container>
        <div className={`${styles.auth__wrapper} ${styles.first}`}>
          <header className={styles.auth__title}>
            <h1>
              <span className="logo">Thgram</span>
            </h1>

            <p>Faça o login para ver o que há de novo.</p>
          </header>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              value={email}
              onChange={event => setEmail(event.target.value)} />

            <input
              type="password"
              name="password"
              placeholder="Senha"
              value={password}
              onChange={event => setPassword(event.target.value)} />

            <button type="submit" className="button" disabled={loading}>
              {loading ? "Aguarde..." : "Entrar"}
            </button>
          </form>

          {error && <Trigger type="error" message={error} />}
        </div>

        <p className={`${styles.auth__wrapper} ${styles.last}`}>Ainda não tem uma conta? <Link to="/cadastrar">Cadastre-se</Link></p>
      </Container>
    </section>
  )
}

export default Login