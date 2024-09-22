import React, { useState } from "react";
import "./Subjects.css";
import { Link ,useNavigate } from "react-router-dom";
import axios from "axios";
import Cookie from "cookie-universal";

const Subjects = () => {
  const [subject_name, setSub] = useState("");
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const nav=useNavigate();
  const cookies=Cookie();
  const userId = cookies.get("id_admin");
  async function submitfun(e) {
    e.preventDefault();
    if (!subject_name || !file) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("subject_name", subject_name);
    formData.append("file", file);
    formData.append("id_admin",userId);

    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        "http://192.168.43.131:8000/admin/lectures/store",// اضافة محاضرة 
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        },
        {
          withCredentials: true // تأكد من إرسال ملفات تعريف الارتباط
        } 
      );
      console.log(formData);
      nav('/DashBoard/ShowSubjects');
      console.log(res.status);
      if (res.status === 200) {
        setErrorMessage("Lecture added successfully!");
      }
    } catch (err) {
      console.log(err);
      setErrorMessage("Failed to submit. Please try again later.");
    }
  }

  return (
    <div className="backgroundSubject">
      <div className="contSub">
        <h3 className="h3Sub">: ADD A LECTURE</h3>
        <form className="for1" onSubmit={submitfun}>
          <div className="formSub">
            <input
              type="text"
              className="inSub"
              placeholder="University Specialization"
              required
              value={subject_name}
              onChange={(event) => setSub(event.target.value)}
            />
            <label className="labSub"> : name The Subject</label>
          </div>
          <div className="formSub">
            <input
              type="file"
              className="inSubfile inSub"
              required
              onChange={(event) => setFile(event.target.files[0])}
            />
            <label className="labSub"> : The file </label>
          </div>
          <div className="butt">
            <button type="button" className="btSub" onClick={() => window.history.back()}>
              back
            </button>
            <button type="submit" className="btSub">
              save
            </button>
          </div>
          <Link to="../ShowSubjects" className="aha">
            عرض المواد المُضافة سابقاََ
          </Link>
        </form>
        {errorMessage && <div className="error">{errorMessage}</div>}
      </div>
    </div>
  );
};

export default Subjects;
