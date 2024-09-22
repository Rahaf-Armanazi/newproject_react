import { Link ,useNavigate } from "react-router-dom";
import Cookie from "cookie-universal";
import "./Header.css";

export default function Header() {
  const navigate=useNavigate();
  const cookie=Cookie();
  const userLoggedIn = cookie.get("id_user");

  function funclogout() {
    cookie.remove("id_user");
    cookie.remove("token_user");
    navigate("/");
  }
  return (
    <div className="sition">
      <header className="header">
        <div className="logo">
          <img
            src={require("../../../Assets/logo.jpg")}
            alt="logo"
            style={{ width: "100px" }}
          />
        </div>
       {userLoggedIn ? (<div className="ll">
          <span class="icon">
              <span></span>
              <span></span>
              <span></span>
          </span>
          <div className="linksH ul">
            <Link to="/" className="styleA li" onClick={funclogout}>
              Log out
            </Link>
            <Link to="/home" className="styleA li">
              Home
            </Link>
            <Link to="/exam" className="styleA li">
              Exam-courses
            </Link>
            <Link to="/alltests" className="styleA li">
              Quize
            </Link>
            <Link to="/Subjects" className="styleA li">
              Subjects
            </Link>
          </div>
          </div>
        ) :
          (
            <div className="linksH ul">
              <Link to="/register" className="styleA li">
                Sign Up
              </Link>
              <button className="btnLogin-popup">
                <Link to="/login" className="styleA li">
                  Log in
                </Link>
              </button>
            </div>
          )}
      </header>
    </div>
  );
}
