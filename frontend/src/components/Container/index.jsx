import styles from "./Container.module.css"

const Container = ({ children, noClearance, className }) => {
    const clearanceStyle = noClearance ? {
        style: { paddingInline: 0 }
    } : {}

    return (
        <div className={styles.container + (className ? ` ${className}` : "")} {...clearanceStyle}>
            {children}
        </div>
    )
}

export default Container