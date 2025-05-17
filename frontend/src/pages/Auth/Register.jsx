import styles from "./Auth.module.css"
import Container from "../../components/Container"
import { Link } from "react-router-dom"
import { useState } from "react"

const Register = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleSubmit = event => {
    event.preventDefault()

    const user = {
      name,
      email,
      password,
      confirmPassword
    }

    console.log(user)
  }

  return (
    <section className={styles.auth}>
      <Container>
        <div className={`${styles.auth__wrapper} ${styles.first}`}>
          <header className={styles.auth__title}>
            <h1>
              <span className="logo">Thgram</span>
            </h1>

            <p>Cadastre-se para ver as fotos dos seus amigos.</p>
          </header>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Nome"
              value={name}
              onChange={event => setName(event.target.value)} />

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

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirmar senha"
              value={confirmPassword}
              onChange={event => setConfirmPassword(event.target.value)} />

            <button type="submit" className="button">Cadastrar</button>
          </form>
        </div>

        <p className={`${styles.auth__wrapper} ${styles.last}`}>Já tem uma conta? <Link to="/login">Log in</Link></p>
      </Container>
    </section>
  )
}

export default Register