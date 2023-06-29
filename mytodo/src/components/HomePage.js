import React from "react";
import "../css/Navbar.css";
import { Link } from "react-router-dom";
import "../css/HomePage.css";
import { useState } from "react";
import video1 from "../utils/videos/Web1.mp4";
import video2 from "../utils/videos/web2.mp4";
import Navbar from "./Navbar";
import BoardForm from "./BoardForm";
import ContributerForm from "./contributerForm";
import Profile from "./Profile";
const HomePage = () => {
  const [isAddBoard, setisAddBoard] = useState(false);

  const createBoard = (e) => {
    e.preventDefault();
  };
  return (
    <>
      {isAddBoard ? (
        <BoardForm setisAddBoard={setisAddBoard}></BoardForm>
      ) : (
        <></>
      )}

      <div className="homePage_back"></div>
      <div className="homePage-main-container">
        <div className="homePage-wrapper">
          <div className="board-feature-container">
            <video
              src={video1}
              className="board-img"
              autoPlay
              loop
              muted
            ></video>

            <div className="feature-details">
              <p>
                Introducing Boards: Organize your tasks effortlessly by creating
                separate boards for work, personal projects, and more. Stay
                focused and productive with our new board feature!
              </p>
              <button
                onClick={() => {
                  setisAddBoard(true);
                }}
                className="Add-Board-btn"
              >
                Add Board
              </button>
            </div>
          </div>
          <div className="board-feature-container">
            <video
              src={video2}
              className="board-img"
              autoPlay
              loop
              muted
            ></video>
            <div className="feature-details">
              <p>
                Contribute with others and find other fellow developers for your
                projects and work together using TaskWhiz.
              </p>
              <Link to={"/contributers"}>
                {" "}
                <button className="Add-Board-btn">Find a Geek</button>
              </Link>
            </div>
          </div>
          <div className="board-feature-container">
            <div className="board-img"></div>
            <div className="feature-details">
              <p>Integration with chatgpt 4!!</p>
              <button className="Add-Board-btn">Add Board</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
