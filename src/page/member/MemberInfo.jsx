import { Box, FormControl, Input, Spinner, useToast } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export function MemberInfo() {
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/member/${id}`)
      .then((res) => {
        setMember(res.data);
      })
      .catch((err) => {
        toast({
          status: "error",
          description: "존재하지 않는 회원입니다.",
          position: "bottom-right",
        });
        navigate("/member/list");
      })
      .finally();
  }, []);

  if (member === null) {
    return <Spinner />;
  }

  return (
    <Box>
      <Box>{member.id}번 회원 정보</Box>
      <Box>
        <Box>
          <FormControl>이메일</FormControl>
          <Input value={member.email} readOnly />
        </Box>
        <Box>
          <FormControl>별명</FormControl>
          <Input value={member.nickName} readOnly />
        </Box>
        <Box>
          <FormControl>가입일시</FormControl>
          <Input value={member.signupDateAndTime} readOnly />
        </Box>
      </Box>
    </Box>
  );
}
