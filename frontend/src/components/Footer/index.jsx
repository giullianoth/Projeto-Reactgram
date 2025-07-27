import Logo from "../Logo"
import styles from "./Footer.module.css"

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Logo />&nbsp;
      &copy; {(new Date()).getFullYear()}
    </footer>
  )
}

export default Footer