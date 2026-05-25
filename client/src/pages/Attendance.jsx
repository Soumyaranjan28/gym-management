import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/attendance.css";

function Attendance() {

  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/attendance/all"
      );

      setAttendance(res.data.attendance);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="attendance-page">

      <h1>Attendance History</h1>

      <div className="attendance-table">

        <table>

          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Date</th>
              <th>Check In</th>
            </tr>
          </thead>

          <tbody>

            {attendance.map((item, index) => (

              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.date}</td>
                <td>{item.checkInTime}</td>
              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Attendance;