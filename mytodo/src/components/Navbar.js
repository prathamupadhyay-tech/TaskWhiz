import React from "react";
import "../css/Navbar.css";
import CardForm from "./cardForm";
import axios from "axios";
import { useState, useEffect } from "react";
import UpdateList from "./UpdateList";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Navbar = ({ isProfile, setisProfile }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOut = (e) => {
    e.preventDefault();
    dispatch(authActions.logout());
    navigate("/");
  };
  return (
    <>
      <div className="navbar_container">
        <div className="navbar_section">
          <div className="nav_elements">
            <h1>TaskWhiz</h1>
          </div>
          <div className="nav_elements">
            <Link to={"/home"}>DashBoard</Link>
          </div>

          <div className="nav_elements">
            <Link to={"/contributers"}>Find Contributors</Link>
          </div>
        </div>

        <div className="profile_section">
          <button
            // onClick={(e) => {
            //   logOut(e);
            // }}
            onClick={() => {
              setisProfile(true);
            }}
            className="profile-btn"
          >
            <div className="profile-pic"></div>
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
