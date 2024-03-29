import React, { useEffect, useState } from "react";
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
  Grid,
  Image,
  HStack,
  Divider,
  Tag,
} from "@chakra-ui/react";
import {StarIcon} from '@chakra-ui/icons';
import axios from "axios";
import SingleProduct from "./SingleProduct";
const Products = () => {
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState("");
  const [price, setPrice]=useState("");

  const getData = async () => {
    try {
      let res = await axios.get(`https://fakestoreapi.com/products`);
      console.log(res.data);
      if (res.status == 200) setData(res.data), setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const applyFilters = () => {
    let filteredData = [...data];

    if (category !== "") {
      filteredData = filteredData.filter((ele) => ele.category === category);
      setProducts(filteredData);
    }

    if (filteredData.length===0) {
      toast({
        title: "No Item Found!",
        status: "info",
        isClosable: true,
        position: "top",
      });
    }
  };
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    if(category!==""){
      applyFilters()
    }
  }, [category]);
  useEffect(() => {
    if (price === "asc") {
      setPrice([...products.sort((a, b) => (a.price) - (b.price))]);
    } else if (price === "desc") {
      setPrice([...products.sort((a, b) => (b.price) - (a.price))]);
    } else if (rating === "asc") {
      setRating([...products.sort((a, b) => (a.rating.rate) - (b.rating.rate))]);
    } else if (rating === "desc") {
      setRating([...products.sort((a, b) => (b.rating.rate) - (a.rating.rate))]);
    }
  }, [price,rating]);
  return (
    <>
      {/* filter flex */}
      <Flex w={"90%"} gap={10} m={"0px auto 30px"}>
        <Menu closeOnSelect={true}>
          <MenuButton as={Button} colorScheme="blue">
            Filter by Category
          </MenuButton>
          <MenuList minWidth="240px">
            <MenuOptionGroup
              title="Select Below"
              defaultValue=""
              type="radio"
              onChange={(e) => setCategory(e)}
            >
              <MenuItemOption value="men's clothing">Men's Clothing</MenuItemOption>
              <MenuItemOption value="women's clothing">Women's Clothing</MenuItemOption>
              <MenuItemOption value="jewelery">Jewelery</MenuItemOption>
              <MenuItemOption value="electronics">Electronics</MenuItemOption>
            </MenuOptionGroup>
          </MenuList>
        </Menu>
        <Menu closeOnSelect={true}>
          <MenuButton as={Button} colorScheme="pink">
            Sort by Rating
          </MenuButton>
          <MenuList minWidth="240px">
            <MenuOptionGroup
              title="Select Below"
              defaultValue=""
              type="radio"
              onChange={(e) => setRating(e)}
            >
              <MenuItemOption value="asc">Low to High</MenuItemOption>
              <MenuItemOption value="desc">High to Low</MenuItemOption>
            </MenuOptionGroup>
          </MenuList>
        </Menu>
        <Menu closeOnSelect={true}>
          <MenuButton as={Button} colorScheme="green">
            Sort by Price
          </MenuButton>
          <MenuList minWidth="240px">
            <MenuOptionGroup
              title="Select Below"
              defaultValue=""
              type="radio"
              onChange={(e) => setPrice(e)}
            >
              <MenuItemOption value="asc">Low to High</MenuItemOption>
              <MenuItemOption value="desc">High to Low</MenuItemOption>
            </MenuOptionGroup>
          </MenuList>
        </Menu>
      </Flex>
      <Grid w={"90%"} m={"20px auto"} templateColumns='repeat(4, 1fr)' gap={5}>
        {products.map((ele, ind) => (
          <Box
            key={ind}
            borderWidth="1px"
            p={5}
            w={"260px"}
            m={"auto"}
            rounded="lg"
            shadow="md"
          >
            <Image w={"200px"} h={"250px"} src={ele.image} alt={ele.title}/>
            <Text noOfLines={1} fontWeight={700}>{ele.title}</Text>
            <Text noOfLines={2}>{ele.description}</Text>
            <Text size="xxl" color="blue.600" fontWeight={700}>INR : {ele.price}</Text>
            <Tag m={"10px auto"} size="lg" bg='green.300' color={"black"} fontWeight={700}>{ele.category}</Tag>
            <Divider border={"1px"} />
            <HStack spacing={2} m={"10px auto"}>
              <Tag size="lg" bg='blue.300' color={"black"} fontWeight={700}>{ele.rating.rate}<StarIcon color='black' ml={1}/></Tag>
              <Tag size="lg" bg='green.300' color={"black"} fontWeight={700}>{ele.rating.count} Reviews</Tag>
            </HStack>
            <Button colorScheme='pink' width={"100%"} onClick={()=><SingleProduct/>}>View Details</Button>
          </Box>
        ))}
      </Grid>
    </>
  );
};

export default Products;
