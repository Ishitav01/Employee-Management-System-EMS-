import React from "react";
import "../styles/ProfileCard.css";

export default function ProfileCard({ name, email, designation, salary }) {
   name = "Parth Jasathy"
   email = "parth@gmail.com"
   designation = "Developer"
   salary = 50000
  const initials =
    name?.split(" ").map((n) => n[0]).join("").toUpperCase() || "?";

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-top">
          <div className="profile-avatar">{initials}</div>

          <div className="profile-info">
            <h2 className="profile-name">{name}</h2>
            <p className="profile-email">{email}</p>
          </div>
        </div>

        <div className="profile-divider"></div>

        <div className="profile-detail">
          <span className="label">Designation</span>
          <span className="value designation-tag">{designation}</span>
        </div>

        <div className="profile-detail">
          <span className="label">Salary</span>
          <span className="value salary-text">₹ {salary}</span>
        </div>
      </div>
    </div>
  );
}
