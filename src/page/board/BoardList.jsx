import {
  Badge,
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
import {
  faComments,
  faImages,
  faThumbsUp,
} from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import OutestBox from "../../theme/component/Box/OutestBox.jsx";

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
    setSearchType("all");
    setSearchKeyword("");

    const typeParam = searchParams.get("type");
    const keywordParam = searchParams.get("keyword");
    if (typeParam) {
      setSearchType(typeParam);
    }
    if (keywordParam) {
      setSearchKeyword(keywordParam);
    }
  }, [searchParams]);

  const pageNumbers = [];
  for (let i = pageInfo.leftPageNumber; i <= pageInfo.rightPageNumber; i++) {
    pageNumbers.push(i);
  }

  function handleSearchClick() {
    navigate(`/?type=${searchType}&keyword=${searchKeyword}`);
  }

  function handlePageButtonClick(pageNumber) {
    searchParams.set("page", pageNumber);
    navigate(`/?${searchParams}`);
  }

  return (
    <OutestBox>
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
                <Th>조회수</Th>
              </Tr>
            </Thead>
            <Tbody>
              {boardList.length === 0 && (
                <Tr>
                  <Td>-</Td>
                  <Td>조회된 게시물이 없습니다.</Td>
                  <Td>-</Td>
                  <Td>-</Td>
                </Tr>
              )}
              {boardList.map((board) => (
                <Tr
                  onClick={() => navigate(`/board/${board.id}`)}
                  key={board.id}
                >
                  <Td>{board.id}</Td>
                  <Td>
                    {board.title}
                    {board.numberOfImages > 0 && (
                      <Badge mr={1}>
                        <FontAwesomeIcon icon={faImages} />+
                        {board.numberOfImages}
                      </Badge>
                    )}
                    {board.numberOfComments > 0 && (
                      <Badge mr={1}>
                        <FontAwesomeIcon icon={faComments} />
                        {board.numberOfComments}
                      </Badge>
                    )}
                    {board.numberOfLike > 0 && (
                      <Badge>
                        <FontAwesomeIcon icon={faThumbsUp} />
                        {board.numberOfLike}
                      </Badge>
                    )}
                  </Td>
                  <Td>{board.writer}</Td>
                  <Td>{board.views}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
        <Box>
          <Flex alignItems={"center"}>
            <Box mr={1}>
              <Select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
              >
                <option value={"all"}>전체</option>
                <option value={"text"}>글</option>
                <option value={"nick"}>작성자</option>
              </Select>
            </Box>
            <Box>
              <Input
                value={searchKeyword}
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
        <OutestBox>
          <Center>
            {pageInfo.currentPageNumber > 1 && (
              <Button onClick={() => handlePageButtonClick(1)}>
                <FontAwesomeIcon icon={faBackwardFast} />
              </Button>
            )}
            {pageInfo.currentPageNumber > 10 && (
              <Button
                onClick={() => handlePageButtonClick(pageInfo.prevPageNumber)}
              >
                <FontAwesomeIcon icon={faPlay} rotation={180} />
              </Button>
            )}
            {pageNumbers.map((pageNumber) => (
              <Button
                onClick={() => handlePageButtonClick(pageNumber)}
                key={pageNumber}
              >
                {pageNumber}
              </Button>
            ))}
            {pageInfo.rightPageNumber !== pageInfo.lastPageNumber && (
              <Button
                onClick={() => handlePageButtonClick(pageInfo.nextPageNumber)}
              >
                <FontAwesomeIcon icon={faPlay} />
              </Button>
            )}
            {pageInfo.currentPageNumber < pageInfo.lastPageNumber && (
              <Button
                onClick={() => handlePageButtonClick(pageInfo.lastPageNumber)}
              >
                <FontAwesomeIcon icon={faForwardFast} />
              </Button>
            )}
          </Center>
        </OutestBox>
      </Box>
    </OutestBox>
  );
}
