import { FaComment, FaEye, FaHeart, FaPencil, FaXmark } from "react-icons/fa6"
import styles from "./PhotosList.module.css"
import { Link } from "react-router-dom"

const PhotosList = ({ onEdit }) => {
  const images = [
    "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXN0cm9ub21pYXxlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1454789548928-9efd52dc4031?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGFzdHJvbm9taWF8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1601925762419-4d83d9bcd952?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJpc2NvaXRvc3xlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1752805936031-b6b6db069190?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyNXx8fGVufDB8fHx8fA%3D%3D",
    "https://portalhortolandia.com.br/wp-content/uploads/2025/07/Ozzy-Osbourne.jpg"
  ]

  return (
    <div className={styles.photos}>
      {images.map((image, index) => (
        <article key={index + 1} className={styles.photo}>
          <img src={image} alt="Photo" />

          <div className={styles.photo__actions}>
            <div className={styles.photo__stats}>
              <div>
                <FaHeart /> 10
              </div>

              <div>
                <FaComment /> 10
              </div>
            </div>

            <div className={styles.photo__stats}>
              <div>
                <Link to="/fotos/foto" title="Ver foto">
                  <FaEye />
                </Link>
              </div>

              <div>
                <button className="button clear" title="Editar foto" onClick={onEdit}>
                  <FaPencil />
                </button>
              </div>

              <div>
                <button className="button clear" title="Excluir foto">
                  <FaXmark />
                </button>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}

export default PhotosList