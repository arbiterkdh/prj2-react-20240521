import {
  Box,
  Button,
  FormControl,
  Input,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export function MemberInfo() {
  const [member, setMember] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/member/${id}`)
      .then((res) => {
        setMember(res.data);
      })
      .catch((err) => {
        if (err.response.status === 404) {
          toast({
            status: "error",
            description: "존재하지 않는 회원입니다.",
            position: "bottom-right",
          });
          navigate("/member/list");
        }
      })
      .finally();
  }, []);

  function handleClickRemove() {
    setIsLoading(true);

    axios
      .delete(`/api/member/${id}`)
      .then(() => {
        toast({
          status: "success",
          description: "안전하게 탈퇴되었습니다.",
          position: "bottom-right",
        });
        navigate("/");
      })
      .catch(() => {
        toast({
          status: "warning",
          description: "회원 탈퇴 중 문제가 발생하였습니다.",
          position: "bottom-right",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

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
        <Box>
          <Button colorScheme={"purple"} mr={1}>
            수정
          </Button>
          <Button
            isLoading={isLoading}
            colorScheme={"red"}
            onClick={handleClickRemove}
          >
            탈퇴
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
