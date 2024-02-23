import React from "react";
import { Box, Button, Flex, useColorModeValue } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";

const Navigation = ({ isLoggedIn }) => {
  return (
    <Flex bg={useColorModeValue("gray.100", "gray.900")} p={4} justifyContent="flex-end">
      {!isLoggedIn && (
        <Box>
          <Link to="/login">
            <Button leftIcon={<FaSignInAlt />}>Login</Button>
          </Link>
        </Box>
      )}
    </Flex>
  );
};

export default Navigation;
