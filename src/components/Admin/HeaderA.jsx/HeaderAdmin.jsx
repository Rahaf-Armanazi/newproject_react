import React from "react";
import "./HeaderA.css";
import { Link } from "react-router-dom";

export const HeaderAdmin = () => {
  const name_admin = localStorage.getItem("name_admin"); // جلب الاسم من localStorage
return (
    <div className="containA">
      <div className="shfaf">
        <div className="nav">
          <h1 className="nameAdmin" style={{ cursor: "default" }}>
           # Admin : {name_admin}
          </h1>
          <div className="d-flex">
            <Link to="/" className="button button1">
              log out
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
