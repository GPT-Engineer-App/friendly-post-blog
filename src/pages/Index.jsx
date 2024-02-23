import React, { useState, useEffect } from "react";
import { Box, Button, Container, Heading, Stack, Input, Textarea, VStack, HStack, Divider, useToast, FormControl, FormLabel, Text } from "@chakra-ui/react";
import { FaSignInAlt, FaUserPlus, FaPen, FaTrash } from "react-icons/fa";

const apiBaseUrl = "https://backengine-staging-efw1.fly.dev";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const toast = useToast();

  // Fetch posts on component mount
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const response = await fetch(`${apiBaseUrl}/posts`);
    const data = await response.json();
    if (response.ok) {
      setPosts(data);
    } else {
      toast({
        title: "Error fetching posts.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

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
      setAccessToken(data.accessToken);
      setIsLoggedIn(true);
      setEmail("");
      setPassword("");
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

  const handleSignup = async () => {
    const response = await fetch(`${apiBaseUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (response.ok) {
      toast({
        title: "Signup successful. Please log in.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      const data = await response.json();
      toast({
        title: "Failed to sign up.",
        description: data.error,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleCreatePost = async () => {
    const response = await fetch(`${apiBaseUrl}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ title, content }),
    });
    if (response.ok) {
      setTitle("");
      setContent("");
      fetchPosts();
      toast({
        title: "Post created successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Failed to create post.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDeletePost = async (id) => {
    const response = await fetch(`${apiBaseUrl}/posts/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (response.ok) {
      fetchPosts();
      toast({
        title: "Post deleted successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Failed to delete post.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={8}>
        {/* Login functionality is now handled by a separate Login component, so the code related to login form and state handling is removed from here */}
        {isLoggedIn && (
          <>
            <Heading>Create Post</Heading>
            <FormControl id="title">
              <FormLabel>Title</FormLabel>
              <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </FormControl>
            <FormControl id="content">
              <FormLabel>Content</FormLabel>
              <Textarea value={content} onChange={(e) => setContent(e.target.value)} />
            </FormControl>
            <Button leftIcon={<FaPen />} onClick={handleCreatePost}>
              Create Post
            </Button>
          </>
        )}
        <Divider />
        <Heading>Posts</Heading>
        <Stack spacing={4} w="full">
          {posts.map((post) => (
            <Box key={post.id} p={5} shadow="md" borderWidth="1px">
              <Heading fontSize="xl">{post.title}</Heading>
              <Text mt={4}>{post.content}</Text>
              {isLoggedIn && (
                <Button leftIcon={<FaTrash />} colorScheme="red" size="sm" mt={4} onClick={() => handleDeletePost(post.id)}>
                  Delete
                </Button>
              )}
            </Box>
          ))}
        </Stack>
      </VStack>
    </Container>
  );
};

export default Index;
