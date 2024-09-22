import React, { useState } from "react";
import axios from "axios";
import "./Forget.css";
// import Header from "../../components/Users/HeaderUser/Header";
export const Forgitpass = () => {
  const [email, setEmail] = useState("");
  async function submit(e) {
    e.preventDefault();
    console.log(email);
    try {
      let res = await axios.post("http://192.168.43.131:8000/api/password/email", {
        email,
      });
      alert("Check your email, we have sent you a message...");
      console.log(res.status);
    } catch (err) {
      console.log(err);
    }
  }
  // <Header/>
  return (
    <div className="confor">
      <div className="logfor">
        <div class="logreg-box">
          <div class="form-box login">
            <p className="cp">
              we will send a link to your email, use that link to reset
              password.
            </p>
            <form>
              <div className="input-box">
                <input
                  className="inem"
                  type="email"
                  id="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                <label htmlFor="email">Email</label>
              </div>
              <button type="submit" className="btn" onClick={(e) => submit(e)}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};