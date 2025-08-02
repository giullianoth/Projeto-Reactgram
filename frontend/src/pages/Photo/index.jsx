import { useParams } from "react-router-dom"
import PhotoItem from "../../components/PhotoItem"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getPhotoById } from "../../slices/photoSlice"

const Photo = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
  const { photo, loading, error, message } = useSelector(state => state.photo)

  useEffect(() => {
    dispatch(getPhotoById(id))
  }, [dispatch, id])

  if (loading) {
    return <div className='loading'>Carregando...</div>
  }

  return (
    <section>
      <PhotoItem
        photo={photo}
        userAuth={user}
        error={error}
        message={message} />
    </section>
  )
}

export default Photo