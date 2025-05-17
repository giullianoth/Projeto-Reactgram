import styles from "./Container.module.css"

const Container = ({ children, noClearance, expanded, className }) => {
    return (
        <div
            className={styles.container
                + (className ? ` ${className}` : "")
                + (noClearance ? ` ${styles.noClearance}` : "")
                + (expanded? ` ${styles.expanded}` : "")}>
            {children}
        </div>
    )
}

export default Container