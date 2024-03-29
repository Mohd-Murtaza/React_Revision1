import { Box, Text } from '@chakra-ui/react'
import React from 'react'
import LoginForm from '../component/LoginForm';

const Login = () => {
  return (
    <>
     <Box w={"40%"} p={"12px"} borderRadius={"12px"} m={"30px auto"} boxShadow={"rgb(99,179,237) 0px 5px 15px"}>
        <LoginForm/>
     </Box>
    </>
  )
}
export default Login;
