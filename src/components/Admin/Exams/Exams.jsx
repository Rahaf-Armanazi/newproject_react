import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookie from "cookie-universal";
import "./Exams.css";

const Exams = () => {
  // لحقل الادخال الخاص بالملف
  const [inputFile, setInputFile] = useState(null);
  // جلب الـ id من الكوكيز
  const cookie = Cookie();
  const userId = cookie.get("id_admin");
  const handleFileChange = (e) => {
    setInputFile(e.target.files[0]);
  };

  async function handleSave(e) {
    e.preventDefault();
    if (inputFile) {
      try {
        const formData = new FormData();
        formData.append('file', inputFile);
        formData.append('id_admin',userId);
        axios.defaults.withCredentials = true;
        let res = await axios.post(
          'http://192.168.43.131:8000/admin/nationalexams/store',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
          {
            withCredentials: true // تأكد من إرسال ملفات تعريف الارتباط
          }
        );
        console.log(res.status);
      } catch (error) {
        console.log(error);
      }
    }
  }

  // جلب البيانات
  const [showFiles, setShowFiles] = useState([]);
  useEffect(() => {
    const show = async () => {
      try {
        const result = await axios.get('http://192.168.43.131:8000/admin/nationalexams');
        setShowFiles(result.data);
        console.log(result.data);
      } catch (err) {
        console.log(err);
      }
    };
    show();
  }, []);

  /////// حذف ///////////
  const deleteFile = async (id) => {
    try {
      await axios.delete(`http://192.168.43.131:8000/admin/nationalexams/delete/${id}`);
      setShowFiles(showFiles.filter((file) => file.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const showExams = showFiles.map((file) => (
    <tr key={file.id}>
      <td className="td1 tdE">{file.name}</td>
      <td className="tdE">
        <button className="btnFile" onClick={() => deleteFile(file.id)}>
          حذف
        </button>
      </td>
    </tr>
  ));

  return (
    <div className="containerExam">
      <div className="counF">
        <h3 className="h3up">:ادخل ملف الامتحان</h3>
        <form className="f2" onSubmit={handleSave}>
          <input
            type="file"
            onChange={handleFileChange}
            className="inputfile"
          />
          <button className="btnFile tt" type="submit">
            تأكيد
          </button>
        </form>
        <h3 className="h3up">:الملفات المتوفرة</h3>
        <div className="cde">
        <table className="tablefile">
          <thead>
            <tr>
              <th className="tdF thEx">ملف الامتحان</th>
              <th className="thEx">الاجراءات الممكنة</th>
            </tr>
          </thead>
          <tbody>
            {showExams}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
};

export default Exams;

