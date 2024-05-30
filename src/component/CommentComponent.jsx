import { Box } from "@chakra-ui/react";
import { CommentWrite } from "./comment/CommentWrite.jsx";
import { CommentList } from "./comment/CommentList.jsx";
import { useContext, useState } from "react";
import { LoginContext } from "./LoginProvider.jsx";

export function CommentComponent({ boardId }) {
  const [isSending, setIsSending] = useState(false);
  const account = useContext(LoginContext);

  return (
    <Box>
      {account.isLoggedIn() && (
        <CommentWrite
          boardId={boardId}
          isSending={isSending}
          setIsSending={setIsSending}
        />
      )}
      <CommentList boardId={boardId} isSending={isSending} />
    </Box>
  );
}
