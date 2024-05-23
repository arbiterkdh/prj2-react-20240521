import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export function MemberEdit() {
  const [member, setMember] = useState(null);
  const { id } = useParams();
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    axios
      .get(`/api/member/${id}`)
      .then((res) => {
        const member1 = res.data;
        setMember({ ...member1, password: "" });
      })
      .catch(() => {
        toast({
          status: "warning",
          description: "회원 정보 조회 중 문제가 발생하였습니다.",
          position: "bottom-right",
        });
        navigate("/");
      })
      .finally();
  }, []);

  function handleClickSave() {
    axios
      .put(`/api/member/modify`, member)
      .then((res) => {})
      .catch(() => {})
      .finally();
  }

  if (member === null) {
    return <Spinner />;
  }

  return (
    <Box>
      <Box>회원 정보 수정</Box>
      <Box>
        <Box>
          <FormControl>
            <FormLabel>이메일</FormLabel>
            <Input readOnly value={member.email} />
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>암호</FormLabel>
            <Input
              onChange={(e) => {
                setMember({ ...member, password: e.target.value });
              }}
              type={"password"}
              placeholder={"암호를 변경하려면 입력하세요."}
            />
            <FormHelperText>미입력시 기존 암호를 유지합니다.</FormHelperText>
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>암호 확인</FormLabel>
            <Input type={"password"} />
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>별명</FormLabel>
            <Input
              onChange={(e) =>
                setMember({ ...member, nickName: e.target.value })
              }
              value={member.nickName}
            />
          </FormControl>
        </Box>
        <Box>
          <Button onClick={handleClickSave} colorScheme={"orange"}>
            저장
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
