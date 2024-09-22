import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const PageOfQuizes = () => {
  // عرض الاختبارات من الداتا
  const [tests, setTest] = useState([]);
  const { test_id } = useParams();
  useEffect(() => {
    const fetchquiz = async () => {
      const res = await axios.get(`http://192.168.43.131:8000/api/tests`);
      setTest(res.data);
    };
    fetchquiz();
  }, []);

  ///////       show       ///////////
  const showtests = tests?.map((i, index) => (
    <div key={i.id}>
      <li className="ulShidnnn">{index + 1}</li>
      <li className="ulShnamest">{i.name}</li>
      <li className="ulShstart">
        <Link to={`/test/${i.id}`} className="btntypes">
          Start The Test
        </Link>
      </li>
    </div>
  ));
  return (
    <div className="pageQuiz">
      <h1 className="h1quiiii" > THE TESTS </h1>
      <ul className="typeShowuser">{showtests}</ul>
    </div>
  );
};

export default PageOfQuizes; 