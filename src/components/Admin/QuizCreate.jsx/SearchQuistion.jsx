import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SearchQuestion = () => {
  // const [name, setName] = useState("");
  const [question,setQuestion]=useState("");
  const [results, setResults] = useState([]);
  // للحذف
  const [quizzes, setQuizzes] = useState([]);
  const deletequestion = async (id) => {
    try {
      // await axios.delete(`http://192.168.43.97:3000/questions/${questionId}`);// id حذف السؤال حسيب ال
      await axios.delete(
        `http://192.168.43.131:8000/admin/questions/delete/${id}`
      );
      setQuizzes(quizzes.filter((quiz) => quiz.id !== id));
    } catch (err) {
      console.log(err);
    }
  };
  // للتعديل
  const navigate = useNavigate();
  const handleUpdate = (id) => {
    navigate(`/DashBoard/UpdateQuestion/${id}`);
  };
  // للبحث
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        // `http://192.168.43.97:3000/searchProduct/${name}`
      `http://192.168.43.131:8000/admin/questions/search/${question}`
      );
      setResults(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const dataquestion = results?.map((i) => (
    <div className="showQuestion">
            <div className="qstyle">
              <div className="spanS">Question:</div>
              <div className="op">
              {i.question}
              </div>
            </div>
            <div className="qstyle">
              <div className="spanS">option 1 :</div>
              <div className="op">{i.option1}</div>
            </div>
            <div className="qstyle">
              <div className="spanS">option 2 :</div>
              <div className="op">
                {i.option2}
              </div>
            </div >
            <div className="qstyle">
              <div className="spanS">option 3 :</div>
              <div className="op">
                {i.option3}
              </div>
            </div>
            <div className="qstyle">
              <div className="spanS" n>
                option 4 :
              </div>
              <div className="op">
                {i.option4}
              </div>
            </div>
            <div className="qstyle">
              <div className="spanS">option 5 :</div>
              <div className="op">
                {i.option5}
              </div>
            </div>
            <div className="qstyle">
              <div className="spanS"> Result :</div>
              <div className="op">{i.answer}
              </div>
            </div>
            <div className="zr">
              <button className="btnupdel" onClick={() => deletequestion(i.id)}>delete</button>
              <button className="btnupdel" onClick={() => handleUpdate(i.id)}>update</button>
            </div>
          </div>));
  return (
    <div>
      <div className="backgroundSubject">
        <div className="contSub2">
          <Link to="/DashBoard/TypeOfQuiz" className="backtotest">
            Back
          </Link>
          <form className="forquiSearch" onSubmit={handleSearch}>
            <div className="formquestion">
              <div className="labtheques">The Question</div>
              <input
                type="text"
                className="inquestion"
                placeholder="Enter product name"
                required
                // value={name}
                value={question}
                // onChange={(event) => setName(event.target.value)}
                onChange={(event) => setQuestion(event.target.value)}
              />
              <button type="submit" className="btquestion">
              Search
            </button>
            </div>
            
          </form>
          {dataquestion}
          {/* <ul>
            {/* البيانات القادمة من الباك */}
            {/* {results.map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul> */} 
        </div>
      </div>
    </div>
  );
};

export default SearchQuestion;
