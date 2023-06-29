import React from "react";
import "../css/Navbar.css";
import "../css/HomePage.css";
import { useState } from "react";
import "../css/contributerPage.css";
import { useEffect } from "react";
import axios from "axios";
import ContributerForm from "./contributerForm";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
const ContributerPage = ({}) => {
  const [isContributer, setisContributer] = useState(false);
  const [contributerResponse, setContributerResponse] = useState([]);

  const [contributersFromSkills, setcontributersFromSkills] = useState([]);
  const user = useSelector((state) => state.user);
  useEffect(() => {
    const fetchData = async () => {
      if (user.skills.length === 0) {
        console.log("err");
        return;
      }
      try {
        const { data } = await axios.post("http://localhost:5000/api/gituser", {
          languages: user.skills,
        });

        if (!data) {
          console.log("Error: No response received");
        } else {
          console.log(data);
          setcontributersFromSkills(data);
        }
      } catch (err) {
        console.log("Error:", err.message);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      {isContributer ? (
        <ContributerForm
          setContributerResponse={setContributerResponse}
          setisContributer={setisContributer}
        ></ContributerForm>
      ) : (
        <></>
      )}
      <div className="contributer-page-container">
        <div className="contributer-page-wrapper">
          {contributerResponse && contributerResponse.length !== 0 ? (
            <>
              <div className="contributer-page-heading">
                <h3>Geeks Based On Your Search</h3>
              </div>
              {contributerResponse.map((data) => {
                return (
                  <div className="contributers-card">
                    <div className="contributers-info">
                      <img
                        src={data.avatarUrl}
                        alt="Avatar"
                        className="contributer-avatar"
                      />

                      <div className="contributer-links">
                        <div className="contributers-name">
                          UserName - {data.username}
                        </div>
                        <div className="contributer-git">
                          Git URL - {data.profileUrl}{" "}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <>
              <div className="contributer-page-heading">
                <h3>Suggested Geeks Based On Your Profile</h3>
              </div>
              {contributersFromSkills.map((data) => {
                return (
                  <div className="contributers-card">
                    <div className="contributers-info">
                      <img
                        src={data.avatarUrl}
                        alt="Avatar"
                        className="contributer-avatar"
                      />

                      <div className="contributer-links">
                        <div className="contributers-name">
                          UserName - {data.username}
                        </div>
                        <div className="contributer-git">
                          Git URL - {data.profileUrl}{" "}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}

          <button
            onClick={() => {
              setisContributer(true);
            }}
            className="find-contributer-btn"
          >
            Find Geeks
          </button>
        </div>
      </div>
    </>
  );
};

export default ContributerPage;
