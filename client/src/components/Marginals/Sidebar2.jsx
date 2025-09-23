import React, { useState } from 'react'
import { BarChart, Wallet, Medal, Brush, Wrench, LogOut, Headset, BellRing } from 'lucide-react'
import useAuth from '../Auth/useAuth'
import { NavLink } from 'react-router-dom'
import UserProfile from './UserProfile'

const Sidebar2 = ({user}) => {
  const {logout} = useAuth();

    const [sidebarOn,setSidebarOn] = useState(false)
    const toggleSidebar= ()=>{
      setSidebarOn((lastState)=>!lastState)
    }
    
  return (
    <>
    <img title='menu' onClick={toggleSidebar} className='absolute top-0 left-0 p-2 cursor-pointer' width="64" height="64" src="https://img.icons8.com/laces/64/FFFFFF/menu.png" alt="menu"/>
    <aside className={`sidebar ${sidebarOn?'open':''} flex h-screen flex-col overflow-y-auto border-r bg-white px-5 py-8`}>
    <img onClick={toggleSidebar} className='absolute top-6 right-0 cursor-pointer' width="30" height="30" src="https://img.icons8.com/plumpy/30/back--v1.png" alt="close"/>

    <UserProfile toggleSidebar={toggleSidebar} user={user}/>
    <div className="sidebar-box mx-auto mt-6 flex flex-1 flex-col justify-between">
      <nav className="-mx-3 space-y-6 ">
        <div className="space-y-3 ">
          <label className="px-3 text-xs font-semibold uppercase text-gray-900">analytics</label>
          <NavLink
           onClick={toggleSidebar}
            className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
            to="/"
          >
            <BarChart className="h-5 w-5" aria-hidden="true" />
            <span className="mx-2 text-sm font-medium">Dashboard</span>
          </NavLink>
          <NavLink
           onClick={toggleSidebar}
            className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
            to="/task"
          >
            <Wallet className="h-5 w-5" aria-hidden="true" />
            <span className="mx-2 text-sm font-medium">Task</span>
          </NavLink>

          <NavLink
           onClick={toggleSidebar}
            className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
            to="/rewards"
          >
            <Medal className="h-5 w-5" aria-hidden="true" />
            <span className="mx-2 text-sm font-medium">Rewards</span>
          </NavLink>
          <NavLink
           onClick={toggleSidebar}
            className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
            to="/settings/account"
          >
            {/* <BellRing className="h-5 w-5" aria-hidden="true" />  */}
            <Wrench className="h-5 w-5" aria-hidden="true" />
            {/* <Brush className="h-5 w-5" aria-hidden="true" />  */}
            <span className="mx-2 text-sm font-medium">Settings</span>
          </NavLink>
        </div>
        {/* <div className="space-y-3 ">
          <label className="px-3 text-xs font-semibold uppercase text-gray-900"></label>
          
        </div> */}

        <div className="space-y-3 ">
          <label className="px-3 text-xs font-semibold uppercase text-gray-900">
            Support
          </label>

          <NavLink
           onClick={toggleSidebar}
            className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
            to="/contact-us"
          >
            <Headset className="h-5 w-5" aria-hidden="true" />
            <span className="mx-2 text-sm font-medium">Contact us</span>
          </NavLink>

          <NavLink
           onClick={logout}
            className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
          >
            <LogOut className="h-5 w-5" aria-hidden="true" />
            <span className="mx-2 text-sm font-medium">Logout</span>
          </NavLink>
          
        </div>
      </nav>
    </div>
  </aside>
  </>
  )
}

export default Sidebar2