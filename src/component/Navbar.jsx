import { useNavigate } from "react-router-dom";
import { Box, Flex, Heading, Spacer, useToast } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCarrot,
  faHouse,
  faPenToSquare as solidPen,
} from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare as emptyPen } from "@fortawesome/free-regular-svg-icons";
import "./../App.css";
import { LoginContext } from "./LoginProvider.jsx";

export function Navbar() {
  const navigate = useNavigate();
  const account = useContext(LoginContext);
  const toast = useToast();
  const [ani1, setAni1] = useState(0);
  const [ani2, setAni2] = useState(0);
  const [ani3, setAni3] = useState(0);

  return (
    <Heading size={"lg"} m={2}>
      <Flex gap={3}>
        <Box
          onClick={() => navigate("/")}
          cursor={"pointer"}
          sx={{
            color: "orange.500",
            _hover: { color: "orange.400" },
          }}
          mr={5}
          onMouseEnter={() => setAni1(1)}
          onMouseLeave={() => setAni1(0)}
        >
          동.com
          {ani1 === 0 && <FontAwesomeIcon icon={faHouse} />}
          {ani1 === 1 && <FontAwesomeIcon icon={faHouse} bounce />}
        </Box>
        {account.isLoggedIn() && (
          <Box
            onClick={() => navigate("/write")}
            cursor={"pointer"}
            onMouseEnter={() => setAni2(1)}
            onMouseLeave={() => setAni2(0)}
          >
            {ani2 === 0 && <FontAwesomeIcon icon={emptyPen} />}
            {ani2 === 1 && <FontAwesomeIcon icon={solidPen} beat />}
          </Box>
        )}

        {account.isAdmin() && (
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
          <Box
            onClick={() => {
              navigate(`/member/${account.id}`);
            }}
            cursor={"pointer"}
            _hover={{ color: "orange.400" }}
            onMouseEnter={() => setAni3(1)}
            onMouseLeave={() => setAni3(0)}
          >
            {account.nickName} 님
            {ani3 === 0 && (
              <FontAwesomeIcon
                icon={faCarrot}
                color="#DD6B20"
                style={{ marginLeft: "10px" }}
              />
            )}
            {ani3 === 1 && (
              <FontAwesomeIcon
                icon={faCarrot}
                shake
                color="#DD6B20"
                style={{ marginLeft: "10px" }}
              />
            )}
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
            _hover={{ color: "red.500" }}
          >
            로그아웃
          </Box>
        )}
      </Flex>
    </Heading>
  );
}
