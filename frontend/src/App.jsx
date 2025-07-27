import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Header from './components/Header'
import Footer from './components/Footer'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import EditProfile from './pages/EditProfile'
import Profile from './pages/Profile'

function App() {
  return (
    <BrowserRouter>
      <Header />

      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/cadastrar' element={<Register />} />
          <Route path='/perfil' element={<EditProfile />} />
          <Route path='/usuarios/:id' element={<Profile />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  )
}

export default App
