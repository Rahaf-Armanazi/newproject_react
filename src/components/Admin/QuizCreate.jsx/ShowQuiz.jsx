import React, { useState, useEffect } from "react";
import "../SubjectsA.jsx/Subjects.css";
import { useParams, Link ,useNavigate } from "react-router-dom";
import axios from "axios";
const ShowQuiz = () => {
  // const {testId}=useParams();
  const {test_id}=useParams();
  // const {id}=useParams();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
// للتعديل
const navigate = useNavigate();
// عرض اسئلة الاختبار 
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
      //await axios.get(`http://192.168.43.97:3000/test/${testId}`)  //  الاختبار id عرض اسئلة هالاختبار حسب ال
        await axios.get(`http://192.168.43.131:8000/admin/tests/${test_id}`)
        .then((response) => {
          setQuizzes(response.data);
          console.log(quizzes);
        });
      } catch (err) {
        setError(err);  
      } finally {
        setLoading(false);
      }
    };
    fetchQuizzes();
  // }, [testId]);
  },[test_id]);
  
  ///////     update    /////////
  const handleUpdate = (id) => {
    navigate(`/DashBoard/UpdateQuestion/${id}`);
  };
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  ///////      delete      ///////////
  const deletequestion = async (id) => {
    try {
      // await axios.delete(`http://192.168.43.97:3000/questions/${questionId}`);// id حذف السؤال حسيب ال 
      await axios.delete(`http://192.168.43.131:8000/admin/questions/delete/${id}`);
      setQuizzes(quizzes.filter((quiz) => quiz.id !== id));
    } catch (err) {
      console.log(err);
    }
  };
  
  const datashow=quizzes?.map((i,index)=> 
  <tr key={i.id}>
  <td className="tdQu" >
    {index+1}
  </td>
  <td className="tdQu" >
  {i.question}
    </td>
  <td className="tdQu" >
  {i.option1}
  </td>
  <td className="tdQu">
    {i.option2}
  </td>
  <td className="tdQu" >
    {i.option3}
  </td>
  <td className="tdQu" >
    {i.option4}
  </td>
  <td className="tdQu" >
    {i.option5}
  </td>
  <td className="tdQu" >
    {i.answer}
  </td>
  <td className="tdQu bdelete">
    <button className="btnSub" onClick={()=>deletequestion(i.id)}>delete</button>
    <button className="btnSub" onClick={()=>handleUpdate(i.id)}>update</button>
  </td>
  {/* updateQuestion */}
  </tr>);


    
  return (
    <div>
     <div className="backgroundSubject">
      <div className="contSub2">
        <div className="h3M">
          <Link to="/DashBoard/TypeOfQuiz" className="btnBack">
           Back
          </Link>
          {/* <Link to={`/DashBoard/CreateQuestion/${testId}`} className="btnBack"> */}
          <Link to={`/DashBoard/CreateQuestion/${test_id}`} className="btnBack">
          add a question
          </Link>
          <h3 >:  اسئلة   الاختبار {test_id} </h3>
        </div>
        <div className="table-container">
        <table className="tabSQ">
          <thead>
            <th className="thQu"> # id </th>
            <th className="thQu"> Question </th>
            <th className="thQu"> Option  -1-</th>
            <th className="thQu"> Option  -2-</th>
            <th className="thQu"> Option  -3-</th>
            <th className="thQu"> Option  -4-</th>
            <th className="thQu"> Option  -5-</th>
            <th className="thQu"> Result </th>
            <th className="thQu"> Procedure </th>
          </thead>
          <tbody>
            {datashow}
          </tbody>
    </table>
    </div></div></div></div>
  );
};
export default ShowQuiz;