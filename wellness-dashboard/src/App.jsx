import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import AddPatientForm from "./components/AddPatientForm";
import { useState, useEffect } from "react";
import axios from "axios";
import Appointments from "./components/Appointments"; // You'll need to create this component

function App() {
  const [patients, setPatients] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const fetchPatients = async () => {
    try {
      const response = await axios.get("http://localhost:3000/patients");
      setPatients(response.data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handlePatientAdded = async (newPatient) => {
    await fetchPatients(); // Refresh the list after adding
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <div className="flex h-screen">
        {/* Add a persistent toggle button */}
        <button
          onClick={toggleSidebar}
          className={`fixed top-4 left-4 z-50 p-2 rounded bg-[#f0f7ff] text-[#2c5282] hover:bg-[#e1effe] transition-transform duration-300 ${
            isSidebarOpen ? 'hidden' : 'block'
          }`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div
          className={`transition-all duration-300 p-6 bg-gray-800 text-white overflow-auto ${
            isSidebarOpen ? "ml-64 w-[calc(100%-16rem)]" : "ml-16 w-[calc(100%-4rem)]"
          }`}
        >
          <Routes>
            <Route path="/" element={<Navigate to="/add-patient" />} />
            <Route path="/add-patient" element={<AddPatientForm onPatientAdded={handlePatientAdded} />} />
            <Route path="/patients" element={<Dashboard patients={patients} setPatients={setPatients} />} />
            <Route path="/appointments" element={<Appointments patients={patients} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
