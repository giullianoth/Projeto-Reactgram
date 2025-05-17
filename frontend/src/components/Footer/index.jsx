import styles from "./Footer.module.css"

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <span className="logo">Thgram</span>
      <span>&copy; {(new Date()).getFullYear()}</span>
    </footer>
  )
}

export default Footer