import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Flex,
  Input,
  Select,
  Tag,
  TagLabel,
  useToast,
} from "@chakra-ui/react";
import GetTodos from "./GetTodos";

const AddTask = () => {
  const toast = useToast();
  const initialTodoData = {
    title: "",
    completionDate: "",
    assignedTo: "",
    status: "incomplete",
  };
  const [todoData, setTodoData] = useState(initialTodoData);
  const [todoAdd,setTodoAdd]=useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodoData({ ...todoData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      if (todoData.task!="" && todoData.completionDate!="" && todoData.assignedTo!= "") {
        console.log("Submitting data");
        let postData = await axios.post(`https://todo-mock-server-vuc6.onrender.com/todos`, {
          title: todoData.title,
          completionDate: todoData.completionDate,
          assignedTo: todoData.assignedTo,
          status: "incomplete",
        });
        if (postData){
            setTodoAdd(!todoAdd)
            setTodoData(initialTodoData)
        }
        toast({
          title: `Todo added succefully`,
          status: "success",
          isClosable: true,
          position: "top",
        });
      }else{
        toast({
        title: `Please fill all the details`,
        status: "warning",
        isClosable: true,
        position: "top",
        });
      }
    } catch (error) {
      donsole.log(error);
    }
  };

  return (
    <>
      <Flex gap={"10px"} mt={"50px"} mb={"50px"} justifyContent={"center"}>
        <Tag
          bg={"transparent"}
          boxShadow={"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}
        >
          <TagLabel w={"100px"}>Add Todo :-</TagLabel>
          <Input
            name="title"
            value={todoData.title}
            onChange={handleChange}
            w={"300px"}
            variant="flushed"
            placeholder="Enter Todo..."
          />
        </Tag>
        <Tag
          bg={"transparent"}
          boxShadow={"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}
        >
          <TagLabel w={"150px"}>Completion Date :-</TagLabel>
          <Input
            type="date"
            name="completionDate"
            value={todoData.completionDate}
            onChange={handleChange}
            w={"150px"}
            variant="flushed"
            placeholder="Completion Date"
          />
        </Tag>
        <Tag
          bg={"transparent"}
          boxShadow={"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}
        >
          <TagLabel w={"150px"}>Assigned To :-</TagLabel>
          <Select
            name="assignedTo"
            value={todoData.assignedTo}
            onChange={handleChange}
            variant={"flushed"}
            placeholder="Select User"
          >
            <option value="Murtaza">Murtaza</option>
            <option value="Rahul">Rahul</option>
            <option value="Shubham">Shubham</option>
          </Select>
        </Tag>
        <Button colorScheme="green" onClick={handleSubmit}>
          Submit
        </Button>
      </Flex>
      <GetTodos prop={todoAdd}/>
    </>
  );
};

export default AddTask;
