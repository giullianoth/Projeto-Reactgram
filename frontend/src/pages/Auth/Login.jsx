import { useState } from "react"
import Container from "../../components/Container"
import Logo from "../../components/Logo"
import styles from "./Auth.module.css"
import Message from "../../components/Message"
import { Link } from "react-router-dom"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = event => {
    event.preventDefault()
  }

  return (
    <section className={styles.auth}>
      <Container>
        <div className="bordered-wrapper first">
          <header className={styles.auth__title}>
            <h2>
              <Logo />
            </h2>

            <p className={styles.auth__subtitle}>Faça o login para ver o que há de novo.</p>
          </header>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              value={email ?? ""}
              onChange={event => setEmail(event.target.value)} />

            <input
              type="password"
              name="password"
              placeholder="Senha"
              value={password ?? ""}
              onChange={event => setPassword(event.target.value)} />

            <button type="submit" className="button">Entrar</button>
          </form>

          <Message message="Mensaaaaaaaaaagem!" type="error" />
        </div>

        <div className={`bordered-wrapper last ${styles.auth__change}`}>
          <p>Ainda não tem uma conta? <Link to="/cadastrar">Cadastre-se</Link></p>
        </div>
      </Container>
    </section>
  )
}

export default Login