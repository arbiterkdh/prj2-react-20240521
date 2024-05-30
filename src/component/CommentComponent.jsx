import { Box } from "@chakra-ui/react";
import { CommentWrite } from "./comment/CommentWrite.jsx";
import { CommentList } from "./comment/CommentList.jsx";

export function CommentComponent({ boardId }) {
  return (
    <Box>
      <CommentWrite boardId={boardId} />
      <CommentList boardId={boardId} />
    </Box>
  );
}
