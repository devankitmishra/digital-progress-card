import React from 'react';
import { NavLink } from 'react-router-dom';

const Settings = () => {
  return (
    <div className=" p-4 left-0">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <div className="flex flex-col gap-4">
        <NavLink
          to="/settings/account"
          className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300  hover:text-black"

        >
          <h2 className="text-xl font-semibold mb-2">Account Settings</h2>
          
        </NavLink>
        {/* <NavLink
          to="/settings/personalize"
          className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
        >
          <h2 className="text-xl font-semibold mb-2">Personalize Settings</h2>
          
        </NavLink> */}
        {/* <NavLink
          to="/settings"
          className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
        >
          <h2 className="text-xl font-semibold mb-2">Other Settings</h2>
          
        </NavLink> */}
      </div>
    </div>
  );
};

export default Settings;
