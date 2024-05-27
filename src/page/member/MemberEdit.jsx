import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
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
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { LoginContext } from "../../component/LoginProvider.jsx";

export function MemberEdit() {
  const account = useContext(LoginContext);

  const [member, setMember] = useState(null);
  const [oldPassword, setOldPassword] = useState("");
  const [nickName, setNickName] = useState("");
  const [oldNickName, setOldNickName] = useState("");
  const [isCheckedNickName, setIsCheckedNickName] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
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
        setOldNickName(member1.nickName);
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
      .put(`/api/member/modify`, { ...member, oldPassword })
      .then((res) => {
        toast({
          status: "success",
          description: "회원 정보가 수정되었습니다.",
          position: "bottom-right",
        });
        account.login(res.data.token);
        navigate(`/member/${member.id}`);
      })
      .catch((err) => {
        toast({
          status: "error",
          description: "회원 정보 수정 중 오류가 발생했습니다.",
          position: "bottom-right",
        });
      })
      .finally(() => {
        onClose();
      });
  }

  function handleCheckNickName() {
    axios
      .get(`/api/member/check?nickName=${nickName}`)
      .then(() => {
        toast({
          status: "warning",
          description: "현재 사용중인 별명입니다.",
          position: "bottom-right",
        });
      })
      .catch((err) => {
        if (err.response.status === 404) {
          toast({
            status: "info",
            description: "사용 가능한 별명입니다.",
            position: "bottom-right",
          });
        }
      });
  }

  let isDisabled = false;
  let isPasswordChecked = password === passwordCheck;
  let isDisabledNickNameCheckButton = false;

  if (member === null) {
    return <Spinner />;
  }

  if (member.nickName === oldNickName || member.nickName.length === 0) {
    isDisabledNickNameCheckButton = true;
  }

  if (nickName.trim().length === 0) {
    isDisabled = true;
  }

  if (!isPasswordChecked) {
    isDisabled = true;
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
                setPassword(e.target.value);
              }}
              type={"password"}
              value={password}
              placeholder={"암호를 변경하려면 입력하세요."}
            />
            {password.trim().length === 0 && (
              <FormHelperText>
                암호를 입력해주세요, 미입력시 기존 암호를 유지합니다.
              </FormHelperText>
            )}
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>암호 확인</FormLabel>
            <Input
              type={"password"}
              value={passwordCheck}
              onChange={(e) => {
                setPasswordCheck(e.target.value);
              }}
            />
            {!isPasswordChecked && (
              <FormHelperText>암호가 일치하지 않습니다.</FormHelperText>
            )}
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>별명</FormLabel>
            <InputGroup>
              <Input
                value={member.nickName}
                onChange={(e) => {
                  setNickName(e.target.value.trim());
                  const newNickName = e.target.value.trim();
                  setMember({ ...member, nickName: newNickName });
                  setIsCheckedNickName(newNickName === oldNickName);
                }}
              />
              <InputRightElement w={"75px"}>
                <Button
                  isDisabled={isDisabledNickNameCheckButton}
                  onClick={handleCheckNickName}
                  size={"sm"}
                >
                  중복확인
                </Button>
              </InputRightElement>
            </InputGroup>
            {isPasswordChecked && nickName.trim().length === 0 && (
              <FormHelperText>별명을 입력해주세요.</FormHelperText>
            )}
          </FormControl>
        </Box>
        <Box>
          <Button
            isDisabled={isDisabled}
            onClick={onOpen}
            colorScheme={"orange"}
          >
            저장
          </Button>
        </Box>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>기존 암호 확인</ModalHeader>
            <ModalBody>
              <Input
                type={"password"}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>취소</Button>
              <Button onClick={handleClickSave} colorScheme={"blue"}>
                확인
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Box>
  );
}
