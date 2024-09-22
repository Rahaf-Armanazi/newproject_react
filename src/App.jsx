import React from "react";
import { Routes, Route, useLocation } from "react-router";
import { Home } from "./pages/Home/Home";
import Header from "./components/Users/HeaderUser/Header";
import { Register } from "./pages/Register/Register";
import { Login } from "./pages/Login/Login";
import { Exam } from "./components/Users/ExamUser/Exam";
import "./App.css";
import { Quize } from "./components/Users/Quiz/Quize";
import PageOfQuizes from "./components/Users/Quiz/pageOfQuizes.jsx";
import Dashboard from "./pages/DashBoard/Dashboard";
import Exams from "./components/Admin/Exams/Exams";
import Subjects from "./components/Admin/SubjectsA.jsx/Subjects";
import Students from "./components/Admin/StudentsA.jsx/Students";
import CreateQuestion from "./components/Admin/QuizCreate.jsx/CreateQuestion";
import ShowSubjects from "./components/Admin/SubjectsA.jsx/ShowSubjects";
import ShowQuiz from "./components/Admin/QuizCreate.jsx/ShowQuiz";
import { Forgitpass } from "./pages/Login/Forgitpass";
import ResetPassword from "./pages/Login/ResetPassword";
import TypeOfQuiz from "./components/Admin/QuizCreate.jsx/TypeOfQuiz";
import { Logout } from "./pages/Logout/logout";
import UpdateQuestion from "./components/Admin/QuizCreate.jsx/UpdateQuestion";
import SearchQuistion from "./components/Admin/QuizCreate.jsx/SearchQuistion";
import { HeaderAdmin } from "./components/Admin/HeaderA.jsx/HeaderAdmin";
import SubjectUser from "./components/Users/Subjects/SubjectUser";
import LecturesOfSubject from "./components/Users/Subjects/LecturesOfSubject";

export default function App() {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/DashBoard");
  const isQuizeRoute = location.pathname.startsWith ("/test") ;

  return (
    <div>
      {!isQuizeRoute && (isAdminRoute ? <HeaderAdmin /> : <Header />)}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgetpass" element={<Forgitpass />} />
        <Route path="/resetpassword/:token" element={<ResetPassword />} />
        <Route path="/exam" element={<Exam />} />
        <Route path="/Subjects" element={<SubjectUser/>}/>
        <Route path="/LecturesOfSubject/:subject_name" element={<LecturesOfSubject/>}/>
        <Route path="/" element={<Logout />} />
        <Route path="/alltests" element={<PageOfQuizes />} />
        <Route path="/test/:test_id" element={<Quize/>}/>
        <Route path="/DashBoard" element={<Dashboard />}>
          <Route path="Exams" element={<Exams />} />
          <Route path="Subject" element={<Subjects />} />
          <Route path="Students" element={<Students />} />
          <Route path="TypeOfQuiz" element={<TypeOfQuiz />} />
          <Route path="SearchQuistion" element={<SearchQuistion />} />
          <Route path="CreateQuestion/:test_id" element={<CreateQuestion />} />
          <Route path="UpdateQuestion/:id" element={<UpdateQuestion />} />
          <Route path="ShowQuiz/:test_id" element={<ShowQuiz />} />
          <Route path="ShowSubjects" element={<ShowSubjects />} />
        </Route>
      </Routes>
    </div>
  );
}
