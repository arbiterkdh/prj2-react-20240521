import { Box, Flex, IconButton, useColorMode } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import React from "react";
import { Navbar } from "../component/Navbar.jsx";
import { FaMoon, FaSun } from "react-icons/fa";
import OutestBox from "../theme/component/Box/OutestBox.jsx";
import CustomCenter from "../theme/component/CustomCenter.jsx";

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
      <OutestBox marginTop={60}>
        <Box textAlign={"center"}>
          <Box fontSize={"3xl"} m={2}>
            동.com
          </Box>
          <CustomCenter>
            <Flex gap={5} justifyContent={"center"}>
              <Box cursor={"pointer"}>About 동.com</Box>
              <Box cursor={"pointer"}>FAQ</Box>
              <Box cursor={"pointer"}>Legal</Box>
              <Box cursor={"pointer"}>Privacy Policy</Box>
              <Box cursor={"pointer"}>Contact Us</Box>
              <Box cursor={"pointer"}>Developers</Box>
            </Flex>
          </CustomCenter>
          <Box>kdhsmarto@kakao.com || 010-5742-4582</Box>
        </Box>
      </OutestBox>
    </Box>
  );
}
