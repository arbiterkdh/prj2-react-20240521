import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function BoardWrite() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [writer, setWriter] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  let disableSaveButton = false;
  if (title.trim().length === 0) {
    disableSaveButton = true;
  } else if (content.trim().length === 0) {
    disableSaveButton = true;
  } else if (writer.trim().length === 0) {
    disableSaveButton = true;
  }

  function handleSaveClick() {
    axios
      .post("api/board/add", {
        title,
        content,
        writer,
      })
      .then(() => {
        toast({
          description: "새 글이 등록되었습니다.",
          status: "success",
          position: "bottom-right",
        });
        navigate("/");
      })
      .catch((e) => {
        const code = e.response.status;

        if (code === 400) {
          toast({
            status: "error",
            description: "등록되지 않았습니다. 입력한 내용을 확인하세요.",
            position: "bottom-right",
          });
        }
      })
      .finally();
  }

  return (
    <Box>
      <Box>글 작성 화면</Box>
      <Box>
        <FormControl>
          <FormLabel>제목</FormLabel>
          <Input onChange={(e) => setTitle(e.target.value)} />
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>본문</FormLabel>
          <Textarea onChange={(e) => setContent(e.target.value)} />
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>작성자</FormLabel>
          <Input onChange={(e) => setWriter(e.target.value)} />
        </FormControl>
      </Box>
      <Box>
        <Button
          isDisabled={disableSaveButton}
          colorScheme={"blue"}
          onClick={handleSaveClick}
        >
          저장
        </Button>
      </Box>
    </Box>
  );
}
