import { Box, Button, Textarea, useToast } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane as solidPlane } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane as emptyPlane } from "@fortawesome/free-regular-svg-icons";

export function CommentWrite({ boardId, isSending, setIsSending }) {
  const [comment, setComment] = useState("");
  const [mouse, setMouse] = useState(0);
  const toast = useToast();

  function handleCommentSubmitClick() {
    setIsSending(true);
    axios
      .post("/api/comment/add", {
        boardId,
        comment,
      })
      .then((res) => {
        setComment("");
        toast({
          status: "success",
          description: "댓글이 등록되었습니다.",
          position: "bottom-right",
        });
      })
      .catch(() => {})
      .finally(() => {
        setIsSending(false);
      });
  }

  return (
    <Box>
      <Textarea
        placeholder={"댓글을 작성해 보세요."}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Button
        isDisabled={comment.trim().length === 0}
        isLoading={isSending}
        onClick={handleCommentSubmitClick}
        onMouseEnter={() => setMouse(1)}
        onMouseLeave={() => setMouse(0)}
      >
        {mouse === 1 && <FontAwesomeIcon icon={solidPlane} size={"xl"} />}
        {mouse === 0 && <FontAwesomeIcon icon={emptyPlane} size={"xl"} />}
      </Button>
    </Box>
  );
}
