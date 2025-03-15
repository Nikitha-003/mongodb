import React, { useState, useEffect } from 'react';

const Appointments = ({ patients }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentAppointments, setCurrentAppointments] = useState([]);

  // Format date function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  useEffect(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    const allAppointments = patients.reduce((acc, patient) => {
      const patientAppointments = patient.appointments?.map(appointment => ({
        ...appointment,
        patientName: patient.name,
        patientId: patient.patient_id,
        formattedDate: formatDate(appointment.date)
      })) || [];
      return [...acc, ...patientAppointments];
    }, []);

    // Filter out past appointments but keep today's appointments
    const futureAppointments = allAppointments.filter(appointment => {
      const appointmentDate = new Date(appointment.date);
      appointmentDate.setHours(0, 0, 0, 0);
      return appointmentDate >= now;
    });

    // Sort remaining appointments by date
    const sortedAppointments = futureAppointments.sort((a, b) => 
      new Date(a.date) - new Date(b.date)
    );

    setCurrentAppointments(sortedAppointments);
  }, [patients]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Appointments Schedule</h1>
      
      <div className="bg-gray-800 rounded-lg shadow-lg p-6">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-900">
              <th className="p-3 text-left border border-gray-700">Date</th>
              <th className="p-3 text-left border border-gray-700">Patient ID</th>
              <th className="p-3 text-left border border-gray-700">Patient Name</th>
              <th className="p-3 text-left border border-gray-700">Doctor</th>
              <th className="p-3 text-left border border-gray-700">Department</th>
            </tr>
          </thead>
          <tbody>
            {currentAppointments.map((appointment, index) => (
              <tr key={index} className="border-b border-gray-700">
                <td className="p-3 border border-gray-700">{appointment.formattedDate}</td>
                <td className="p-3 border border-gray-700">{appointment.patientId}</td>
                <td className="p-3 border border-gray-700">{appointment.patientName}</td>
                <td className="p-3 border border-gray-700">{appointment.doctor}</td>
                <td className="p-3 border border-gray-700">{appointment.department}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {currentAppointments.length === 0 && (
          <div className="text-center py-4 text-gray-400">
            No upcoming appointments
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointments;