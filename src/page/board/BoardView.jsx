import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Spinner,
  Textarea,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { LoginContext } from "../../component/LoginProvider.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp as fullyThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp as emptyThumbsUp } from "@fortawesome/free-regular-svg-icons/faThumbsUp";
import { CommentComponent } from "../../component/CommentComponent.jsx";
import CustomCenter from "../../theme/component/CustomCenter.jsx";
import OutestBox from "../../theme/component/Box/OutestBox.jsx";

export function BoardView() {
  const account = useContext(LoginContext);

  const { id } = useParams();
  const [board, setBoard] = useState(null);
  const [like, setLike] = useState({
    like: false,
    count: 0,
  });
  const [isLikeProcessing, setIsLikeProcessing] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    axios
      .get(`/api/board/${id}`)
      .then((res) => {
        setBoard(res.data.board);
        setLike(res.data.like);
      })
      .catch((err) => {
        if (err.response.status === 404) {
          toast({
            status: "info",
            description: "해당 게시물이 존재하지 않습니다.",
            position: "bottom-right",
          });
          navigate("/");
        }
      });
  }, []);

  function handleClickRemove() {
    axios
      .delete(`/api/board/${id}`)
      .then(() => {
        toast({
          status: "success",
          description: `${id}번 게시물이 삭제되었습니다.`,
          position: "bottom-right",
        });
        navigate("/");
      })
      .catch(() => {
        toast({
          status: "error",
          description: `${id}번 게시물 삭제 중 오류가 발생하였습니다.`,
          position: "bottom-right",
        });
      })
      .finally(() => {
        onClose();
      });
  }

  if (board === null) {
    return <Spinner />;
  }

  function handleClickLike() {
    if (!account.isLoggedIn()) {
      return;
    }
    setIsLikeProcessing(true);
    axios
      .put(`/api/board/like`, { boardId: board.id })
      .then((res) => {
        setLike(res.data);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          toast({
            status: "warning",
            description: "로그인이 필요한 서비스입니다.",
            position: "bottom-right",
          });
        }
      })
      .finally(() => {
        setIsLikeProcessing(false);
      });
  }

  return (
    <CustomCenter>
      <Box>
        <OutestBox>
          <Box>
            <Flex>
              <Heading sx={{ padding: "10px", fontSize: "1.5rem" }}>
                <Box>{board.id}번 게시물</Box>
              </Heading>
              <Spacer />
              {isLikeProcessing || (
                <Flex>
                  <Tooltip
                    isDisabled={account.isLoggedIn()}
                    label={"로그인 해주세요."}
                    hasArrow
                  >
                    <Box
                      onClick={handleClickLike}
                      color={"blue.400"}
                      fontSize={"3xl"}
                      cursor={"pointer"}
                    >
                      {like.like && <FontAwesomeIcon icon={fullyThumbsUp} />}
                      {like.like || <FontAwesomeIcon icon={emptyThumbsUp} />}
                    </Box>
                  </Tooltip>
                  <Box fontSize={"3xl"}>{like.count}</Box>
                </Flex>
              )}
              {isLikeProcessing && (
                <Box pr={5}>
                  <Spinner />
                </Box>
              )}
            </Flex>
            <Box>
              <FormControl>
                <FormLabel>제목</FormLabel>
                <Input value={board.title} variant={"noBorder"} readOnly />
              </FormControl>
            </Box>
            <Box>
              <FormControl>
                <FormLabel>본문</FormLabel>
                <Textarea value={board.content} variant={"noBorder"} readOnly />
              </FormControl>
            </Box>
            <Box>
              {board.fileList &&
                board.fileList.map((file) => (
                  <Box key={file.name}>
                    <Image src={file.src} />
                  </Box>
                ))}
            </Box>
            <Box>
              <FormControl>
                <FormLabel>작성자</FormLabel>
                <Input value={board.writer} variant={"noBorder"} readOnly />
              </FormControl>
            </Box>
            <Box>
              <FormControl>
                <FormLabel>작성일시</FormLabel>
              </FormControl>
              <Input
                type={"datetime-local"}
                value={board.inserted}
                variant={"noBorder"}
                readOnly
              />
            </Box>
            <Box>
              <FormControl>
                <FormLabel>조회수</FormLabel>
              </FormControl>
              <Input value={board.views} readOnly variant={"noBorder"} />
            </Box>
            <Flex justifyContent="space-between">
              <Box>
                <Flex>
                  <Button>이전 글</Button>
                  <Button>목록</Button>
                  <Button>다음 글</Button>
                </Flex>
              </Box>
              {account.hasAccess(board.memberId) && (
                <Box>
                  <Button
                    colorScheme={"purple"}
                    onClick={() => navigate(`/edit/${board.id}`)}
                    mr={1}
                  >
                    수정
                  </Button>
                  <Button colorScheme={"red"} onClick={onOpen}>
                    삭제
                  </Button>
                </Box>
              )}
            </Flex>
          </Box>
        </OutestBox>
        <CommentComponent boardId={board.id} />

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader></ModalHeader>
            <ModalBody>삭제하시겠습니까?</ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>취소</Button>
              <Button colorScheme={"red"} onClick={handleClickRemove}>
                확인
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </CustomCenter>
  );
}
