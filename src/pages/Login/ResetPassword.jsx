// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate , useParams } from "react-router";
// import "./login.css"

// const ResetPassword = () => {
//   const [password, setnewp] = useState("");
//   const [passwordConfirmation, setconf] = useState("");
//   const [email,setEmail] =useState("");
//   const nav=useNavigate();
//   const { token } = useParams();

//   async function submit(e) {
//     e.preventDefault();
    
//     // تأكد من تطابق كلمات المرور قبل إرسال الطلب
//     if (password !== passwordConfirmation) {
//       alert("Passwords do not match!");
//       return;
//     }

//     try {
//       let res = await axios.post(`http://192.168.43.131:8000/api/password/reset/${token}`, {
//         email: email,
//     password: password,
//     password_confirmation: passwordConfirmation,
    
//       }, {
//         headers: {
//           'Authorization': `Bearer ${"yourToken"}` // استبدل yourToken بالتوكن الصحيح إذا كان ذلك مطلوبًا
//         }
//       });
//       console.log(res.status);
//       if (res.status === 200) {
//         alert("Password reset successfully!");
//         nav('/login');

//         // يمكنك إضافة توجيه هنا بعد نجاح إعادة تعيين كلمة المرور
//       }
//     } catch (err) {
//       console.log(err);
//       alert("An error occurred while resetting the password.");
//     }
//   }

//   return (
//     <>
//       <div className="resettt">
//         <div>
//           <h2 className="h2res">Create a new password</h2>
//           <div className="input-box">
//             <input className="inRese"
//               type="password"
//               id="pass"
//               required
//               value={password}
//               onChange={(event) => setnewp(event.target.value)}
//             />
//             <label htmlFor="pass" className="labin">Enter new password</label>
//           </div>
//           <div className="input-box">
//             <input className="inRese"
//               type="password"
//               id="conp"
//               required
//               value={passwordConfirmation}
//               onChange={(event) => setconf(event.target.value)}
//             />
//             <label htmlFor="conp" className="labin">Confirm Password</label>
//           </div>
//           <div className="input-box">
//             <input className="inRese"
//               type="email"
//               id="email"
//               required
//               value={email}
//               onChange={(event) => setEmail(event.target.value)}
//             />
//             <label htmlFor="conp" className="labin">enter your email</label>
//           </div>
//           <button type="submit" className="btn" onClick={(e) => submit(e)}>
//             Submit
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ResetPassword;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate , useParams } from "react-router";
import "./login.css"

const ResetPassword = () => {
  const [password, setNewPassword] = useState("");
  const [password_confirmation, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { token } = useParams();

  async function submit(e) {
    e.preventDefault();
    
    // تأكد من تطابق كلمات المرور قبل إرسال الطلب
    // if (password !== password_confirmation) {
    //   alert("Passwords do not match!");
    //   return;
    // }

    try {
      let res = await axios.post(`http://192.168.43.131:8000/api/password/reset/${token}`, {
        email: email,
        password: password,
        password_confirmation: password_confirmation,
      });
console.log(res.data);
      if (res.status === 200) {
        alert("Password reset successfully!");
        navigate('/login');
      }
    } catch (err) {
      console.log(err);
      // alert("An error occurred while resetting the password.");
    }
  }

  return (
    <div className="resettt">
      <div>
        <h2 className="h2res">Create a new password</h2>
        <div className="input-box">
          <input className="inRese"
            type="password"
            id="pass"
            required
            value={password}
            onChange={(event) => setNewPassword(event.target.value)}
          />
          <label htmlFor="pass" className="labin">Enter new password</label>
        </div>
        <div className="input-box">
          <input className="inRese"
            type="password"
            id="conp"
            required
            value={password_confirmation}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
          <label htmlFor="conp" className="labin">Confirm Password</label>
        </div>
        <div className="input-box">
          <input className="inRese"
            type="email"
            id="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <label htmlFor="conp" className="labin">enter your email</label>
        </div>
        <button type="submit" className="btn" onClick={(e) => submit(e)}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
