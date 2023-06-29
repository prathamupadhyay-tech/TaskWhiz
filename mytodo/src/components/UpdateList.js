import React from "react";
import "../css/cardForm.css";
import { useState } from "react";
import axios from "axios";

const UpdateList = ({
  noofcards,
  setnoofcards,
  currentCard,
  updatelist,
  currentDes,
  setupdatelist,
}) => {
  const [description, setdescription] = useState(currentDes);

  const handleSubmit = (e, id) => {
    e.preventDefault();
    if (Object.keys(description).length === 0) {
      return;
    } else {
      setupdatelist(!updatelist);

      axios
        .post(`http://localhost:5000/api/updateList/${id}`, {
          newDescription: description,
          valueToUpdate: currentDes,
        })
        .then((res) => {
          console.log(res.data);
          setnoofcards(noofcards + 1);
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
              setupdatelist(!updatelist);
            }}
            className="cross_btn_div"
          >
            <div className="cross1"></div>
            <div className="cross2"></div>
          </div>
          <form
            onSubmit={(e) => {
              handleSubmit(e, currentCard);
            }}
            className="main_card_form"
            action=""
            method="post"
          >
            <div className="form_heading">Update list </div>

            <div>
              <label htmlFor="">DESCRIPTION</label>
              <textarea
                value={description}
                onChange={(e) => {
                  setdescription(e.target.value);
                }}
                cols={25}
                rows={5}
                type="text"
              />
            </div>

            <button type="submit" className="form_submit_btn">
              Update
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateList;
