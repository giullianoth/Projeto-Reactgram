import styles from "./Message.module.css"

const Message = ({ type, message }) => {
    return (
        <p className={styles.message + (type ? ` ${styles[type]}` : "")}>
            {message}
        </p>
    )
}

export default Message