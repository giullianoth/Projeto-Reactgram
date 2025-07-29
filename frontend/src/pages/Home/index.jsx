import PhotoItem from "../../components/PhotoItem"
import styles from "./Home.module.css"

const Home = () => {
  return (
    <section>
      <div className={styles.home__photo}>
        <PhotoItem />
      </div>

      <div className={styles.home__photo}>
        <PhotoItem />
      </div>
      
      <div className={styles.home__photo}>
        <PhotoItem />
      </div>
    </section>
  )
}

export default Home