import { useContext, useState } from 'react'
import Navbar from './component/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Products from './pages/Products'
import { AuthContext } from './context/authcontext'
import SingleProduct from './pages/SingleProduct'
function App() {
  const {isAuth}=useContext(AuthContext)
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={isAuth?<Home />:<Login />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/products" element={isAuth?<Products/>:<Login/>} />
        <Route path={`/product`} element={isAuth?<SingleProduct/>:<Login/>} />
      </Routes>
    </>
  )
}

export default App
