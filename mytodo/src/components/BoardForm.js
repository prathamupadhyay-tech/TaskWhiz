import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BoardForm = ({ setisAddBoard }) => {
  let navigate = useNavigate();
  const [board, setboard] = useState({
    title: "",
    description: "",
    boardColor: "",
    ourUser: "",
  });
 
  const addBoard = async (e) => {
    const currboard = {
      title: board.title,
      description: board.description,
      boardColor: board.boardColor,
      ourUser: localStorage.getItem("userId"),
    };
    e.preventDefault();
    let res;
    try {
      res = await axios.post(`http://localhost:5000/api/addBoard`, currboard);

      if (res) {
        console.log(res);
      }
    } catch (err) {
      setboard({
        title: "",
        description: "",
        boardColor: "",
        ourUser: "",
      });
      return console.log(err);
    }
    const data = await res.data;
    navigate("/boards");
    return data;
  };
  const handleInputs = (e) => {
    setboard((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <div className="form_container">
        <div className="form_wrapper">
          <div
            onClick={() => {
              setisAddBoard(false);
            }}
            className="cross_btn_div"
          >
            <div className="cross1"></div>
            <div className="cross2"></div>
          </div>
          <form
            className="main_card_form"
            action=""
            onSubmit={(e) => {
              addBoard(e);
            }}
          >
            <div className="form_heading">Add a board</div>
            <div>
              <input
                placeholder="Title"
                name="title"
                value={board.title}
                onChange={handleInputs}
              />
            </div>
            <div>
              {" "}
              <input
                placeholder="Description"
                name="description"
                value={board.description}
                onChange={handleInputs}
              />
            </div>
            <div className="board-color-div">
              <label className="board-color-label">Board Color</label>
              <input
                name="boardColor"
                className="board-color-input"
                type="color"
                defaultValue="#2c96e8"
                value={board.boardColor}
                onChange={handleInputs}
              />
            </div>

            {/* <button className="collaborate-btn">Add geeks</button> */}
            <button type="submit" className="form_submit_btn">
              Create Board
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default BoardForm;
