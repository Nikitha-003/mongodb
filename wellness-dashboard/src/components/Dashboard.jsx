const Dashboard = ({ patients }) => {
  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Patient Records</h1>
      <table className="w-full border-collapse border border-gray-600 shadow-lg">
        <thead>
          <tr className="bg-gray-900 text-white">
            <th className="border border-gray-600 p-3">ID</th>
            <th className="border border-gray-600 p-3">Name</th>
            <th className="border border-gray-600 p-3">Age</th>
            <th className="border border-gray-600 p-3">Gender</th>
            <th className="border border-gray-600 p-3">Medical History</th>
            <th className="border border-gray-600 p-3">Appointments</th>
            <th className="border border-gray-600 p-3">Diagnostics</th>
            <th className="border border-gray-600 p-3">Mental Health</th>
            <th className="border border-gray-600 p-3">Physiotherapy</th>
            <th className="border border-gray-600 p-3">Nutrition</th>
            <th className="border border-gray-600 p-3">Yoga</th>
          </tr>
        </thead>
        <tbody>
          {patients.length > 0 ? (
            patients.map((patient, index) => (
              <tr key={patient._id} className={`${index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"}`}>
                <td className="border border-gray-600 p-3">{patient.patient_id || "N/A"}</td>
                <td className="border border-gray-600 p-3">{patient.name || "N/A"}</td>
                <td className="border border-gray-600 p-3">{patient.age || "N/A"}</td>
                <td className="border border-gray-600 p-3">{patient.gender || "N/A"}</td>
                <td className="border border-gray-600 p-3">
                  {patient.medical_history?.length
                    ? patient.medical_history.map((entry, idx) => (
                        <div key={idx}>{entry.condition} (Diagnosed: {entry.diagnosed_on})</div>
                      ))
                    : "No History"}
                </td>
                <td className="border border-gray-600 p-3">
                  {patient.appointments?.length
                    ? patient.appointments.map((appt, idx) => (
                        <div key={idx}>{appt.date} - {appt.doctor} ({appt.department})</div>
                      ))
                    : "No Appointments"}
                </td>
                <td className="border border-gray-600 p-3">
                  {patient.diagnostics?.length
                    ? patient.diagnostics.map((diag, idx) => (
                        <div key={idx}>{diag.test_name} ({diag.result} on {diag.date})</div>
                      ))
                    : "No Diagnostics"}
                </td>
                <td className="border border-gray-600 p-3">
                  {patient.mental_health?.length
                    ? patient.mental_health.map((mh, idx) => (
                        <div key={idx}>Therapist: {mh.therapist}, Eval: {mh.evaluation}</div>
                      ))
                    : "No Mental Health Records"}
                </td>
                <td className="border border-gray-600 p-3">
                  {patient.physiotherapy?.length
                    ? patient.physiotherapy.map((phy, idx) => (
                        <div key={idx}>Progress: {phy.progress_log} ({phy.session_date})</div>
                      ))
                    : "No Physiotherapy"}
                </td>
                <td className="border border-gray-600 p-3">
                  {patient.nutrition?.length
                    ? patient.nutrition.map((nut, idx) => (
                        <div key={idx}>Diet: {nut.dietary_plan}, Calories: {nut.calorie_intake}</div>
                      ))
                    : "No Nutrition Data"}
                </td>
                <td className="border border-gray-600 p-3">
                  {patient.yoga?.length
                    ? patient.yoga.map((yg, idx) => (
                        <div key={idx}>Plan: {yg.session_plan}, Wearable: {yg.wearable_data}</div>
                      ))
                    : "No Yoga Data"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="11" className="text-center p-4">No patient data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
