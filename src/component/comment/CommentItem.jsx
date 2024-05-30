import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { faTrashCan as emptyCan } from "@fortawesome/free-regular-svg-icons";
import { faTrashCan as solidCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useContext, useState } from "react";
import { LoginContext } from "../LoginProvider.jsx";

export function CommentItem({ comment, isRemoved, setIsRemoved }) {
  const [mouse, setMouse] = useState(0);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const account = useContext(LoginContext);

  function handleRemoveClick() {
    setIsRemoved(true);
    axios
      .delete(`/api/comment/remove`, {
        data: { id: comment.id },
      })
      .then((res) => {
        toast({
          status: "success",
          description: "댓글이 삭제되었습니다.",
          position: "bottom-right",
        });
      })
      .catch((err) => {})
      .finally(() => {
        setIsRemoved(false);
      });
  }

  return (
    <Box bgColor={"orange.100"} m={1} h={40}>
      <Flex>
        <Box>{comment.nickName} 님</Box>
        <Spacer />
        <Box>작성일시: {comment.inserted}</Box>
      </Flex>
      <Flex>
        <Box>{comment.comment}</Box>
        <Spacer />
        <Box>
          {account.hasAccess(comment.memberId) && (
            <Button
              onClick={onOpen}
              onMouseEnter={() => setMouse(1)}
              onMouseLeave={() => setMouse(0)}
            >
              {mouse === 0 && <FontAwesomeIcon icon={emptyCan} />}
              {mouse === 1 && <FontAwesomeIcon icon={solidCan} />}
            </Button>
          )}
        </Box>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalBody>해당 댓글을 지우시겠습니까?</ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>취소</Button>
            <Button onClick={handleRemoveClick}>삭제</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
