import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      {/* Hamburger menu button for mobile */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-40 p-2 rounded bg-[#f0f7ff] text-[#2c5282] md:hidden hover:bg-[#e1effe]"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-[#f8fafc] transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out shadow-lg`}>
        <div className="flex items-center justify-between p-4 border-b border-[#e2e8f0] bg-[#f0f7ff]">
          <h1 className="text-xl font-bold text-[#2c5282]">Wellness System</h1>
          <button onClick={toggleSidebar} className="text-[#2c5282] hover:bg-[#e1effe] rounded p-1 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>

        {/* Sidebar Links */}
        <ul className="mt-6 space-y-4 px-4">
          <li>
            <NavLink
              to="/add-patient"
              className={({ isActive }) => `block p-2 rounded transition-colors ${isActive ? "bg-[#bfdbfe] text-[#1e3a8a]" : "text-[#2c5282] hover:bg-[#e1effe]"}`}
            >
              Add Patient
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/patients"
              className={({ isActive }) => `block p-2 rounded transition-colors ${isActive ? "bg-[#bfdbfe] text-[#1e3a8a]" : "text-[#2c5282] hover:bg-[#e1effe]"}`}
            >
              Patient Records
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/appointments"
              className={({ isActive }) => `block p-2 rounded transition-colors ${isActive ? "bg-[#bfdbfe] text-[#1e3a8a]" : "text-[#2c5282] hover:bg-[#e1effe]"}`}
            >
              Appointments
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-[#1e3a8a] bg-opacity-20 z-20 md:hidden backdrop-blur-sm"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
