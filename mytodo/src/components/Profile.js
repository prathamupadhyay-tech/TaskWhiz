import React from "react";
import "../css/profile.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import BoardForm from "./BoardForm";
import ContributerForm from "./contributerForm";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";
const Profile = ({ setisProfile }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const logOut = (e) => {
    e.preventDefault();
    dispatch(authActions.logout());
    navigate("/");
  };
  return (
    <>
      <div className="profile-container">
        <div onClick={() => setisProfile(false)} className="proflie-cross-btn">
          <div className="profile-cross1"></div>
          <div className="profile-cross2"></div>
        </div>
        <div className="profile-back"></div>
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="profile-options-div"
        >
          <div className="short-profile">
            <div className="avatar"></div>

            <div className="profile-name">
              <h4>{user.firstName + " " + user.lastName}</h4>
              <p>{user.emailId}</p>
            </div>
          </div>

          <div className="horizontal-line"></div>

          <div className="profile-options">
            <Link style={{ textDecoration: "None" }} to={"/profilePage"}>
              {" "}
              <div
                onClick={() => setisProfile(false)}
                className="profile-option-list"
              >
                Your Profile
              </div>
            </Link>

            <Link style={{ textDecoration: "None" }} to={"/boards"}>
              <div
                onClick={() => setisProfile(false)}
                className="profile-option-list"
              >
                Your Boards
              </div>
            </Link>
            <div
              onClick={() => setisProfile(false)}
              className="profile-option-list"
            >
              Your Achivements
            </div>
            <div className="profile-option-list">Followers</div>
          </div>
          <div
            onClick={() => setisProfile(false)}
            className="horizontal-line"
          ></div>

          <div
            onClick={(e) => {
              logOut(e);
              setisProfile(false);
            }}
            className="logout"
          >
            Sign Out
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Profile;
