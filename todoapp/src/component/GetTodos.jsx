import {
  Box,
  Button,
  Flex,
  Switch,
  Text,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

const GetTodos = (check = { todoAdd }) => {
  const toast = useToast();
  const [todos, setTodos] = useState([]);
  const [todosData, setTodosData] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [assigneeFilter, setAssigneeFilter] = useState("");
  const [sortByDate,setSortByDate]=useState("");

  const getData = async () => {
    try {
      const res = await axios.get(`https://todo-mock-server-vuc6.onrender.com/todos`);
      setTodosData(res.data);
      setTodos(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleStatus = async (id) => {
    try {
      const toggle = await axios.patch(`https://todo-mock-server-vuc6.onrender.com/todos/${id}`, {
        status: "completed",
      });
      getData();
    } catch (error) {
      console.log(error);
    }
  };
  const deleteTodo = async (id) => {
    if (window.confirm("Are you sure to remove this todo?")) {
      await axios.delete(`https://todo-mock-server-vuc6.onrender.com/todos/${id}`);
      getData();
    }
  };

  const applyFilters = () => {
    let filteredData = [...todos];

    if (statusFilter !== "") {
      filteredData = filteredData.filter((todo) => todo.status === statusFilter);
      setTodosData(filteredData);
    }
    if (assigneeFilter !== "") {
      filteredData = filteredData.filter((todo) => todo.assignedTo === assigneeFilter);
      setTodosData(filteredData);
    }

    if (filteredData.length===0) {
      toast({
        title: "No Todos Found!",
        status: "info",
        isClosable: true,
        position: "top",
      });
    }
  };

  useEffect(() => {
    getData();
  }, [check]);

  useEffect(() => {
    if(statusFilter!=="" || assigneeFilter!==""){
      applyFilters()
    }
  }, [statusFilter, assigneeFilter]);

  useEffect(() => {
    if (sortByDate === "asc") {
      setTodosData([...todosData.sort((a, b) => new Date(a.completionDate) - new Date(b.completionDate))]);
    } else if (sortByDate === "desc") {
      setTodosData([...todosData.sort((a, b) => new Date(b.completionDate) - new Date(a.completionDate))]);
    }
  }, [sortByDate]);


  return (
    <>
      <Flex w={"90%"} gap={10} m={"0px auto 30px"} p={"1px 8px"}>
        <Menu closeOnSelect={true}>
          <MenuButton as={Button} colorScheme="blue">
            Filter by Status
          </MenuButton>
          <MenuList minWidth="240px">
            <MenuOptionGroup
              title="Select Below"
              defaultValue=""
              type="radio"
              onChange={(e) => setStatusFilter(e)}
            >
              <MenuItemOption value="completed">Completed</MenuItemOption>
              <MenuItemOption value="incomplete">Incomplete</MenuItemOption>
            </MenuOptionGroup>
          </MenuList>
        </Menu>
        <Menu closeOnSelect={true}>
          <MenuButton as={Button} colorScheme="pink">
            Filter by Assigned to
          </MenuButton>
          <MenuList minWidth="240px">
            <MenuOptionGroup
              title="Select Below"
              defaultValue=""
              type="radio"
              onChange={(e) => setAssigneeFilter(e)}
            >
              <MenuItemOption value="Murtaza">Murtaza</MenuItemOption>
              <MenuItemOption value="Rahul">Rahul</MenuItemOption>
              <MenuItemOption value="Shubham">Shubham</MenuItemOption>
            </MenuOptionGroup>
          </MenuList>
        </Menu>
        <Menu closeOnSelect={true}>
          <MenuButton as={Button} colorScheme="green">
            Sort by Date
          </MenuButton>
          <MenuList minWidth="240px">
            <MenuOptionGroup
              title="Select Below"
              defaultValue=""
              type="radio"
              onChange={(e) => setSortByDate(e)}
            >
              <MenuItemOption value="asc">Newest</MenuItemOption>
              <MenuItemOption value="desc">Oldest</MenuItemOption>
            </MenuOptionGroup>
          </MenuList>
        </Menu>
      </Flex>
      {todosData.map((ele, ind) => (
        <Flex
          key={ind}
          w={"90%"}
          gap={5}
          m="5px auto"
          justifyContent="space-between"
        >
          <Box w="30px">
            <Text textAlign="center">{ind + 1}</Text>
          </Box>
          <Box w="300px">
            <Text noOfLines={1}>{ele.title}</Text>
          </Box>
          <Box w="200px">
            <Text>Due Date {ele.completionDate}</Text>
          </Box>
          <Box w="100px">
            <Text>{ele.assignedTo}</Text>
          </Box>
          <Flex
            w={"120px"}
            gap={2}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Text>
              {ele.status == "completed" ? "Completed" : "Incomplete"}
            </Text>
            <Switch
              onChange={() => toggleStatus(ele.id)}
              colorScheme="green"
              isFocusable={!ele.status == "completed"}
              isDisabled={ele.status == "completed"}
              isChecked={ele.status == "completed"}
            />
          </Flex>
          <Button onClick={() => deleteTodo(ele.id)} colorScheme="red">
            Delete
          </Button>
        </Flex>
      ))}
    </>
  );
};

export default GetTodos;
