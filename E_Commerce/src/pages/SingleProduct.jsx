import { StarIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Flex,
  HStack,
  Image,
  Tag,
  Text,
  useToast,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SingleProduct = () => {
  const toast = useToast();
  const { product_id } = useParams();
  const [product, setProduct] = useState({
    id: 0,
    title: "",
    description: "",
    category: "",
    price: 0,
    image: "",
    rating: { rate: 0, count: 0 },
  });
  const getData = async () => {
    try {
      let res = await axios.get(
        `https://fakestoreapi.com/products/${product_id}`
      );
      console.log(res);
      if (res.status == 200) setProduct(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleBuy = () => {
    toast({
      title: "Thank you for your purchase!",
      description: "Your item will be deliver within the next three business days.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };
  const handleCart = () => {
    toast({
      title: "Item Added in to Cart",
      description: "Thak you for adding the item into your cart.",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <Box
        p={4}
        borderWidth="1px"
        rounded="lg"
        shadow="md"
        w={"60%"}
        m={"50px auto"}
      >
        <Flex columnGap={5}>
          <Box w={"300px"} h={"auto"}>
            <Image w={"300px"} h={"280px"} src={product.image} />
          </Box>
          <Box w={"full"} p={5}>
            <Text noOfLines={1} fontWeight={700}>
              {product.title}
            </Text>
            <Text noOfLines={3}>{product.description}</Text>
            <Tag
              m={"10px auto"}
              size="lg"
              bg="green.300"
              color={"black"}
              fontWeight={700}
            >
              Category : {product.category}
            </Tag>
            <Divider m={"10px auto"} border={"1px"} />
            <Text size="xxl" color="blue.600" fontWeight={700} fontSize={22}>
              INR : {product.price}
            </Text>
            <HStack spacing={2} m={"10px auto"}>
              <Tag size="lg" bg="blue.300" color={"black"} fontWeight={700}>
                {product.rating.rate}
                <StarIcon color="black" m={1} />
                Rating
              </Tag>
              <Tag size="lg" bg="green.300" color={"black"} fontWeight={700}>
                {product.rating.count} Reviews
              </Tag>
            </HStack>
          </Box>
        </Flex>
        <ButtonGroup
          w={"100%"}
          m={"20px auto"}
          variant="solid"
          justifyContent="center"
        >
          <Button w={"40%"} onClick={handleBuy} colorScheme="green">
            Buy Now
          </Button>
          <Button
            w={"40%"}
            leftIcon={<AddIcon />}
            onClick={handleCart}
            colorScheme="blue"
          >
            Add to Cart
          </Button>
        </ButtonGroup>
      </Box>
    </>
  );
};

export default SingleProduct;
