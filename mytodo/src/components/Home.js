import React, { useState } from "react";
import Navbar from "./Navbar";
import "../css/home.css";
import { animate, motion, useAnimation } from "framer-motion";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { store } from "../store";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
const Home = ({}) => {
  const [errors, seterrors] = useState([]);
  const [isSignIn, setisSignIn] = useState(false);
  const [isSignUp, setisSignUp] = useState(true);
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [allInputs, setallInputs] = useState({
    firstName: "",
    lastName: "",

    emailId: "",
    password: "",
  });

  const sendSignUpRequest = async (e, type) => {
    e.preventDefault();
    const user = {
      firstName: allInputs.firstName,
      lastName: allInputs.lastName,

      emailId: allInputs.emailId,
      password: allInputs.password,
    };
    let res;
    try {
      res = await axios.post(`http://localhost:5000/api/${type}`, user);

      if (res) {
        alert(res.data);
        console.log(res);
      }
    } catch (err) {
      setallInputs({
        firstName: "",
        lastName: "",

        emailId: "",
        password: "",
      });

      return console.log(err);
    }
    const data = await res.data;

    localStorage.setItem("userId", data.user._id);
    localStorage.setItem("token", data.token);
    console.log(data.user);
    dispatch(authActions.login({ user: data.user, token: data.token }));
    console.log(store.getState());
    navigate("/home");
    return data;
  };

  const handleInputs = (e) => {
    setallInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <>
      {isSignIn ? (
        <SignIn
          allInputs={allInputs}
          setallInputs={setallInputs}
          handleInputs={handleInputs}
          sendSignUpRequest={sendSignUpRequest}
          setisSignIn={setisSignIn}
          setisSignUp={setisSignUp}
        ></SignIn>
      ) : (
        <></>
      )}
      {isSignUp ? (
        <SignUp
          allInputs={allInputs}
          setallInputs={setallInputs}
          handleInputs={handleInputs}
          sendSignUpRequest={sendSignUpRequest}
          isSignIn={isSignIn}
          setisSignIn={setisSignIn}
          setisSignUp={setisSignUp}
        ></SignUp>
      ) : (
        <></>
      )}
      <div className="home-main-container">
        <div className="home-wrapper">
          <div className="triangle1"></div>
          <div className="triangle2"></div>
          <div className="scorll-down-btn">
            <div>
              <div className="left"></div>
              <div className="right"></div>
            </div>
          </div>
          <div className="home-intro-container">
            <h1 className="home-main-heading">
              Keep yourself productive with just one application
            </h1>
            <h1 className="home-sub-heading">
              <span>Supercharge</span> your productivity and transform your
              daily life with our revolutionary <span>ToDOApp</span>,{" "}
              <span>empowering</span> you to conquer <span>tasks</span>.
            </h1>

            <div className="home-joining-btns">
              <button
                onClick={() => {
                  setisSignUp(true);
                }}
                className="Get-started"
              >
                Get Started
              </button>
              <button className="try-for-free">Try For Free</button>
            </div>
          </div>
          <div className="home-feature-container">
            <motion.div className="first-feature-container" layout>
              <motion.div className="first-feature-box-1"></motion.div>
              <div className="first-feature-box-2"></div>
              <div className="first-feature-box-3"></div>
            </motion.div>

            {/* <div className="home-img"></div> */}
          </div>
        </div>
      </div>
      <div className="home-section-2">
        <div className="triangle3"></div>
      </div>
    </>
  );
};

export default Home;
