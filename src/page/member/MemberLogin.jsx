import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../component/LoginProvider.jsx";

export function MemberLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toast = useToast();
  const navigate = useNavigate();

  const account = useContext(LoginContext);

  function handleLogin() {
    axios
      .post("/api/member/token", { email, password })
      .then((res) => {
        account.login(res.data.token);
        toast({
          status: "success",
          description: "로그인 되었습니다.",
          position: "bottom-right",
        });
        navigate("/");
      })
      .catch(() => {
        account.logout();
        toast({
          status: "warning",
          description: "이메일 혹은 패스워드가 일치하지 않습니다.",
          position: "bottom-right",
        });
      });
  }

  return (
    <Box>
      <Box sx={{ padding: "10px", fontSize: "1.5rem" }}>로그인</Box>
      <Box>
        <FormControl>
          <FormLabel>이메일</FormLabel>
          <Input onChange={(e) => setEmail(e.target.value)} />
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>암호</FormLabel>
          <Input
            type={"password"}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
      </Box>
      <Box>
        <Button onClick={handleLogin}>로그인</Button>
      </Box>
    </Box>
  );
}
