import React, { useContext } from "react";
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormControl, FormLabel, Input, Button, useToast } from "@chakra-ui/react"; // Assuming you're using Chakra UI for styling
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authcontext";

const LoginForm = () => {
    const toast=useToast();
    const navigate=useNavigate()
    const {setIsAuth}=useContext(AuthContext);
    const  handleSubmit = async(values) => {
        console.log("Login Submitted: ", values);
        // send request to server with username and password
        try {
            let res=await axios.post('https://reqres.in/api/login', values);
            console.log(res)
            if (res.status === 200){
                toast({
                    title:"Login Successful",
                    description:`Welcome to the E-commerce platform`,
                    status:'success',
                    duration:2000,
                    isClosable:true
                })
                localStorage.setItem('token',res.data.token);
                setIsAuth(true);
                navigate('/products')
            } 
        } catch (error) {
            console.log(error)
            if(error.response.status===400){
                toast({
                    title: 'Opps!',
                    description: "User not found.",
                    status: 'warning',
                    duration: 2000,
                    isClosable: true,
                  })
            }
        }
      };
  return (
    <>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Email Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          if (!values.password) {
            errors.password = "Password Required";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            handleSubmit(values);
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <FormControl isRequired>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Field
                type="email"
                name="email"
                placeholder="Email..."
                as={Input}
                id="email"
              />
              <ErrorMessage name="email" component="div" style={{ color: "red" }} />
              <FormLabel htmlFor="password">Password</FormLabel>
              <Field
                type="password"
                name="password"
                placeholder="Password"
                as={Input}
                id="password"
              />
              <ErrorMessage name="password" component="div" style={{ color: "red" }} />
              <Button
                mt={4}
                colorScheme="green"
                w={"100%"}
                isLoading={isSubmitting}
                onSubmit={handleSubmit}
                type="submit"
              >
                Submit
              </Button>
            </FormControl>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default LoginForm;
