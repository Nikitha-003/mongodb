import React, { useState } from "react";
import axios from "axios";

const AddPatientForm = ({ onPatientAdded }) => {
  const [patientData, setPatientData] = useState({
    patient_id: "",
    name: "",
    age: "",
    gender: "",
    medical_history: [{ condition: "", diagnosed_on: "" }],
    appointments: [{ date: "", doctor: "", department: "" }],
    diagnostics: [{ test_name: "", result: "", date: "" }],
    mental_health: [{ session_notes: "", evaluation: "", therapist: "" }],
    physiotherapy: [{ progress_log: "", session_date: "" }],
    nutrition: [{ dietary_plan: "", calorie_intake: "", progress: "" }],
    yoga: [{ session_plan: "", wearable_data: "" }],
  });

  const handleChange = (e, category, index, field) => {
    const updatedData = { ...patientData };
    if (category) {
      updatedData[category][index][field] = e.target.value;
    } else {
      updatedData[e.target.name] = e.target.value;
    }
    setPatientData(updatedData);
  };

  const addNewEntry = (category) => {
    setPatientData({
      ...patientData,
      [category]: [...patientData[category], {}],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/patients", patientData);
      console.log("Patient added:", response.data);
      setPatientData({
        patient_id: "",
        name: "",
        age: "",
        gender: "",
        medical_history: [{ condition: "", diagnosed_on: "" }],
        appointments: [{ date: "", doctor: "", department: "" }],
        diagnostics: [{ test_name: "", result: "", date: "" }],
        mental_health: [{ session_notes: "", evaluation: "", therapist: "" }],
        physiotherapy: [{ progress_log: "", session_date: "" }],
        nutrition: [{ dietary_plan: "", calorie_intake: "", progress: "" }],
        yoga: [{ session_plan: "", wearable_data: "" }],
      });
      
      onPatientAdded(); // 🔥 Fetch updated patients after adding
    } catch (error) {
      console.error("Error adding patient:", error);
    }
  };
  

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">Add New Patient</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-gray-800 p-6 rounded-lg shadow-lg">
        {/* Basic Details */}
        <div>
          <label className="block text-sm">Patient ID</label>
          <input type="text" name="patient_id" value={patientData.patient_id} onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white" required />
        </div>
        <div>
          <label className="block text-sm">Name</label>
          <input type="text" name="name" value={patientData.name} onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white" required />
        </div>
        <div>
          <label className="block text-sm">Age</label>
          <input type="number" name="age" value={patientData.age} onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white" required />
        </div>
        <div>
          <label className="block text-sm">Gender</label>
          <select name="gender" value={patientData.gender} onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white" required>
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        {/* Medical History */}
        <div>
          <label className="block text-sm">Medical History</label>
          {patientData.medical_history.map((entry, index) => (
            <div key={index} className="flex gap-2">
              <input type="text" placeholder="Condition" value={entry.condition} 
                onChange={(e) => handleChange(e, "medical_history", index, "condition")}
                className="p-2 rounded bg-gray-700 text-white" />
              <input type="date" value={entry.diagnosed_on} 
                onChange={(e) => handleChange(e, "medical_history", index, "diagnosed_on")}
                className="p-2 rounded bg-gray-700 text-white" />
            </div>
          ))}
          <button type="button" onClick={() => addNewEntry("medical_history")}
            className="text-blue-400 mt-2">+ Add More</button>
        </div>

        {/* Appointments */}
        <div>
          <label className="block text-sm">Appointments</label>
          {patientData.appointments.map((entry, index) => (
            <div key={index} className="flex gap-2">
              <input type="date" value={entry.date} 
                onChange={(e) => handleChange(e, "appointments", index, "date")}
                className="p-2 rounded bg-gray-700 text-white" />
              <input type="text" placeholder="Doctor" value={entry.doctor} 
                onChange={(e) => handleChange(e, "appointments", index, "doctor")}
                className="p-2 rounded bg-gray-700 text-white" />
              <input type="text" placeholder="Department" value={entry.department} 
                onChange={(e) => handleChange(e, "appointments", index, "department")}
                className="p-2 rounded bg-gray-700 text-white" />
            </div>
          ))}
          <button type="button" onClick={() => addNewEntry("appointments")}
            className="text-blue-400 mt-2">+ Add More</button>
        </div>

        {/* Diagnostics */}
        <div>
          <label className="block text-sm">Diagnostics</label>
          {patientData.diagnostics.map((entry, index) => (
            <div key={index} className="flex gap-2">
              <input type="text" placeholder="Test Name" value={entry.test_name} 
                onChange={(e) => handleChange(e, "diagnostics", index, "test_name")}
                className="p-2 rounded bg-gray-700 text-white" />
              <input type="text" placeholder="Result" value={entry.result} 
                onChange={(e) => handleChange(e, "diagnostics", index, "result")}
                className="p-2 rounded bg-gray-700 text-white" />
              <input type="date" value={entry.date} 
                onChange={(e) => handleChange(e, "diagnostics", index, "date")}
                className="p-2 rounded bg-gray-700 text-white" />
            </div>
          ))}
          <button type="button" onClick={() => addNewEntry("diagnostics")}
            className="text-blue-400 mt-2">+ Add More</button>
        </div>

        {/* Submit Button */}
        <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddPatientForm;
