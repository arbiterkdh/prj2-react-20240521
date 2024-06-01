import React from "react";
import { IconButton, useColorMode } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./page/Home.jsx";
import { BoardWrite } from "./page/board/BoardWrite.jsx";
import { BoardList } from "./page/board/BoardList.jsx";
import { BoardView } from "./page/board/BoardView.jsx";
import { BoardEdit } from "./page/board/BoardEdit.jsx";
import { MemberSignup } from "./page/member/MemberSignup.jsx";
import { MemberList } from "./page/member/MemberList.jsx";
import { MemberInfo } from "./page/member/MemberInfo.jsx";
import { MemberEdit } from "./page/member/MemberEdit.jsx";
import { MemberLogin } from "./page/member/MemberLogin.jsx";
import { LoginProvider } from "./component/LoginProvider.jsx";
import { FaMoon, FaSun } from "react-icons/fa";
import axios from "axios";

// axios interceptor 설정
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      { index: true, element: <BoardList /> },
      { path: "write", element: <BoardWrite /> },
      { path: "board/:id", element: <BoardView /> },
      { path: "edit/:id", element: <BoardEdit /> },
      { path: "signup", element: <MemberSignup /> },
      { path: "member/list", element: <MemberList /> },
      { path: "member/:id", element: <MemberInfo /> },
      { path: "member/edit/:id", element: <MemberEdit /> },
      { path: "login", element: <MemberLogin /> },
    ],
  },
]);

function App(props) {
  const { toggleColorMode, colorMode } = useColorMode();
  return (
    <>
      <LoginProvider>
        <RouterProvider router={router} />
      </LoginProvider>
      <IconButton
        aria-label="toggle theme"
        rounded="full"
        size="sm"
        position="absolute"
        bottom={4}
        right={4}
        onClick={toggleColorMode}
        icon={colorMode === "dark" ? <FaSun /> : <FaMoon />}
      />
    </>
  );
}

export default App;
