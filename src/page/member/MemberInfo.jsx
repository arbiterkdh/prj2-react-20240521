import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { LoginContext } from "../../component/LoginProvider.jsx";
import CustomCenter from "../../theme/component/CustomCenter.jsx";

export function MemberInfo() {
  const account = useContext(LoginContext);

  const [member, setMember] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const { id } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/member/${id}`)
      .then((res) => {
        setMember(res.data);
      })
      .catch((err) => {
        if (err.response.status === 403) {
          toast({
            status: "warning",
            description: "본인의 정보에만 접근할 수 있습니다.",
            position: "bottom-right",
          });
          navigate(-1);
        }

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
      .delete(`/api/member/${id}`, {
        data: { id, password },
      })
      .then(() => {
        toast({
          status: "success",
          description: "안전하게 탈퇴되었습니다.",
          position: "bottom-right",
        });
        account.logout();
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
        setPassword("");
        onClose();
      });
  }

  if (member === null) {
    return <Spinner />;
  }

  return (
    <CustomCenter>
      <Box>
        <Box sx={{ padding: "10px", fontSize: "1.5rem" }}>
          {member.id}번 회원 정보
        </Box>
        <Box>
          <Box>
            <FormControl>이메일</FormControl>
            <Input value={member.email} readOnly variant={"noBorder"} />
          </Box>
          <Box>
            <FormControl>별명</FormControl>
            <Input value={member.nickName} readOnly variant={"noBorder"} />
          </Box>
          <Box>
            <FormControl>가입일시</FormControl>
            <Input
              value={member.signupDateAndTime}
              readOnly
              variant={"noBorder"}
            />
          </Box>
          {account.hasAccess(member.id) && (
            <Box>
              <Button
                onClick={() => navigate(`/member/edit/${member.id}`)}
                colorScheme={"purple"}
                mr={1}
              >
                수정
              </Button>
              <Button colorScheme={"red"} onClick={onOpen}>
                탈퇴
              </Button>
            </Box>
          )}

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader color={"gray.500"}>탈퇴 확인</ModalHeader>
              <ModalBody>
                <FormControl>
                  <FormLabel>암호</FormLabel>
                  <Input
                    value={password}
                    type={"password"}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button onClick={onClose}>취소</Button>
                <Button
                  isLoading={isLoading}
                  onClick={handleClickRemove}
                  colorScheme={"blue"}
                >
                  확인
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      </Box>
    </CustomCenter>
  );
}
