import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Header from './components/Header'
import Footer from './components/Footer'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import EditProfile from './pages/EditProfile'
import Profile from './pages/Profile'
import Photo from './pages/Photo'
import Search from './pages/Search'
import { useAuth } from './hooks/useAuth'

function App() {
  const { auth, loading } = useAuth()

  if (loading) {
    return <div className='loading'>Carregando...</div>
  }

  return (
    <BrowserRouter>
      <Header />

      <main>
        <Routes>
          <Route path='/' element={auth ? <Home /> : <Navigate to='/login' />} />
          <Route path='/login' element={!auth ? <Login /> : <Navigate to='/' />} />
          <Route path='/cadastrar' element={!auth ? <Register /> : <Navigate to='/' />} />
          <Route path='/perfil' element={auth ? <EditProfile /> : <Navigate to='/login' />} />
          <Route path='/usuarios/:id' element={auth ? <Profile /> : <Navigate to='/login' />} />
          <Route path='/fotos/:id' element={auth ? <Photo /> : <Navigate to='/login' />} />
          <Route path='/buscar' element={<Search />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  )
}

export default App
