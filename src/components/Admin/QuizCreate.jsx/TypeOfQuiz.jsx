import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../QuizCreate.jsx/Type.css";
import Cookie from "cookie-universal";

const TypeOfQuiz = () => {
  const cookie = Cookie();
  const [showModal, setShowModal] = useState(false);
  const [name, setTestName] = useState("");
  // جلب الـ id من الكوكيز
  const userId = cookie.get("id_admin");
// console.log(userId);
  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  async function handleSave(e) {
    e.preventDefault();
    if (name) {
      try {
        axios.defaults.withCredentials = true;
        let res = await axios.post(
          "http://192.168.43.131:8000/admin/tests/store",
          {
            name,
            id_admin: userId, // تمرير id المستخدم إلى الباكند
          },
          {
            withCredentials: true // تأكد من إرسال ملفات تعريف الارتباط
          }
        );
        let test_id = res.data.data;
        window.location.href = `/DashBoard/CreateQuestion/${test_id}`;
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("يرجى إدخال اسم الاختبار.");
    }
  }

  // عرض الاختبارات من الداتا
  const [types, setTypes] = useState([]);
  useEffect(() => {
    const getType = async () => {
      await axios
        .get("http://192.168.43.131:8000/admin/tests")
        .then((response) => {
          setTypes(response.data);
        });
    };
    getType();
  }, []);

  ///////      delete      ///////////
  const deletetest = async (id) => {
    try {
      await axios.delete(`http://192.168.43.131:8000/admin/tests/delete/${id}`);
      setTypes(types.filter((type) => type.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  ///////       show       ///////////
  const showtests = types?.map((i, index) => (
    <div key={i.id}>
      <li className="ulShid">{index + 1}</li>
      <li className="ulShname">{i.name}</li>
      <li className="ulSh">
        <Link to={`/DashBoard/ShowQuiz/${i.id}`} className="btntypes">
          show
        </Link>
      </li>
      <li className="ulSh">
        <button className="btntypes" onClick={() => deletetest(i.id)}>
          delete
        </button>
      </li>
    </div>
  ));

  return (
    <div>
      <div className="backgroundSubject">
        <div className="contType">
          <h2 className="h2test">the Tests</h2>
          <ul className="typeShow">{showtests}</ul>
          <p style={{ display: "flex", justifyContent: "space-between" }}>
            <Link to="#" className="btnBack22" onClick={handleOpenModal}>
              add a new test
            </Link>
            <Link to="/DashBoard/SearchQuistion" className="btnBack22">
              search for question
            </Link>
          </p>
        </div>
      </div>
      <div className="App">
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={handleCloseModal}>
                &times;
              </span>
              <p className="pnametest"> : أدخل اسم الاختبار </p>
              <input
                className="inputnametest"
                type="text"
                value={name}
                onChange={(e) => setTestName(e.target.value)}
              />
              <button className="btnnametest" onClick={handleSave}>
                حفظ
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TypeOfQuiz;
