import React, { createContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const LoginContext = createContext(null);

export function LoginProvider({ children }) {
  const [email, setEmail] = useState("");
  const [nickName, setNickName] = useState("");
  const [expired, setExpired] = useState(0);

  // email
  // nickName
  // isLoggedIn
  function isLoggedIn() {
    return Date.now() < expired * 1000;
  }
  // hasEmail
  function hasEmail(param) {
    return email === param;
  }

  // login

  function login(token) {
    localStorage.setItem("token", token);
    const payload = jwtDecode(token);
    setExpired(payload.exp);
    setEmail(payload.sub);
    setNickName(payload.nickName);
  }
  // logout
  function logout() {
    localStorage.removeItem("token");
    setExpired(0);
    setEmail("");
    setNickName("");
  }

  return (
    <LoginContext.Provider
      value={{
        email,
        nickName,
        login,
        logout,
        isLoggedIn,
        hasEmail,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}
