import styles from "./Container.module.css"

const Container = ({ children, className, large }) => {
    return (
        <div
            className={
                styles.container
                + (className ? ` ${className}` : "")
                + (large ? ` ${styles.large}` : "")
            }
        >{children}</div>
    )
}

export default Container