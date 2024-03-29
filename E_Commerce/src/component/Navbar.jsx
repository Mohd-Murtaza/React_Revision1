import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import {
    Flex,
    Text
} from  '@chakra-ui/react'
import { AuthContext } from '../context/authcontext'
const Navbar = () => {
  const {isAuth}=useContext(AuthContext);
  return (
    <>
      <Flex w={"90%"} m={"10px auto"} bg={"blue.300"} borderRadius={"4px"} justifyContent={"space-around"}>
        <Link to={isAuth?"/":"/login"}><Text color="black" fontSize={"22px"} fontWeight={500}>Home</Text></Link>
        <Link to={"/login"}><Text color="black" fontSize={"22px"} fontWeight={500}>Login</Text></Link>
        <Link to={isAuth?"/products":"/login"}><Text color="black" fontSize={"22px"} fontWeight={500}>Products</Text></Link>
      </Flex>
    </>
  )
}

export default Navbar
