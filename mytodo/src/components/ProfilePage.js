import React, { useEffect } from "react";
import "../css/profile.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import axios from "axios";
import BoardForm from "./BoardForm";
import ContributerForm from "./contributerForm";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";
import "../css/ProfilePage.css";
const ProfilePage = () => {
  const dispatch = useDispatch();
  const [updateProfile, setupdateProfile] = useState(false);
  const [skillTobeAdded, setSkillTobeAdded] = useState("");
  const store = useSelector((state) => state);

  console.log(store);
  const user = useSelector((state) => state.user);

  const [socialLinks, setsocialLinks] = useState({
    linkedin: "",
    instagram: "",
    facebook: "",
    youtube: "",
  });
  const validateSocialLinks = () => {
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    const links = Object.values(socialLinks);

    for (const link of links) {
      if (link.trim() !== "" && !urlPattern.test(link)) {
        return false;
      }
    }

    return true;
  };

  const updateTheUser = async (e) => {
    e.preventDefault();
    console.log(validateSocialLinks());
    console.log(socialLinks);
    if (!validateSocialLinks()) {
      alert("not valid links ");
      return;
    }
    const userId = localStorage.getItem("userId");
    const updatedValues = {
      socialLinks,
      skills: [skillTobeAdded],
    };

    // Check if all fields are empty
    const isAllFieldsEmpty =
      Object.values(updatedValues.socialLinks).every(
        (value) => value.trim() === ""
      ) && updatedValues.skills.length === 0;

    console.log(isAllFieldsEmpty);
    if (isAllFieldsEmpty) {
      alert("Nothing to update");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/api/updateUser/${userId}`,
        updatedValues
      );
      if (response.data && response.data.user) {
        dispatch(authActions.login({ user: response.data.user }));
      }
      console.log(response.data);
      setupdateProfile(false);
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(()=>{

  // },[])

  const handleSocials = (e) => {
    setsocialLinks((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <div className="profile-page-container">
        <div className="profile-page-wrapper">
          <div className="profile-page-info">
            <div className="profile-avatar"></div>
            <div className="horizontal-line"></div>
            <div className="personal-info">
              <div>
                <h3>Personal Info</h3>
              </div>

              <p>UserName - {user.firstName + user.lastName}</p>
              <p>Email - {user.emailId}</p>
            </div>
            <div className="horizontal-line"></div>
            <div className="Social-info">
              <div>
                <h3>Socials</h3>
                <div
                  onClick={() => {
                    setupdateProfile(true);
                  }}
                  className="profile-plus-btn"
                >
                  <div className="profile-plus1"></div>
                  <div className="profile-plus2"></div>
                </div>
              </div>

              {updateProfile ? (
                <>
                  <input
                    value={socialLinks.facebook}
                    onChange={(e) => {
                      handleSocials(e);
                    }}
                    name="facebook"
                    placeholder="Facebook"
                    className="social-link"
                  ></input>
                  <input
                    value={socialLinks.instagram}
                    onChange={(e) => {
                      handleSocials(e);
                    }}
                    name="instagram"
                    placeholder="instagram"
                    className="social-link"
                  ></input>
                  <input
                    value={socialLinks.linkedin}
                    onChange={(e) => {
                      handleSocials(e);
                    }}
                    name="linkedin"
                    placeholder="linkedin"
                    className="social-link"
                  ></input>
                  <input
                    value={socialLinks.youtube}
                    onChange={(e) => {
                      handleSocials(e);
                    }}
                    name="youtube"
                    placeholder="youtube"
                    className="social-link"
                  ></input>
                </>
              ) : (
                <>
                  {user.socialLinks &&
                    Object.entries(user.socialLinks).map(([key, value]) => {
                      if (key !== "_id") {
                        return (
                          <div className="holder" key={key}>
                            <strong>{key}: </strong>{" "}
                            <a target="_blank" className="link" href={value}>
                              {" "}
                              {value}
                            </a>
                          </div>
                        );
                      }
                      return null; // Exclude rendering the _id field
                    })}
                </>
              )}
            </div>
            <div className="horizontal-line"></div>
            <div className="skills">
              <div>
                <h3>Skills</h3>
                <div
                  onClick={() => {
                    setupdateProfile(true);
                  }}
                  className="profile-plus-btn"
                >
                  <div className="profile-plus1"></div>
                  <div className="profile-plus2"></div>
                </div>
              </div>

              <div>
                {updateProfile ? (
                  <>
                    <input
                      value={skillTobeAdded}
                      onChange={(e) => {
                        setSkillTobeAdded(e.target.value);
                      }}
                      placeholder="Add a Social Link"
                      className="add-skill"
                    ></input>
                  </>
                ) : (
                  <>
                    {user.skills.map((data) => {
                      return <div>{data}</div>;
                    })}
                  </>
                )}
              </div>

              {updateProfile ? (
                <>
                  <div className="save-profile-btns">
                    <button
                      onClick={(e) => {
                        updateTheUser(e);
                      }}
                      className="save-btn"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setupdateProfile(false);
                      }}
                      className="cancle-btn"
                    >
                      Cancle
                    </button>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="Activity-Achievements">
            <div className="popular-boards-div">
              <h2>Recent active Boards</h2>

              <div>
                <div className="popular-boards">
                  <h4>Heading</h4>
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Dolorem
                  </p>
                </div>
                <div className="popular-boards">
                  <h4>Heading</h4>
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Dolorem,
                  </p>
                </div>
                <div className="popular-boards">
                  <h4>Heading</h4>
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Dolorem, itaque
                  </p>
                </div>
                <div className="popular-boards">
                  <h4>Heading</h4>
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Dolorem, itaque Lorem ipsum, dolor sit amet consectetur
                    adipisicing elit. Dolorem, itaque Lorem ipsum, dolor sit
                    amet consectetur adipisicing elit. Dolorem, itaque
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
