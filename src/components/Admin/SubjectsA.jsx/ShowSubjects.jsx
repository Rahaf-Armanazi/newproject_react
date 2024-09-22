import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ShowSubjects = () => {
  const [lectures, setLecture] = useState([]);
  const [originalLectures, setOriginalLectures] = useState([]);
  const [subject_name, setNameSub] = useState("");

  useEffect(() => {
    const fetchlectures = async () => {
      try {
        const response = await axios.get(
          // "http://192.168.43.131:8000/admin/lectures"
          "http://192.168.43.131:8000/admin/lectures"
        );
        setLecture(response.data);
        setOriginalLectures(response.data);
        console.log(response.data);
      }
      catch (err) {
        console.log(err);
      }
    };
    fetchlectures();
  }, []);

  // Delete lecture
  const deletelecture = async (id) => {
    try {
      await axios.delete(
        `http://192.168.43.131:8000/admin/lectures/delete/${id}`
      );
      setLecture(lectures.filter((element) => element.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  // Search function
  const submitsearch = async (e) => {
    e.preventDefault();
    if (subject_name === "") {
      setLecture(originalLectures);
    } else {
      try {
        const res = await axios.get(`http://192.168.43.131:8000/admin/lectures/search/${subject_name}`);
        // const res = await axios.get(`http://192.168.1.1:8000/admin/lectures/search/${subject_name}`);
        setLecture(res.data);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const lecturesShow = lectures.map((element) => (
    <tr key={element.id}>
      <td className="tdSu">{element.subject_name}</td>
      <td className="tdSu">{element.name}</td>
      <td className="tdSu b">
        <button className="btnSub" onClick={() => deletelecture(element.id)}>Delete</button>
      </td>
    </tr>
  ));

  return (
    <div className="backgroundSubject">
      <div className="contSub">
        <div className="h3M">
          <Link to="/DashBoard/Subject" className="btnBackSubject">Back</Link>
          <h3>: المواد المتوفرة </h3>
        </div>
        {/* Search form */}
        <form className="forSubject" onSubmit={submitsearch}>
          <div className="formSub">
            <label className="labnameoflec">Name the Subject</label>
            <input
              type="text"
              className="inlect"
              placeholder="Name the Subject"
              value={subject_name}
              onChange={(event) => setNameSub(event.target.value)}
            />
          </div>
          <button type="submit" className="btShowSub">Search</button>
        </form>
        {/* Display all lectures */}
        <h3 className="h3Mm">: جميع المواد </h3>
        <div className="table-containerS">
          <table className="tabS">
            <thead>
              <tr>
                <th className="thSu">Name the Subject</th>
                <th className="thSu">Name the Lecture</th>
                <th className="thSu">Procedure</th>
              </tr>
            </thead>
            <tbody>{lecturesShow}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ShowSubjects;
