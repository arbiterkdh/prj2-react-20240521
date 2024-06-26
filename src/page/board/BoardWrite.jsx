import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../component/LoginProvider.jsx";
import CustomCenter from "../../theme/component/CustomCenter.jsx";
import OutestBox from "../../theme/component/Box/OutestBox.jsx";

export function BoardWrite() {
  const account = useContext(LoginContext);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);

  const toast = useToast();
  const navigate = useNavigate();

  let disableSaveButton = false;
  if (title.trim().length === 0) {
    disableSaveButton = true;
  } else if (content.trim().length === 0) {
    disableSaveButton = true;
  }

  // file 목록 작성
  const fileNameList = [];
  for (let i = 0; i < files.length; i++) {
    fileNameList.push(<li key={i}>{files[i].name}</li>);
  }

  function handleSaveClick() {
    setLoading(true);
    axios
      .postForm("api/board/add", {
        title,
        content,
        files,
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
      .finally(() => setLoading(false));
  }

  return (
    <CustomCenter>
      <OutestBox>
        <Box>
          <Box sx={{ padding: "10px", fontSize: "1.5rem" }}>글 작성 화면</Box>
          <Box>
            <FormControl>
              <FormLabel>제목</FormLabel>
              <Input onChange={(e) => setTitle(e.target.value.trim())} />
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
              <FormLabel>파일</FormLabel>
              <Input
                multiple
                type={"file"}
                accept={"image/*"}
                onChange={(e) => {
                  setFiles(e.target.files);
                }}
              />
              <FormHelperText>
                총 용량은 10MB, 파일 하나당 1MB 를 초과할 수 없습니다.
              </FormHelperText>
            </FormControl>
          </Box>
          <Box>
            <ul>{fileNameList}</ul>
          </Box>
          <Box>
            <FormControl>
              <FormLabel>작성자</FormLabel>
              <Input readOnly value={account.nickName} />
            </FormControl>
          </Box>
          <Box>
            <Button
              isLoading={loading}
              isDisabled={disableSaveButton}
              colorScheme={"blue"}
              onClick={handleSaveClick}
            >
              저장
            </Button>
          </Box>
        </Box>
      </OutestBox>
    </CustomCenter>
  );
}
