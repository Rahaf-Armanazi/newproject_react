import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./SubjectUser.css"

const SubjectUser = () => {
  /////////////      جلب المواد المضافة بالموقع         ///////////
  const [Subjects, setSubjects] = useState([]);
  useEffect(() => {
    const fetchSub = async () => {
      try {
        const res = await axios.get(
          "http://192.168.43.131:8000/api/unique-subject-names"
        ); //// عرض جميع المواد
        setSubjects(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchSub();
  }, []);

  const info = Subjects.map((i, index) => (
    <div key={index}>
      <li className="indexl">{index+1}</li>
      <li className="linamem">{i.subject_name}</li>
      <li className="opensub">
        <Link to={`/lecturesOfSubject/${i.subject_name}`} className="btntypes">
          show lectures
        </Link>
      </li>
    </div>
  ));

  return (
    <div className="Subjectuser">
      <ul className="con">{info}</ul>
    </div>
  );
};

export default SubjectUser;
