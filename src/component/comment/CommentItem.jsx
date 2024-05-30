import { Box, Flex, Spacer } from "@chakra-ui/react";

export function CommentItem({ comment, key }) {
  return (
    <Box bgColor={"orange.100"} m={1}>
      <Flex>
        <Box>
          <Box>{comment.nickName}</Box>
          <Spacer />
          <Box>{comment.inserted}</Box>
        </Box>
      </Flex>
      <Box>{comment.comment}</Box>
    </Box>
  );
}
