import { useContext, useState } from 'react'
import Navbar from './component/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Products from './pages/Products'
import { AuthContext } from './context/authcontext'
function App() {
  const {isAuth}=useContext(AuthContext)
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/home" element={isAuth?<Home />:<Login />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/products" element={isAuth?<Products/>:<Login/>} />
      </Routes>
    </>
  )
}

export default App
