import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { CommentItem } from "./CommentItem.jsx";

export function CommentList({ boardId, isSending, isRemoved, setIsRemoved }) {
  const [commentList, setCommentList] = useState([]);

  useEffect(() => {
    if (!isSending) {
      axios
        .get(`/api/comment/list/${boardId}`)
        .then((res) => {
          setCommentList(res.data);
        })
        .catch(() => {})
        .finally(() => {});
    }
  }, [isSending, isRemoved]);
  if (commentList.length === 0) {
    return <Box>댓글이 없습니다. 첫 댓글을 작성해보세요.</Box>;
  }
  return (
    <Box>
      <Heading sx={{ padding: "10px", fontSize: "1.5rem" }}>
        <Flex>
          <Box mr={2}>댓글</Box>
          {commentList.length > 0 && <Box>{commentList.length}개</Box>}
        </Flex>
      </Heading>
      {commentList.map((comment) => (
        <CommentItem
          comment={comment}
          key={comment.id}
          isRemoved={isRemoved}
          setIsRemoved={setIsRemoved}
        />
      ))}
    </Box>
  );
}
