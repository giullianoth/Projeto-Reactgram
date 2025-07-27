import { Link } from "react-router-dom"
import Container from "../../components/Container"
import Logo from "../../components/Logo"
import styles from "./Auth.module.css"
import { useState } from "react"
import Message from "../../components/Message"

const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

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

                        <p className={styles.auth__subtitle}>Cadastre-se para ver as fotos dos seus amigos.</p>
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

                    <Message message="Mensaaaaaaaaaagem!" type="error" />
                </div>

                <div className={`bordered-wrapper last ${styles.auth__change}`}>
                    <p>Já tem uma conta? <Link to="/login">Faça login</Link></p>
                </div>
            </Container>
        </section>
    )
}

export default Register