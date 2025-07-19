import "./App.css"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Auth/Login"
import Register from "./pages/Auth/Register"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { useAuth } from "./hooks/useAuth"
import EditProfile from "./pages/EditProfile"
import Profile from "./pages/Profile"
import Photo from "./pages/Photo"

function App() {
  const { auth, loading } = useAuth()

  if (loading) {
    return <div className="loading">Carregando...</div>
  }

  return (
    <BrowserRouter>
      <Header />

      <main>
        <Routes>
          <Route path="/" element={auth ? <Home /> : <Navigate to="/login" />} />
          <Route path="/login" element={auth ? <Navigate to="/" /> : <Login />} />
          <Route path="/cadastrar" element={auth ? <Navigate to="/" /> : <Register />} />
          <Route path="/perfil" element={auth ? <EditProfile /> : <Navigate to="/login" />} />
          <Route path="/usuario/:id" element={auth ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/fotos/:id" element={auth ? <Photo /> : <Navigate to="/login" />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  )
}

export default App
