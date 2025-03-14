import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ isOpen, setIsOpen }) => {
  return (
    <div className={`h-screen fixed top-0 left-0 bg-gray-900 text-white transition-all duration-300 flex flex-col ${isOpen ? "w-64" : "w-16"}`}>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 bg-gray-700 hover:bg-gray-600 text-center"
      >
        {isOpen ? "←" : "→"}
      </button>

      {/* Sidebar Links (Hidden when collapsed) */}
      <ul className={`mt-6 space-y-4 px-4 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <li>
          <NavLink
            to="/add-patient"
            className={({ isActive }) => `block p-2 rounded transition ${isActive ? "bg-gray-700" : "hover:bg-gray-700"}`}
          >
            Add Patient
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/patients"
            className={({ isActive }) => `block p-2 rounded transition ${isActive ? "bg-gray-700" : "hover:bg-gray-700"}`}
          >
            Patient Records
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
