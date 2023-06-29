import axios from "axios";
import React, { useEffect, useState } from "react";
import "../css/boardpage.css";
import Board from "./Board";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
const BoardsPage = ({}) => {
  const navigate = useNavigate();
  const [boards, setBoards] = useState([]);
  const [noofBoards, setnoOfBoards] = useState(0);
  const [currentBoard, setCurrentBoard] = useState([]);
  const [dynamicBackColor, setDynamicBackColor] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await axios.get(
          `http://localhost:5000/api/getBoards/${userId}`
        );
        const boardsData = response.data.message;
        setBoards(boardsData);
        if (boardsData.length > 0) {
          setCurrentBoard(boardsData[0]);
        }
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchBoards();
  }, []);

  const handleBoardClick = (board) => {
    setCurrentBoard(board);
  };

  useEffect(() => {
    if (currentBoard) {
      setDynamicBackColor(currentBoard.boardColor);
    }
  }, [currentBoard]);
  return (
    <>
      <div className="boardpage-main-conatainer">
        <div className="boardpage-wrapper">
          <div className="boards-container">
            <div className="board-page-heading">
              {JSON.parse(localStorage.getItem("user")).firstName}'s Boards
            </div>
            {/* <button
              onClick={() => {
                navigate("/home");
              }}
              className="boardpage-back-btn"
            >
              Back
            </button> */}
            <motion.div layout className="boards-list">
              {boards.map((data, index) => {
                return (
                  <motion.div
                    layout
                    key={data._id}
                    className={
                      currentBoard._id === data._id ? "boardSelected" : ""
                    }
                    onClick={() => {
                      setDynamicBackColor(data.boardColor);
                      // setnoOfBoards(noofBoards + 1);
                      handleBoardClick(data);
                    }}
                  >
                    <div className="board-icon"></div>
                    {data.title}
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          <div className="board">
            <div className="board-nav-features"></div>
            <div className="board-main">
              {currentBoard ? (
                <Board currentBoard={currentBoard} />
              ) : isLoading ? (
                <div className="loading-screen">Loading...</div>
              ) : (
                <p>No board selected</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default BoardsPage;
