import "./App.css"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Auth/Login"
import Register from "./pages/Auth/Register"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { useAuth } from "./hooks/useAuth"

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
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  )
}

export default App
