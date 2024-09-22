import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";
import  Cookie  from "cookie-universal";
// import Cookies from "js-cookie";
// import { Cookie, Token } from "@mui/icons-material";

export const Login = () => {
  const [password, setpassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const cookie=Cookie();

  async function submit(e) {
    e.preventDefault();
    try {
      let res = await axios.post(
        "http://192.168.43.131:8000/api/login",
        {
          email,
          password,
        }
      );
      if (res.status === 200) {
        if (res.data.role === "admin") {
          cookie.set("token_admin", res.data.token_admin);
          cookie.set("id_admin",res.data.id_admin)
          localStorage.setItem("name_admin", res.data.name_admin); // تخزين الاسم في localStorage
          navigate("/DashBoard" , { state: { name_admin: res.data.name_admin } });
        } else {
          cookie.set("token_user", res.data.token_user);
          cookie.set("id_user",res.data.id_user)
          navigate("/home");
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="loginpage">
      <div class="logreg-box">
        <div className="logreg-title">
          <h2>Login</h2>
          <p>please login to use the platform</p>
        </div>

        <form>
          <div className="input-box">
            <span className="icon">
              <i className="bx bx-envelope bx-flashing"></i>
            </span>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="input-box">
            <span className="icon">
              <i className="bx bx-lock bx-tada"></i>
            </span>
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(event) => setpassword(event.target.value)}
            />
            <label htmlFor="password">Password</label>
          </div>
          <div className="remember-forget">
            <Link to="/forgetpass">Forgot password?</Link>
          </div>
          <button type="submit" className="btn" onClick={(e) => submit(e)}>
            Login
          </button>
          <div className="logreg-link">
            <p className="reg">
              Don't have an account?
              <span>
                <Link to="/register" className="register-link">
                  Register
                </Link>
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
