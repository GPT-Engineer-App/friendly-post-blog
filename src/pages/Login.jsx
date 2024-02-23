import React, { useState } from "react";
import { Box, Button, Container, FormControl, FormLabel, Input, VStack, useToast } from "@chakra-ui/react";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const apiBaseUrl = "https://backengine-staging-efw1.fly.dev";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const response = await fetch(`${apiBaseUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (response.ok) {
      setEmail("");
      setPassword("");
      localStorage.setItem("accessToken", data.accessToken);
      navigate("/");
      toast({
        title: "Logged in successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Failed to log in.",
        description: data.error,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="container.sm" py={10}>
      <VStack spacing={4}>
        <FormControl id="email">
          <FormLabel>Email address</FormLabel>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </FormControl>
        <Box w="full">
          <Button leftIcon={<FaSignInAlt />} w="full" onClick={handleLogin}>
            Login
          </Button>
        </Box>
      </VStack>
    </Container>
  );
};

export default Login;
