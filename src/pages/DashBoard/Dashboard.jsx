import React from 'react'
import { Outlet } from 'react-router'
import Sidebar from "../../components/Admin/SideBarA.jsx/SideBar"; 
const Dashboard = () => {
  return (
    <div className="dash">
      <div className='content-flex'>
      <Sidebar />
      <div className="image">
      <Outlet/> 
      </div>
      </div>
    </div>
  )
}
export default Dashboard