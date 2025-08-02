import { useDispatch, useSelector } from "react-redux"
import PhotoItem from "../../components/PhotoItem"
import styles from "./Home.module.css"
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage"
import { useEffect } from "react"
import { getAllPhotos } from "../../slices/photoSlice"
import Container from "../../components/Container"

const Home = () => {
  const dispatch = useDispatch()
  const resetMessage = useResetComponentMessage(dispatch)
  const { user } = useSelector(state => state.auth)
  const { photos, loading, error, message } = useSelector(state => state.photo)

  useEffect(() => {
    dispatch(getAllPhotos())
  }, [dispatch])

  if (loading) {
    return <div className='loading'>Carregando...</div>
  }

  return (
    <section>
      {photos && photos.length
        ? photos.map(photo => (
          <div key={photo._id} className={styles.home__photo}>
            <PhotoItem
              photo={photo}
              userAuth={user}
              error={error}
              message={message} />
          </div>
        ))

        : <Container>
          <p className={styles.home__empty}>Ainda não há publicações</p>
        </Container>}
      {/* <div className={styles.home__photo}>
        <PhotoItem />
      </div>

      <div className={styles.home__photo}>
        <PhotoItem />
      </div>
      
      <div className={styles.home__photo}>
        <PhotoItem />
      </div> */}
    </section>
  )
}

export default Home