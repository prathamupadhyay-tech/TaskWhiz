import React from "react";
import "../css/Signin.css";

const SignIn = ({
  allInputs,
  setallInputs,
  handleInputs,
  sendSignUpRequest,
  setisSignUp,
  setisSignIn,
}) => {
  return (
    <>
      <div className="signin_form_container">
      <div className="signup-back"></div>
        <div className="signin_form_wrapper">
          <div
            onClick={() => {
              setisSignIn(false);
            }}
            className="cross_btn_div_signin"
          >
            <div className="signin_cross1"></div>
            <div className="signin_cross2"></div>
          </div>
          <form
            onSubmit={(e) => {
              sendSignUpRequest(e, "signin");
            }}
            className="signin_card_form"
            action=""
            method="post"
          >
            <div className="signup_form_heading">Get to work!</div>
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
              Login
            </button>
            <p className="signin-singup-p">
              Don't have an account?{" "}
              <span
                onClick={() => {
                  setisSignIn(false);
                  setisSignUp(true);
                }}
              >
                create one
              </span>
            </p>
          </form>
          <div className="signin_imgs">
            <div className="features-display-signin">
              <p>
                "As a busy parent juggling multiple responsibilities, the
                TodoApp has been a game-changer for me. It helps me stay on top
                of my tasks, whether it's managing household chores or
                remembering important school events for my kids. The intuitive
                interface and reminder features are a lifesaver. I can't imagine
                my day without it!"
              </p>
              <h2>- David Patel, Parent and Business Owner.</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SignIn;
