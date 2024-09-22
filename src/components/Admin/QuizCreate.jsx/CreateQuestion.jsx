import React, { useState } from "react";
import "./Create&UpdateQuestion.css";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export const CreateQuestion = () => {
  const { test_id } = useParams();
  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [option5, setOption5] = useState("");
  const [answer, setAnswer] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!question || !option1 || !option2 || !option3 || !option4 || !option5 || !answer) {
      setErrorMessage("Please fill in all fields.");
      return;
    }
    console.log("ahmad");
    try {
      const res = await axios.post(
        `http://192.168.43.131:8000/admin/questions/${test_id}`,
        {
          question,
          option1,
          option2,
          option3,
          option4,
          option5,
          answer,
        }
      );
      console.log(option1); 
      // let test_id = res.data.data;
      console.log(res.status);
      navigate(0); // لإعادة تحميل الصفحة
    } catch (err) {
      console.log(err);
      setErrorMessage("Failed to submit. Please try again later.");
    }
  }

  return (
    <div className="backgroundQuiz">
      <div className="contQui">
        <form className="forq" onSubmit={handleSubmit}>
          <input
            type="text"
            className="inquistion"
            placeholder="the question"
            required
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
          />
          <label className="labquestion">:question</label>
          <div className="formquiS">
            <label className="labqui">option1:</label>
            <input
              type="text"
              className="inqui"
              placeholder="Option1"
              required
              value={option1}
              onChange={(event) => setOption1(event.target.value)}
            />
          </div>
          <div className="formquiS">
            <label className="labqui">option2:</label>
            <input
              type="text"
              className="inqui"
              placeholder="Option2"
              required
              value={option2}
              onChange={(event) => setOption2(event.target.value)}
            />
          </div>
          <div className="formquiS">
            <label className="labqui">option3:</label>
            <input
              type="text"
              className="inqui"
              placeholder="Option3"
              required
              value={option3}
              onChange={(event) => setOption3(event.target.value)}
            />
          </div>
          <div className="formquiS">
            <label className="labqui">option4:</label>
            <input
              type="text"
              className="inqui"
              placeholder="Option4"
              required
              value={option4}
              onChange={(event) => setOption4(event.target.value)}
            />
          </div>
          <div className="formquiS">
            <label className="labqui">option5:</label>
            <input
              type="text"
              className="inqui"
              placeholder="Option5"
              required
              value={option5}
              onChange={(event) => setOption5(event.target.value)}
            />
          </div>
          <div className="formquiS">
            <label className="labqui">: Result</label>
            <input
              type="text"
              className="inqui"
              placeholder="Result"
              required
              value={answer}
              onChange={(event) => setAnswer(event.target.value)}
            />
          </div>

          <div className="butqui">
            <button className="btqui" type="button" onClick={() => navigate(-1)}>
              العودة
            </button>
            <button className="btqui" type="submit">
              حفظ
            </button>
          </div>
        </form>
        {errorMessage && <div className="error">{errorMessage}</div>}
      </div>
    </div>
  );
};

export default CreateQuestion;
