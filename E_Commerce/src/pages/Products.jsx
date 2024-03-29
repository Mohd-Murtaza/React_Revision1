import React from 'react'
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
const Products = () => {
  return (
    <>
     <Flex w={"90%"} gap={10} m={"0px auto 30px"} >
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
    </>
  )
}

export default Products
