import React, { useEffect, useState } from "react";
import "../styles/ProfileCard.css";
import { useLoginContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "../context/SnackbarContext";

export default function ProfileCard({ name, email, designation, salary }) {
  name = "Parth Jasathy"
  email = "parth@gmail.com"
  designation = "Developer"
  salary = 50000
  const initials =
    name?.split(" ").map((n) => n[0]).join("").toUpperCase() || "?";

    const [user,setUser] = useState(null);

    const navigate = useNavigate();
    const {showSnackbar} = useSnackbar();

  useEffect(() => {
      const userData = JSON.parse(localStorage.getItem("userData") || "null");
    if (!userData) {
      navigate("/");
      showSnackbar("You are not logged in!", "error");
    }
    
    setUser(userData);
  }, [])

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-top">
          <div className="profile-avatar">{initials}</div>

          <div className="profile-info">
            <h2 className="profile-name">{user?.name || "Anonymous"}</h2>
            <p className="profile-email">{user?.email || "Anonymous@gmail.com"}</p>
          </div>
        </div>

        <div className="profile-divider"></div>

        <div className="profile-detail">
          <span className="label">Designation</span>
          <span className="value designation-tag">{user?.designation || "Not known"}</span>
        </div>

        <div className="profile-detail">
          <span className="label">Salary</span>
          <span className="value salary-text">₹ {user?.salary || "0"}</span>
        </div>
      </div>
    </div>
  );
}
