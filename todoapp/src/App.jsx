import { useState } from 'react'
import './App.css'
import { Text } from '@chakra-ui/react'
import AddTask from './component/AddTask'
import GetTodos from './component/GetTodos'

function App() {

  return (
    <>
      <Text 
      fontSize={{ base: "2xl", md:"4xl" }}
      fontWeight={700}
      textAlign={"center"}
      m={5}
      >Todo App</Text>
      <AddTask/>
    </>
  )
}

export default App
