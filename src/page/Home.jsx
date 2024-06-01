import { Box, IconButton, useColorMode } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import React from "react";
import { Navbar } from "../component/Navbar.jsx";
import { FaMoon, FaSun } from "react-icons/fa";

export function Home() {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <Box>
      <Navbar />
      <Box>
        <Outlet />
      </Box>

      <IconButton
        aria-label="toggle theme"
        rounded="full"
        size="md"
        position={"fixed"}
        bottom={2}
        left={2}
        onClick={toggleColorMode}
        icon={colorMode === "dark" ? <FaSun /> : <FaMoon />}
      />
    </Box>
  );
}
