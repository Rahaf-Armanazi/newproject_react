import { React, useState, useEffect } from "react";
import "./Create&UpdateQuestion.css";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import  Cookie  from "cookie-universal";

export const UpdateQuestion = () => {
  // const { questionId } = useParams();
  const {id} = useParams();
  const cookie = Cookie();
  const [questionData, setQuestionData] = useState({
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    option5: "",
    answer: ""
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); //from react router

  useEffect(() => {
    const fetchquestion = async () => {
      try {
        console.log(id);  
        await axios
          // .get(`http://192.168.43.97:3000/question/${questionId}`)// جلب بيانات السؤال يلي لازم عدلو 
          .get(`http://192.168.43.131:8000/admin/questions/${id}`)
          .then((response) => {
            setQuestionData(response.data.data);
          });
      } catch (err) {
        console.log(err);
      } 
    };
    fetchquestion();
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setQuestionData({ ...questionData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        // `http://192.168.43.97:3000/addQuestion/${questionId}`,// ارسال بيانات السؤال بعد تعديلها
        `http://192.168.43.131:8000/admin/questions/update/${id}`,
        questionData,{
          headers:{
            'ghg':'gfhh'
          }
        }
      );
      console.log(res.status);
      navigate(0);
    } catch (err) {
      console.log(err);
      setErrorMessage("Failed to submit. Please try again later.");
    }
  };

  return (
    <div className="backgroundQuiz">
      <div className="contQui">
        <form className="forq" onSubmit={handleSubmit}>
          <input
            type="text"
            className="inquistion"
            placeholder="the question "
            required
            name="question"
            value={questionData.question}
            onChange={handleInputChange}
          />
          <label className="labquestion"> :question </label>
          {["option1", "option2", "option3", "option4", "option5"].map((option, index) => (
            <div className="formquiS" key={index}>
              <label className="labqui">option{index + 1}:</label>
              <input
                type="text"
                className="inqui"
                placeholder={`Option${index + 1}`}
                required
                name={option}
                value={questionData[option]}
                onChange={handleInputChange}
              />
            </div>
          ))}
          <div className="formquiS">
            <label className="labqui"> : Result </label>
            <input
              type="text"
              className="inqui"
              placeholder="Result"
              required
              value={questionData.answer}
              name="answer"
              onChange={handleInputChange}
            />
          </div>

          <div className="butqui">
            <button
              className="btqui"
              type="button"
              onClick={() => navigate(-1)}
            >
              العودة
            </button>
            <button type="button" className="btqui" onClick={handleSubmit}>
              حفظ
            </button>
          </div>
        </form>
        {/* must be outside the form element, and use toastify library for better UX */}
        {errorMessage && <div className="error">{errorMessage}</div>}
        <div className="la">
          <p style={{ color: "black" }}>{id}</p>
        </div>
      </div>
    </div>
  );
};

export default UpdateQuestion;
