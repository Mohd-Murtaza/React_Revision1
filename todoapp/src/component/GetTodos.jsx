import { Box, Button, Flex, Switch, Text } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const GetTodos = (check={todoAdd}) => {
    const [todosData, setTodosData] = useState([]);

    const getData = async () => {
        try {
            const res = await axios.get(`http://localhost:4000/todos`);
            setTodosData(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const toggleStatus = async (id) => {
        try {
                const toggle=await axios.patch(`http://localhost:4000/todos/${id}`, {status: true});
                getData();
        } catch (error) {
            console.log(error);
        }
    };
    const deleteTodo=async (id)=>{
        if(window.confirm('Are you sure to remove this todo?')){
            await axios.delete(`http://localhost:4000/todos/${id}`);
            getData()
        }   
    }

    useEffect(() => {
        getData();
    }, [check]);

    return (
        <>
            {todosData.map((ele, ind) => (
                <Flex key={ind} w={"90%"} gap={5} m="5px auto" justifyContent="space-between">
                    <Box w="30px">
                        <Text textAlign="center">
                            {ind + 1}
                        </Text>
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
                    <Flex w={"120px"} gap={2} justifyContent={"space-between"} alignItems={'center'}>
                        <Text>{ele.status ? 'Completed' : 'Pending'}</Text>
                        <Switch
                            onChange={() => toggleStatus(ele.id)}
                            colorScheme="green"
                            isFocusable={!ele.status}
                            isDisabled={ele.status}
                            isChecked={ele.status}
                        />
                    </Flex>
                    <Button onClick={()=>deleteTodo(ele.id)} colorScheme='red'>Delete</Button>
                </Flex>
            ))}
        </>
    );
};

export default GetTodos;
