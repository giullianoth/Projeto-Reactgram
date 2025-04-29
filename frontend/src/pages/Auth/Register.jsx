import { Link } from "react-router-dom"
import Container from "../../components/Container"
import styles from "./Auth.module.css"
import { useState } from "react"

const Register = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleSubmit = event => {
    event.preventDefault()

    const user = { name, email, password, confirmPassword }

    console.log(user)    
  }

  return (
    <Container>
      <section className={styles.auth}>
        <header className="title">
          <h1>Cadastrar</h1>
          <p>Cadastre-se para ver as fotos dos seus amigos.</p>
        </header>

        <form className={styles.auth__form} onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={event => setName(event.target.value)} />

          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={event => setEmail(event.target.value)} />

          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={event => setPassword(event.target.value)} />

          <input
            type="password"
            placeholder="Confirmar senha"
            value={confirmPassword}
            onChange={event => setConfirmPassword(event.target.value)} />

          <button type="submit">Cadastrar</button>
        </form>

        <p className={styles.auth__links}>
          Já tem uma conta? <Link className={styles.auth__link} to="/login"><strong>Entrar</strong></Link>
        </p>
      </section>
    </Container>
  )
}

export default Register