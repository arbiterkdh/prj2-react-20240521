import { useNavigate } from "react-router-dom";
import { Box, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMugHot } from "@fortawesome/free-solid-svg-icons";

export function Navbar() {
  const navigate = useNavigate();
  return (
    <Heading size={"lg"}>
      <Flex gap={3}>
        <Box
          onClick={() => navigate("/")}
          cursor={"pointer"}
          _hover={{ color: "orange.700" }}
          mr={5}
        >
          <FontAwesomeIcon icon={faMugHot} />
          HOME
        </Box>
        <Box
          onClick={() => navigate("/write")}
          cursor={"pointer"}
          _hover={{ color: "orange.400" }}
        >
          글쓰기
        </Box>
        <Box
          onClick={() => navigate("/member/list")}
          cursor={"pointer"}
          _hover={{ color: "orange.400" }}
        >
          회원목록
        </Box>
        <Box
          onClick={() => navigate("/signup")}
          cursor={"pointer"}
          _hover={{ color: "orange.400" }}
        >
          회원가입
        </Box>
      </Flex>
    </Heading>
  );
}
