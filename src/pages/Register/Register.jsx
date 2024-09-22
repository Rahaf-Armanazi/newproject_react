import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import "./Register.css";

export const Register = () => {
  const [name, setfirst] = useState("");
  const [password, setpassword] = useState("");
  const [email, setEmail] = useState("");
  const [universityn, setuniversityn] = useState("");
  const navigate = useNavigate();
  
  async function submit(e) {
    e.preventDefault();
    try {
      let res = await axios.post("http://192.168.43.131:8000/api/register", {
        name,
        email,
        password,
        universityn,
      });

      if (res.status === 200) {
        navigate('/login');
      }
    } catch (err) {
      if (err.response && err.response.status === 400 && err.response.data.error) {
        alert(err.response.data.error);
      } else {
        console.log(err);
      }
    }
  }
  
  return (
    <>
      <div className="registerpage">
        <div className="reg-title">
          <h2 className="h2Rej">Register</h2>
          <p>please register to use the platform</p>
        </div>

        <form>
          <div className="input-box">
            <span className="icon">
              <i className="bx bxs-user-pin bx-flashing"></i>
            </span>
            <input
              id="1"
              type={"text"}
              required
              value={name}
              onChange={(event) => setfirst(event.target.value)}
            />
            <label htmlFor="1">User-name</label>
          </div>
          <div className="input-box">
            <span className="icon">
              <i className="bx bx-envelope bx-flashing"></i>
            </span>
            <input
              id="2"
              type={"email"}
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <label htmlFor="2">Email</label>
          </div>
          <div className="input-box">
            <span className="icon">
              <button id="showPassword">
                <i className="bx bx-lock-alt bx-tada bx-flip-horizontal"></i>
              </button>
            </span>
            <input
              type="password"
              id="3"
              className="password"
              required
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
            <label htmlFor="3">Password</label>
          </div>
          <div className="input-box">
            <span className="icon">
              <i className="bx bxs-user-pin bx-flashing"></i>
            </span>
            <input
              id="4"
              type={"number"}
              value={universityn}
              onChange={(event) => setuniversityn(event.target.value)}
            />
            <label htmlFor="4">university id</label>
          </div>
          <button type="submit" className="btn" onClick={(e) => submit(e)}>
            Register
          </button>
        </form>
      </div>
    </>
  );
};
