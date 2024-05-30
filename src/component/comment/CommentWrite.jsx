import { Box, Button, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane as solidPlane } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane as emptyPlane } from "@fortawesome/free-regular-svg-icons";

export function CommentWrite({ boardId }) {
  const [comment, setComment] = useState("");
  const [mouse, setMouse] = useState(0);

  function handleCommentSubmitClick() {
    axios
      .post("/api/comment/add", {
        boardId,
        comment,
      })
      .then((res) => {})
      .catch(() => {})
      .finally(() => {});
  }

  return (
    <Box>
      <Textarea
        placeholder={"댓글을 작성해 보세요."}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Button
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
