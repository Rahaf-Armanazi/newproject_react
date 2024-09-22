import React, { useEffect, useState } from "react";
// import  from "react-router-dom";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./SubjectUser.css";

const LecturesOfSubject = () => {
  const { subject_name } = useParams();
  const nav = useNavigate();
  /////         جلب المحاضرات الخاصين بمادة معينة    ////////////
  const [lecture, setLecture] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      try {
        const result = await axios.get(
          `http://192.168.43.131:8000/api/lectures/files/${subject_name}`
        );
        // const result=await axios.get(`http://192.168.137.228:8000/api/lectures/files/${subject_name}`);

        setLecture(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);
  function Run() {
    nav("/Subjects");
  }

  const inform = lecture[0]?.map((name, index) => (
    <div key={index}>
      <li className="indexl">{index + 1}</li>
      <li className="liname">{name}</li>
      <li className="open">
        <Link
          to={`http://192.168.43.131:8000/storage/${lecture[1][index]}`}
          className="sss">
          open
        </Link>
      </li>
    </div>
  ));
  return (
    <>
      <div className="Subjectuser">
        <ul className="con">{inform}</ul>
        <div>
          <button className="bbb" onClick={Run}>
            Back
          </button>
        </div>
      </div>
    </>
  );
};

export default LecturesOfSubject;
