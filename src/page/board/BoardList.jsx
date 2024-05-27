import {
  Box,
  Button,
  Center,
  Flex,
  Input,
  Select,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBackwardFast,
  faForwardFast,
  faMagnifyingGlass,
  faPlay,
  faUserPen,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

export function BoardList() {
  const [boardList, setBoardList] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [searchType, setSearchType] = useState("all");
  const [searchKeyword, setSearchKeyword] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    axios.get(`/api/board/list?${searchParams}`).then((res) => {
      setBoardList(res.data.boardList);
      setPageInfo(res.data.pageInfo);
    });
  }, [searchParams]);

  const pageNumbers = [];
  for (let i = pageInfo.leftPageNumber; i <= pageInfo.rightPageNumber; i++) {
    pageNumbers.push(i);
  }

  function handleSearchClick() {
    navigate(`/?type=${searchType}&keyword=${searchKeyword}`);
  }

  return (
    <Box>
      <Box sx={{ padding: "10px", fontSize: "1.5rem" }}>게시물 목록</Box>
      <Box>
        <Table>
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>TITLE</Th>
              <Th>
                <FontAwesomeIcon icon={faUserPen} />
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {boardList.map((board) => (
              <Tr onClick={() => navigate(`/board/${board.id}`)} key={board.id}>
                <Td>{board.id}</Td>
                <Td>{board.title}</Td>
                <Td>{board.writer}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      <Box>
        <Flex alignItems={"center"}>
          <Box>
            <Select onChange={(e) => setSearchType(e.target.value)}>
              <option value={"all"}>전체</option>
              <option value={"text"}>글</option>
              <option value={"nick"}>작성자</option>
            </Select>
          </Box>
          <Box>
            <Input
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder={"검색어"}
            />
          </Box>
          <Box>
            <Button onClick={handleSearchClick}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </Button>
          </Box>
        </Flex>
      </Box>
      <Center
        sx={{
          marginTop: "20px",
          bgColor: "orange.300",
          height: "80px",
        }}
      >
        {pageInfo.currentPageNumber > 1 && (
          <Button
            onClick={() => navigate(`/?page=1`)}
            sx={{ bgColor: "orange.300" }}
          >
            <FontAwesomeIcon icon={faBackwardFast} />
          </Button>
        )}
        {pageInfo.currentPageNumber > 10 && (
          <Button
            onClick={() => navigate(`/?page=${pageInfo.prevPageNumber}`)}
            sx={{ bgColor: "orange.300" }}
          >
            <FontAwesomeIcon icon={faPlay} rotation={180} />
          </Button>
        )}
        {pageNumbers.map((pagenumber) => (
          <Button
            onClick={() => {
              navigate(`/?page=${pagenumber}`);
            }}
            key={pagenumber}
            sx={{
              bgColor:
                pagenumber === pageInfo.currentPageNumber ? "" : "orange.300",
              fontSize: "1.3rem",
              color:
                pagenumber === pageInfo.currentPageNumber
                  ? "white"
                  : "orange.100",
            }}
          >
            {pagenumber}
          </Button>
        ))}
        {pageInfo.rightPageNumber !== pageInfo.lastPageNumber && (
          <Button
            onClick={() => navigate(`/?page=${pageInfo.nextPageNumber}`)}
            sx={{ bgColor: "orange.300" }}
          >
            <FontAwesomeIcon icon={faPlay} />
          </Button>
        )}
        {pageInfo.currentPageNumber < pageInfo.lastPageNumber && (
          <Button
            onClick={() => navigate(`/?page=${pageInfo.lastPageNumber}`)}
            sx={{ bgColor: "orange.300" }}
          >
            <FontAwesomeIcon icon={faForwardFast} />
          </Button>
        )}
      </Center>
    </Box>
  );
}
