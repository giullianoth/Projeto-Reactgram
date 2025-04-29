import Container from "../Container"
import styles from "./Footer.module.css"

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <Container className={styles.footer__container}>
                <span className={`logo ${styles.footer__logo}`}>
                    <span>th</span> Thgram
                </span>

                <span>&copy; {(new Date()).getFullYear()}</span>
            </Container>
        </footer>
    )
}

export default Footer