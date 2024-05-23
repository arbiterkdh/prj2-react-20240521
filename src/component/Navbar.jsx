import { useNavigate } from "react-router-dom";
import { Box, Flex, Heading, Spacer, useToast } from "@chakra-ui/react";
import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCarrot, faMugHot } from "@fortawesome/free-solid-svg-icons";
import { LoginContext } from "./LoginProvider.jsx";

export function Navbar() {
  const navigate = useNavigate();
  const account = useContext(LoginContext);
  const toast = useToast();
  return (
    <Heading size={"lg"}>
      <Flex gap={3}>
        <Box
          onClick={() => navigate("/")}
          cursor={"pointer"}
          sx={{
            color: "orange.500",
            _hover: { color: "orange.400" },
          }}
          mr={5}
        >
          <FontAwesomeIcon icon={faMugHot} />
          HOME
        </Box>
        {account.isLoggedIn() && (
          <Box
            onClick={() => navigate("/write")}
            cursor={"pointer"}
            _hover={{ color: "orange.400" }}
          >
            글쓰기
          </Box>
        )}

        {account.isLoggedIn() && (
          <Box
            onClick={() => navigate("/member/list")}
            cursor={"pointer"}
            _hover={{ color: "orange.400" }}
          >
            회원목록
          </Box>
        )}
        {!account.isLoggedIn() && (
          <Box
            onClick={() => navigate("/signup")}
            cursor={"pointer"}
            _hover={{ color: "orange.400" }}
          >
            회원가입
          </Box>
        )}
        {!account.isLoggedIn() && (
          <Box
            onClick={() => navigate("/login")}
            cursor={"pointer"}
            _hover={{ color: "orange.400" }}
          >
            로그인
          </Box>
        )}
        <Spacer />
        {account.isLoggedIn() && (
          <Box>
            <FontAwesomeIcon icon={faCarrot} />
            {account.nickName}
          </Box>
        )}
        {account.isLoggedIn() && (
          <Box
            onClick={() => {
              account.logout();
              toast({
                status: "info",
                description: "로그아웃 되었습니다.",
                position: "bottom-right",
              });
              navigate("/login");
            }}
            cursor={"pointer"}
            _hover={{ color: "orange.400" }}
          >
            로그아웃
          </Box>
        )}
      </Flex>
    </Heading>
  );
}
