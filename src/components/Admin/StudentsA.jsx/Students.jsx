import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Student.css";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://192.168.43.131:8000/admin/students");
        setStudents(response.data);
        students.map((std)=>{
          console.log(std.tests);
        })
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchStudents();
  }, []);

  // Toggle selection
  const toggleSelectStudent = (id) => {
    setSelectedStudents((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((studentId) => studentId !== id)
        : [...prevSelected, id]
    );
  };

  // Delete selected students
  const deleteSelectedStudents = async () => {
    try {
      // إرسال طلب حذف واحد يحتوي على معرفات الطلاب المحددين
      await axios.delete('http://192.168.43.131:8000/admin/students/delete', {
        data: { student_ids: selectedStudents }
      });

      // تحديث قائمة الطلاب بعد الحذف
      setStudents(students.filter((student) => !selectedStudents.includes(student.id)));
      setSelectedStudents([]); // مسح قائمة الطلاب المحددين
    } catch (err) {
      console.log(err);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  const dataStudent = students.map((student) => (
    <tr key={student.id}>
      <td className="tdQu">{student.universityn}</td>
      <td className="tdQu">{student.name}</td>
      <td className="tdQu">{student.email}</td>
      <td className="tdQu">{formatDate(student.created_at)}</td>
      <td className="tdQu">{student.score}</td>
      <td className="tdSu">
        <input
          type="checkbox"
          checked={selectedStudents.includes(student.id)}
          onChange={() => toggleSelectStudent(student.id)}
        />
      </td>
    </tr>
  ));
  
  ///////////    start search   ////////////
  const [selectedOption, setSelectedOption] = useState("universityn");
  const [startDate, setInput1Value] = useState("");
  const [endDate, setInput2Value] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setInput1Value("");
    setInput2Value("");
  };

  const handleInputChange = (event, inputNumber) => {
    if (inputNumber === 1) {
      setInput1Value(event.target.value);
    } else {
      setInput2Value(event.target.value);
    }
  };

  const getInputTypes = () => {
    if (selectedOption === "universityn") {
      return { input1: "text", input2: "hidden" ,label1:"University ID" ,placeholder1:"Enter the university ID"};
    } else if (selectedOption === "date") {
      return { input1: "text", input2: "text" ,label1:"Start Date" ,placeholder1:"yyyy-mm-dd" ,label2:"End Date" ,placeholder2:"yyyy-mm-dd"  };
    }
    return { input1: "text", input2: "hidden",placeholder1:"Enter the university ID" }; // Default case
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (selectedOption === "universityn") {
        res = await axios.get(`http://192.168.43.131:8000/admin/students/search/${startDate}`);
      } else if (selectedOption === "date") {
        res = await axios.get(`http://192.168.43.131:8000/admin/students/search/${startDate}/${endDate}`);
      }
      setStudents(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const inputTypes = getInputTypes();
  /////////    end search     ///////

  return (
    <div className="backgroundStudent">
      <div className="contStudent">
        <div className="h3M">
          <Link to="/DashBoard" className="btnBackSubject">
            Back
          </Link>
          <h3>: بيانات الطلاب المشتركين</h3>
        </div>
        {/* ///////////    start search   //////////// */}
        <form className="forStudent" onSubmit={handleSubmit}>
          <div className="formSub">
            <div className="consearch">
              <div className="type">
                <label htmlFor="options" className="labStudent">Type Input</label>
                <select id="options" value={selectedOption} onChange={handleOptionChange} className="inputStudents">
                  <option value="universityn">University ID</option>
                  <option value="date">Date</option>
                </select>
              </div>
              <div className="type">
                <label className="labStudent">{inputTypes.label1}</label>
                <input
                  className="inputStudents"
                  type={inputTypes.input1}
                  placeholder={inputTypes.placeholder1}
                  value={startDate}
                  onChange={(event) => handleInputChange(event, 1)}
                />
              </div>
              {selectedOption === "date" && (
                <div className="type">
                  <label className="labStudent">{inputTypes.label2}</label>
                  <input
                    className="inputStudents"
                    type={inputTypes.input2}
                    placeholder={inputTypes.placeholder2}
                    value={endDate}
                    onChange={(event) => handleInputChange(event, 2)}
                  />
                </div>
              )}
            </div>
            <button type="submit" className="send">Search</button>
          </div>
        </form>
        {/*//////////  end search   ///////////*/}
        <h3 className="h3Mm">: جميع الطلاب </h3>
        <div className="table_container_student">
          <table className="tabStudent">
            <thead>
              <tr>
                <th className="thSu">University ID</th>
                <th className="thSu">Full Name</th>
                <th className="thSu">Email</th>
                <th className="thSu">Date of Registration</th>
                <th className="thSu">Score</th>
                <th className="thSu">Select</th>
              </tr>
            </thead>
            <tbody>{dataStudent}</tbody>
          </table>
        </div>
        <button onClick={deleteSelectedStudents} className="selected">Delete Selected</button>
      </div>
    </div>
  );
};

export default Students;