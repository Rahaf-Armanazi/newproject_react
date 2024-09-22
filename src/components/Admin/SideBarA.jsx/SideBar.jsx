import React   from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileAlt,
  faClipboard,
  faBook,
  faUsers,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import "./SideBarA.css";
import { Link } from "react-router-dom";
const Sidebar = () => {
  // const [openSubmenus, setOpenSubmenus] = useState({});
  const menuItems = [
    {
      icon: faFileAlt,
      text: "دورات الامتحانات الوطنية",
      link: "Exams",
    },
    {
      icon: faClipboard,
      text: "الاختبارات",
      link: "TypeOfQuiz"
    },
    {
      icon: faBook,
      text:" المواد الدراسية ",
      link: "Subject"
    },
    {
      icon: faUsers,
      text: "الطُلاب",
      link: "Students"
    },
  ];
  return (
    <div className="main-menu">
      <div className="main-menu-content">
        <ul className="menu-list">
          {menuItems.map((item, index) => (
            <li key={index} className="menu-item dropdown">
              <FontAwesomeIcon icon={item.icon} className="icon" />
                    <Link to={item.link} key={index} className="submenu-item">
                      <div className="sa">{item.text}</div>
                    </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default Sidebar;