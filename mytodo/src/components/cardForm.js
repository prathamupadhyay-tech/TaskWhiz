import React from "react";
import "../css/cardForm.css";
import { useState } from "react";
import axios from "axios";

const CardForm = ({
  currentBoard,
  noofcard,
  setnoofcards,
  addCard,
  setaddCard,
}) => {
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    let ourUser = localStorage.getItem("userId");
    if (
      Object.keys(title).length === 0 ||
      Object.keys(description).length === 0
    ) {
      return;
    } else {
      setaddCard(!addCard);
      axios
        .post(`http://localhost:5000/api/addcard/${currentBoard._id}`, {
          title: title,
          description: description,
          ourUser: ourUser,
        })
        .then((res) => {
          console.log(res.data);
          setnoofcards(noofcard + 1);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <div className="form_container">
        <div className="form_wrapper">
          <div
            onClick={() => {
              setaddCard(!addCard);
            }}
            className="cross_btn_div"
          >
            <div className="cross1"></div>
            <div className="cross2"></div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="main_card_form"
            action=""
            method="post"
          >
            <div className="form_heading">ADD A CARD</div>
            <div>
              {" "}
              <input
                value={title}
                placeholder="Title"
                onChange={(e) => {
                  settitle(e.target.value);
                }}
                type="text"
              />
            </div>
            <div>
              <textarea
                value={description}
                placeholder="Description"
                onChange={(e) => {
                  setdescription(e.target.value);
                }}
                cols={25}
                rows={5}
                type="text"
              />
            </div>

            <button type="submit" className="form_submit_btn">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CardForm;
