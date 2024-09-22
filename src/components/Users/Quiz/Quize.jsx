import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import "./Quize.css";
import axios from "axios";
import Cookie from "cookie-universal";

export const Quize = () => {
  const [questions, setQuestions] = useState([]); // تخزين الأسئلة
  const [index, setIndex] = useState(0); // مؤشر السؤال الحالي
  const [lock, setLock] = useState(false); // للتحكم في حالة القفل بعد الإجابة
  const [score, setScore] = useState(0); // تخزين النتيجة
  const [result, setResult] = useState(false); // للتحكم في عرض النتيجة النهائية
  const { test_id } = useParams(); // جلب معرف الاختبار من المعلمات
  const cookie = Cookie();
  const user_id = cookie.get("id_user");

  // reset
  const reset = () => {
    setIndex(0);
    setScore(0);
    setLock(false);
    setResult(false);
  };

  // المتغيرات المرجعية
  let option1 = useRef(null);
  let option2 = useRef(null);
  let option3 = useRef(null);
  let option4 = useRef(null);
  let option5 = useRef(null);

  let option_array = [option1, option2, option3, option4, option5];

  // جلب البيانات من API
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get(
          `http://192.168.43.131:8000/api/tests/${test_id}`
        );
        setQuestions(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchQuestions();
  }, [test_id]); // إضافة test_id كـ dependency

  const checkAns = (e, ans) => {
    if (!lock) {
      if (questions[index].answer === ans) {
        console.log(questions[index].answer);
        e.target.classList.add("anscorrect");
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add("answrong");
        // option_array[questions[index].answer - 1].current.classList.add(
        // "anscorrect"
        // );
      }
      setLock(true); // قفل الأزرار بعد الإجابة
    }
  };

  const next = async() => {
    if (lock) {
      // إزالة الفئات (CSS classes) من الخيارات قبل الانتقال للسؤال التالي
      option_array.forEach((option) => {
          option.current.classList.remove("anscorrect");
          option.current.classList.remove("answrong");
        
      });

      if (index === questions.length - 1) {
        setResult(true); // عرض النتيجة النهائية بعد الإجابة على آخر سؤال
        try{
          await axios.post(`http://192.168.43.131:8000/api/tests/users/submit`,{
          score,
          user_id,
          test_id
        });}
        catch(err){
          console.log(err);
        }
      } else {
        setIndex(index + 1); // الانتقال للسؤال التالي
        setLock(false); // إعادة تعيين حالة القفل
      }
    }
  };

  if (questions.length === 0) {
    return <div>Loading...</div>; // عرض رسالة تحميل حتى جلب البيانات
  }

  // حساب النتيجة النهائية كنسبة مئوية
  const finalScorePercentage = (score * 100) / questions.length;

  return (
    <div className="sition">
      <div className="backQuiz">
        <div className="quiz-box">
          <div className="titQuiz">
            <Link to="/alltests" className="btn-nextHome">
              Back
            </Link>
            <h1 className="h111">Quiz</h1>
            <hr />
          </div>

          <div className="containerQui">
            {result ? (
              <div>
                <h2 className="h2score">
                  You scored {finalScorePercentage}% out of 100%
                </h2>
                <button onClick={reset} className="reset">Reset</button>
              </div>
            ) : (
              <>
                <h2 className="h2Q">
                  {index + 1}.{questions[index].question}
                </h2>
                <ul>
                  <li
                    className="liQ"
                    ref={option1}
                    onClick={(e) => checkAns(e, `${questions[index].option1}`)}
                  >
                    {questions[index].option1}
                  </li>
                  <li
                    className="liQ"
                    ref={option2}
                    onClick={(e) => checkAns(e, `${questions[index].option2}`)}
                  >
                    {questions[index].option2}
                  </li>
                  <li
                    className="liQ"
                    ref={option3}
                    onClick={(e) => checkAns(e, `${questions[index].option3}`)}
                  >
                    {questions[index].option3}
                  </li>
                  <li
                    className="liQ"
                    ref={option4}
                    onClick={(e) => checkAns(e, `${questions[index].option4}`)}
                  >
                    {questions[index].option4}
                  </li>
                  <li
                    className="liQ"
                    ref={option5}
                    onClick={(e) => checkAns(e, `${questions[index].option5}`)}
                  >
                    {questions[index].option5}
                  </li>
                </ul>
                <button onClick={next} className="btn-next">
                  Next
                </button>
                <div className="index">
                  {index + 1} of {questions.length} questions
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
