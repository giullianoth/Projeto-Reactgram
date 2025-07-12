import styles from "./Trigger.module.css"

const Trigger = ({ message, type }) => {
  return (
    <div className={`${styles.trigger} ${styles[type]}`}>{message}</div>
  )
}

export default Trigger