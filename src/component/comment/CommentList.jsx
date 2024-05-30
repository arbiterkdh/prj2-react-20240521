import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Flex, Spacer } from "@chakra-ui/react";

export function CommentList({ boardId, isSending }) {
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
  }, [isSending]);
  if (commentList.length === 0) {
    return <Box>댓글이 없습니다. 첫 댓글을 작성해보세요.</Box>;
  }
  return (
    <Box>
      {commentList.map((comment) => (
        <Box key={comment.id} bgColor={"orange.100"} m={1}>
          <Flex>
            <Box>
              <Box>{comment.nickName}</Box>
              <Spacer />
              <Box>{comment.inserted}</Box>
            </Box>
          </Flex>
          <Box>{comment.comment}</Box>
        </Box>
      ))}
    </Box>
  );
}
