import React from "react";
import "../css/Navbar.css";
import "../css/HomePage.css";
import { useState } from "react";
import "../css/Contributer.css";
import { useEffect } from "react";
import axios from "axios";
const ContributerForm = ({ setContributerResponse, setisContributer }) => {
  const [colorForSelectedLanguage, setcolorForSelectedLanguage] = useState({});
  const [selectedLanguage, setselectedLanguage] = useState([]);
  const languageArray = [
    "JavaScript",
    "Python",
    "Java",
    "Ruby",
    "C",
    "C++",
    "C#",
    "Go",
    "PHP",
    "Swift",
    "TypeScript",
    "Rust",
    "Kotlin",
    "Scala",
    "Perl",
    "R",
    "MATLAB",
    "Groovy",
    "Shell",
    "PowerShell",
    "HTML",
    "CSS",
  ];

  const handleClick = (e, data) => {
    e.preventDefault();
    if (!selectedLanguage.includes(data)) {
      const updatedSelectedLanguage = [...selectedLanguage, data];
      setselectedLanguage(updatedSelectedLanguage);
      setcolorForSelectedLanguage((prevState) => ({
        ...prevState,
        [data]: true,
      }));
    } else {
      const updatedSelectedLanguage = selectedLanguage.filter(
        (lang) => lang !== data
      );
      setselectedLanguage(updatedSelectedLanguage);
      setcolorForSelectedLanguage((prevState) => ({
        ...prevState,
        [data]: false,
      }));
    }
  };
  const findGeek = async (e) => {
    e.preventDefault();
    if (selectedLanguage.length === 0) {
      alert("You must select at least one language");
    } else {
      try {
        const { data } = await axios.post("http://localhost:5000/api/gituser", {
          languages: selectedLanguage,
        });

        if (!data) {
          console.log("Error: No response received");
        } else {
          console.log(data);
          setContributerResponse(data);
        }
      } catch (err) {
        console.log("Error:", err.message);
      }
    }
  };
  // useEffect(() => {
  //   const languages = document.getElementsByClassName("languages");
  //   for (let i = 0; i < languages.length; i++) {
  //     const language = languages[i].textContent;
  //     if (selectedLanguage.includes(language)) {
  //       languages[i].classList.remove("hover");
  //     }
  //   }
  // }, [selectedLanguage]);

  return (
    <>
      <div className="contributer-form-main-container">
        <div className="contributer-back"></div>
        <div className="contributer-wrapper">
          <div
            onClick={() => {
              setisContributer(false);
            }}
            className="contributer-cross-btn"
          >
            <div className="contributer-cross1"></div>
            <div className="contributer-cross2"></div>
          </div>
          <form action="" className="contributer-form">
            <div className="contributer-input-div">
              <h1 className="contributer-heading">
                Select Languages To Find A Geek!
              </h1>
              <div className="contributer-input">
                {languageArray.map((data, index) => {
                  return (
                    <div
                      key={index}
                      className={`languages ${
                        colorForSelectedLanguage[data] ? "selected" : ""
                      }`}
                      onClick={(e) => handleClick(e, data)}
                    >
                      {data}
                    </div>
                  );
                })}
              </div>
              <button
                onClick={(e) => {
                  findGeek(e);
                  setisContributer(false);
                }}
                className="contributer-find-btn"
              >
                Find
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContributerForm;
