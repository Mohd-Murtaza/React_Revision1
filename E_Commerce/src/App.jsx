import { useState } from 'react'
import Navbar from './component/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Products from './pages/Products'
function App() {

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/home" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/products" element={<Products/>} />
      </Routes>
    </>
  )
}

export default App
