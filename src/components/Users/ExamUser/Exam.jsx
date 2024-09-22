import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./Exam.css";

export const Exam = () => {
  // const {name_exam}=useParams();
  const [exams, setExams] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(
          "http://192.168.43.131:8000/api/nationalexams"
        );
        setExams(res.data);
        // console.log(path);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  }, []);

  const inform = exams?.map((i, index) => (
    <div key={index} style={{width:"25%"}}>
      <li className="open">
        <Link
          to={`http://192.168.43.131:8000/storage/${i.path}`}
          className="sora">
            <img src={require("../../../Assets/final.jpg")}   
                alt=" تعذر ظهور الصورة "
                className="sora"/>
        </Link>
      </li>
      <div className="write">
            {/* <span>{index + 1}</span> */}
            <span>{i.name}</span>
          </div>
    </div>
  ));

  return (
    <div className="E">
      <div>
        <h1 className="brmg">Course questions for the software department</h1>
      </div>
      <div className="ccc">
        <div className="d1">
          {inform}
        </div>
      </div>
    </div>
  );
};
