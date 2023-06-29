import axios from "axios";
import React, { useEffect, useState } from "react";
import "../css/Signup.css";
const SignUp = ({
  allInputs,
  setallInputs,
  handleInputs,
  sendSignUpRequest,

  setisSignIn,
  setisSignUp,
}) => {
  return (
    <>
      <div className="signup_form_container">
        <div className="signup-back"></div>
        <div
          onClick={() => {
            setisSignUp(false);
          }}
          className="cross_btn_div_signup"
        >
          <div className="signup_cross1"></div>
          <div className="signup_cross2"></div>
        </div>
        <div className="signup_form_wrapper">
          <form
            className="signup_card_form"
            action=""
            onSubmit={(e) => {
              sendSignUpRequest(e, "signup");
            }}
          >
            <div className="signup_form_heading">Create an Account</div>
            <div className="input-divs-names">
              {" "}
              <input
                placeholder="First name"
                name="firstName"
                value={allInputs.firstName}
                onChange={handleInputs}
              />
              <input
                placeholder="Last name"
                name="lastName"
                value={allInputs.lastName}
                onChange={handleInputs}
              />
            </div>

            <div className="input-divs">
              {" "}
              <input
                placeholder="Email"
                name="emailId"
                value={allInputs.emailId}
                onChange={handleInputs}
              />
            </div>
            <div className="input-divs">
              <input
                placeholder="Password"
                type="password"
                name="password"
                value={allInputs.password}
                onChange={handleInputs}
              />
            </div>

            <button type="submit" className="signup_form_submit_btn">
              Create Account
            </button>
            <p className="signup-login-p">
              Already have an account?{" "}
              <span
                onClick={() => {
                  setisSignIn(true);
                  setisSignUp(false);
                }}
              >
                Login
              </span>{" "}
            </p>
          </form>
          <div className="signup_imgs">
            <div className="features-display-signup">
              <p>
                "I've been using the TodoApp for a while now, and it has
                completely transformed my productivity. It's so easy to add
                tasks, set deadlines, and prioritize my work. I love how
                organized and focused I feel each day. Thank you for creating
                such a fantastic tool!"{" "}
              </p>
              <h2>- Sarah Johnson, Freelance Designer.</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SignUp;
