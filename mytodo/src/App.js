import logo from "./logo.svg";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Board from "./components/Board";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import ProtectedRoutes from "./utils/img/ProtectedRoutes.js";
import HomePage from "./components/HomePage";
import BoardsPage from "./components/BoardsPage";
import { authActions } from "./store";
import ContributerPage from "./components/ContributerPage";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import { useState } from "react";
import ProfilePage from "./components/ProfilePage";
const App = () => {
  const dispatch = useDispatch();
  const [isProfile, setisProfile] = useState(false);

  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  useEffect(() => {
    const token = localStorage.getItem("token");

    const user = localStorage.getItem("user");
    console.log(user);
    if (token && user) {
      dispatch(authActions.login({ user: JSON.parse(user), token: token }));
    }
  }, []);

  return (
    <React.Fragment>
      {isLoggedIn ? (
        <>
          <Navbar isProfile={isProfile} setisProfile={setisProfile}></Navbar>
          {isProfile ? <Profile setisProfile={setisProfile}></Profile> : <></>}
        </>
      ) : (
        <></>
      )}
     
      <Routes>
        <Route element={<ProtectedRoutes></ProtectedRoutes>}></Route>
        {!isLoggedIn ? (
          <Route path="/" element={<Home></Home>}></Route>
        ) : (
          <>
            <Route
              path="/profilePage"
              element={<ProfilePage></ProfilePage>}
            ></Route>
            <Route path="/boards" element={<BoardsPage></BoardsPage>}></Route>
            <Route path="/home" element={<HomePage></HomePage>}></Route>
            <Route
              path="/contributers"
              element={<ContributerPage></ContributerPage>}
            ></Route>
          </>
        )}
      </Routes>
    </React.Fragment>
  );
};

export default App;
