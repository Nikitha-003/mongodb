import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import AddPatientForm from "./components/AddPatientForm";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [patients, setPatients] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:3000/patients").then((response) => {
      setPatients(response.data);
    });
  }, []);

  return (
    <Router>
      <div className="flex h-screen">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

        {/* Main Content Area */}
        <div
          className={`transition-all duration-300 p-6 bg-gray-800 text-white overflow-auto ${
            isSidebarOpen ? "ml-64 w-[calc(100%-16rem)]" : "ml-16 w-[calc(100%-4rem)]"
          }`}
        >
          <Routes>
            <Route path="/" element={<Navigate to="/add-patient" />} />
            <Route path="/add-patient" element={<AddPatientForm />} />
            <Route path="/patients" element={<Dashboard patients={patients} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
