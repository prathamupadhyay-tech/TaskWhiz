import React from "react";
import "../css/Board.css";
import CardForm from "./cardForm";
import axios from "axios";
import { useState, useEffect } from "react";
import UpdateList from "./UpdateList";
import Navbar from "./Navbar";
import SignIn from "./SignIn";
import { useRef } from "react";
import SignUp from "./SignUp";
import Home from "./Home";
import { AnimatePresence, motion } from "framer-motion";

import { useSelector } from "react-redux";
const Board = ({ currentBoard }) => {
  const [openOptions, setopenOptions] = useState(false);
  const [addCard, setaddCard] = useState(false);
  const [cardData, setcardData] = useState([]);
  const [noofcards, setnoofcards] = useState(0);
  const [addList, setaddList] = useState(true);
  const [nooflist, setnooflist] = useState(1);
  const [listValue, setlistValue] = useState();
  const [currentCard, setcurrentCard] = useState();
  const [updatelist, setupdatelist] = useState(false);
  const [currentDes, setcurrentDes] = useState();
  const optionsRef = useRef(null);
  console.log(currentBoard);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  useEffect(() => {
    let boardId = currentBoard._id;
    axios
      .get(`http://localhost:5000/api/allCards/${boardId}`)
      .then((res) => {
        console.log(res.data.message.boardCards);
        setcardData(res.data.message.boardCards);
        // setcardData(res.data.message.userCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [noofcards, currentBoard]);

  const handleDelete = (e, id) => {
    axios
      .delete(`http://localhost:5000/api/deletecard/${id}`)
      .then((res) => {
        console.log(res);
        setnoofcards(noofcards + 1);

        console.log(cardData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSubmit = (e, id) => {
    e.preventDefault();
    if (Object.keys(listValue).length === 0) {
      return;
    } else {
      axios
        .post(`http://localhost:5000/api/addList/${id}`, {
          description: listValue,
        })
        .then((res) => {
          console.log(res.data);
          setnoofcards(noofcards + 1);
        })
        .catch((err) => {
          console.log(err);
        });
      setaddList(false);
      setlistValue("");
    }
  };
  const handleList = (e, id) => {
    setcurrentCard(id);
  };

  const handleListDelete = (e, id) => {};
  return (
    <>
      <>
        {addCard ? (
          <CardForm
            currentBoard={currentBoard}
            noofcard={noofcards}
            setnoofcards={setnoofcards}
            addCard={addCard}
            setaddCard={setaddCard}
          ></CardForm>
        ) : (
          <></>
        )}

        {updatelist ? (
          <UpdateList
            noofcards={noofcards}
            setnoofcards={setnoofcards}
            currentCard={currentCard}
            updatelist={updatelist}
            currentDes={currentDes}
            setupdatelist={setupdatelist}
          ></UpdateList>
        ) : (
          <></>
        )}
        <div
          style={{ backgroundColor: currentBoard.boardColor }}
          className="container"
        >
          <div className="wrapper">
            <AnimatePresence>
              {cardData.map((data, index) => {
                console.log(data);
                return (
                  <motion.div key={data._id} className="to_do_card">
                    <div className="card-heading-div">
                      <div className="card-icon"></div>

                      <h1
                        style={{ color: currentBoard.boardColor }}
                        className="to_do_title"
                      >
                        {data.title}
                      </h1>
                    </div>

                    {data.description.map((des) => {
                      return (
                        <div className="to_do_description_div">
                          <div className="to-do-list-div">
                            <div className="to-do-list-icon"></div>
                            <p className="to_do_description">{des}</p>
                          </div>

                          <div
                            onClick={() => {
                              setcurrentDes(des);
                              setopenOptions((prevOptions) => {
                                if (prevOptions && currentDes === des) {
                                  return false; // Close the clicked icon's options tab
                                } else {
                                  return true; // Open the clicked icon's options tab
                                }
                              });
                            }}
                            className="list-icon"
                          ></div>
                          {openOptions && currentDes == des ? (
                            <div ref={optionsRef} className="list-options-div">
                              <div
                                onClick={(e) => {
                                  e.preventDefault();
                                  setopenOptions(false);
                                  console.log(des);
                                  axios
                                    .post(
                                      `http://localhost:5000/api/deleteList/${data._id}`,
                                      {
                                        valueToUpdate: des,
                                      }
                                    )
                                    .then((res) => {
                                      console.log(res.data);
                                      setnoofcards(noofcards + 1);
                                    })
                                    .catch((err) => {
                                      console.log(err);
                                    });
                                }}
                              >
                                Delete List
                              </div>
                              <div
                                onClick={(e) => {
                                  setopenOptions(false);
                                  setupdatelist(!updatelist);
                                  setcurrentDes(des);
                                  handleList(e, data._id);
                                }}
                              >
                                Update List
                              </div>
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                      );
                    })}

                    <div className="update_btns">
                      <div
                        onClick={(e) => {
                          handleDelete(e, data._id);
                        }}
                        className="delete"
                      >
                        <div className="delete_cross1"></div>
                        <div className="delete_cross2"></div>
                      </div>
                    </div>
                    {currentCard == data._id && addList ? (
                      <form
                        onSubmit={(e) => {
                          handleSubmit(e, data._id);
                        }}
                        key={data._id}
                        method="post"
                        className="list_add_form"
                      >
                        <input
                          placeholder="Add a Task"
                          value={listValue}
                          onChange={(e) => {
                            setlistValue(e.target.value);
                          }}
                          type="text"
                        />
                        <div className="task_update_btn_div">
                          <button>Submit</button>
                          <button
                            onClick={(e) => {
                              handleList(e, data._id);
                              setaddList(false);
                            }}
                          >
                            Close
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div
                        onClick={(e) => {
                          handleList(e, data._id);
                          setaddList(true);
                        }}
                        className="add_subcard_btn"
                      >
                        + Add a List
                      </div>
                    )}
                  </motion.div>
                );
              })}
              <div className="add_card_btn_div">
                <button
                  onClick={() => {
                    setaddCard(!addCard);
                  }}
                  className="add_card_btn"
                >
                  +
                </button>
                <p>ADD A TODO</p>
              </div>
            </AnimatePresence>
          </div>
        </div>
      </>
    </>
  );
};

export default Board;
