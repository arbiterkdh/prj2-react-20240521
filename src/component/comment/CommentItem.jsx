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
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {
  faPenToSquare as emptyPen,
  faTrashCan as emptyCan,
} from "@fortawesome/free-regular-svg-icons";
import {
  faPenToSquare as solidPen,
  faTrashCan as solidCan,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useContext, useState } from "react";
import { LoginContext } from "../LoginProvider.jsx";
import CustomBox from "../../theme/component/Box/CustomBox.jsx";

export function CommentItem({
  comment,
  isRemoving,
  setIsRemoving,
  isModifying,
  setIsModifying,
}) {
  const [mouse, setMouse] = useState(0);
  const [modify, setModify] = useState(false);
  const [deleteComment, setDeleteComment] = useState(false);
  const [commentText, setCommentText] = useState(comment.comment);
  const [mouse2, setMouse2] = useState(0);

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const account = useContext(LoginContext);

  function handleRemoveClick() {
    setIsRemoving(true);
    setDeleteComment(false);
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
      .catch((err) => {
        toast({
          status: "error",
          description: "삭제 요청중 문제가 발생했습니다.",
          position: "bottom-right",
        });
      })
      .finally(() => {
        setIsRemoving(false);
        onClose();
      });
  }

  function handleModifyClick() {
    setModify(false);
    setIsModifying(true);
    axios
      .put(`/api/comment/modify`, {
        ...comment,
        comment: commentText,
      })
      .then((res) => {
        toast({
          status: "success",
          description: "댓글이 수정되었습니다.",
          position: "bottom-right",
        });
      })
      .catch(() => {
        toast({
          status: "warning",
          description: "수정 요청중 문제가 발생했습니다.",
          position: "bottom-right",
        });
      })
      .finally(() => {
        onClose();
        setIsModifying(false);
      });
  }

  return (
    <CustomBox>
      <Box>
        <Flex>
          <Box>{comment.nickName} 님</Box>
          <Spacer />
          <Box>작성일시: {comment.inserted}</Box>
        </Flex>
        <Flex>
          {modify && (
            <Textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
          )}
          {modify || <Box>{comment.comment}</Box>}
          <Spacer />
          <Box>
            {account.hasAccess(comment.memberId) && (
              <Box>
                <Button
                  onClick={
                    modify
                      ? onOpen
                      : () => {
                          setModify(true);
                        }
                  }
                  onMouseEnter={() => setMouse2(1)}
                  onMouseLeave={() => setMouse2(0)}
                >
                  {mouse2 === 0 && <FontAwesomeIcon icon={emptyPen} />}
                  {mouse2 === 1 && <FontAwesomeIcon icon={solidPen} />}
                </Button>
                {modify || (
                  <Button
                    onClick={() => {
                      setDeleteComment(true);
                      onOpen();
                    }}
                    onMouseEnter={() => setMouse(1)}
                    onMouseLeave={() => setMouse(0)}
                  >
                    {mouse === 0 && <FontAwesomeIcon icon={emptyCan} />}
                    {mouse === 1 && <FontAwesomeIcon icon={solidCan} />}
                  </Button>
                )}
                {modify && (
                  <Button
                    onClick={() => {
                      setModify(false);
                      setCommentText(comment.comment);
                    }}
                  >
                    <FontAwesomeIcon icon={faXmark} />
                  </Button>
                )}
              </Box>
            )}
          </Box>
        </Flex>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader></ModalHeader>
            {deleteComment && <ModalBody>댓글을 지우시겠습니까?</ModalBody>}
            {modify && <ModalBody>이대로 수정하시겠습니까?</ModalBody>}
            <ModalFooter>
              <Button
                onClick={() => {
                  setDeleteComment(false);
                  onClose();
                }}
              >
                취소
              </Button>
              {deleteComment && (
                <Button onClick={handleRemoveClick}>삭제</Button>
              )}
              {modify && <Button onClick={handleModifyClick}>수정</Button>}
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </CustomBox>
  );
}
