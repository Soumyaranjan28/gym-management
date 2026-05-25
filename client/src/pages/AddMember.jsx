// import { useState } from "react";
// import "../styles/AddMember.css";

// function AddMember() {

//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     address: "",
//     age: "",
//     weight: "",
//     emergencyContact: "",
//     membership: "Monthly",
//     username: "",
//     password: "",
//     admissionDate: "",
//   });

//   const [loading, setLoading] = useState(false);

//   // HANDLE INPUT CHANGE
//   const handleChange = (e) => {

//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // HANDLE SUBMIT
//   const handleSubmit = async (e) => {

//     e.preventDefault();

//     try {

//       setLoading(true);

//       const token = localStorage.getItem("token");

//       // ADMISSION DATE
//       const admission = new Date(formData.admissionDate);

//       // COPY DATE
//       const dueDate = new Date(admission);

//       // MEMBERSHIP LOGIC
//       if (formData.membership === "Monthly") {

//         dueDate.setMonth(dueDate.getMonth() + 1);

//       } else if (formData.membership === "Quarterly") {

//         dueDate.setMonth(dueDate.getMonth() + 3);

//       } else if (formData.membership === "Yearly") {

//         dueDate.setFullYear(
//           dueDate.getFullYear() + 1
//         );
//       }

//       // FINAL MEMBER DATA
//       const memberData = {
//         ...formData,
//         dueDate,
//       };

//       // API CALL
//       const response = await fetch(
//         "https://gym-backend-h2rw.onrender.com/api/admin/add-member",
//         {
//           method: "POST",

//           headers: {
//             "Content-Type": "application/json",

//             Authorization: `Bearer ${token}`,
//           },

//           body: JSON.stringify(memberData),
//         }
//       );

//       const data = await response.json();

//       if (response.ok) {

//         alert("Member Added Successfully");

//         console.log(data);

//         // RESET FORM
//         setFormData({
//           fullName: "",
//           email: "",
//           phone: "",
//           address: "",
//           age: "",
//           weight: "",
//           emergencyContact: "",
//           membership: "Monthly",
//           username: "",
//           password: "",
//           admissionDate: "",
//         });

//       } else {

//         alert(
//           data.message || "Failed to add member"
//         );
//       }

//     } catch (error) {

//       console.log(error);

//       alert("Server Error");

//     } finally {

//       setLoading(false);
//     }
//   };

//   return (

//     <div className="add-member-page">

//       {/* LEFT SIDE */}
//       <div className="member-left">

//         <div className="overlay"></div>

//         <div className="left-content">

//           <span className="badge">
//             Admin Panel
//           </span>

//           <h1>
//             ADD NEW
//             <span> MEMBER</span>
//           </h1>

//           <p>
//             Create gym member accounts manually
//             and provide login credentials directly
//             from admin dashboard.
//           </p>

//           <div className="stats">

//             <div className="stat-box">
//               <h2>24/7</h2>
//               <span>Support</span>
//             </div>

//             <div className="stat-box">
//               <h2>500+</h2>
//               <span>Members</span>
//             </div>

//             <div className="stat-box">
//               <h2>10+</h2>
//               <span>Trainers</span>
//             </div>

//           </div>
//         </div>
//       </div>

//       {/* RIGHT SIDE */}
//       <div className="member-right">

//         <div className="member-card">

//           <h1>Add New Member</h1>

//           <p>
//             Fill member details and generate
//             login credentials.
//           </p>

//           <form onSubmit={handleSubmit}>

//             <div className="input-grid">

//               {/* FULL NAME */}
//               <input
//                 type="text"
//                 name="fullName"
//                 placeholder="Full Name"
//                 value={formData.fullName}
//                 onChange={handleChange}
//                 required
//               />

//               {/* EMAIL */}
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email Address"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//               />

//               {/* PHONE */}
//               <input
//                 type="text"
//                 name="phone"
//                 placeholder="Phone Number"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 required
//               />

//               {/* AGE */}
//               <input
//                 type="number"
//                 name="age"
//                 placeholder="Age"
//                 value={formData.age}
//                 onChange={handleChange}
//                 required
//               />

//               {/* WEIGHT */}
//               <input
//                 type="number"
//                 name="weight"
//                 placeholder="Weight (kg)"
//                 value={formData.weight}
//                 onChange={handleChange}
//                 required
//               />

//               {/* EMERGENCY CONTACT */}
//               <input
//                 type="text"
//                 name="emergencyContact"
//                 placeholder="Emergency Contact"
//                 value={formData.emergencyContact}
//                 onChange={handleChange}
//                 required
//               />

//               {/* ADDRESS */}
//               <textarea
//                 name="address"
//                 placeholder="Full Address"
//                 value={formData.address}
//                 onChange={handleChange}
//                 required
//               ></textarea>

//               {/* MEMBERSHIP */}
//               <select
//                 name="membership"
//                 value={formData.membership}
//                 onChange={handleChange}
//               >
//                 <option value="Monthly">
//                   Monthly
//                 </option>

//                 <option value="Quarterly">
//                   Quarterly
//                 </option>

//                 <option value="Yearly">
//                   Yearly
//                 </option>
//               </select>

//               {/* USERNAME */}
//               <input
//                 type="text"
//                 name="username"
//                 placeholder="Member ID / Username"
//                 value={formData.username}
//                 onChange={handleChange}
//                 required
//               />

//               {/* PASSWORD */}
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//               />

//               {/* ADMISSION DATE */}
//               <input
//                 type="date"
//                 name="admissionDate"
//                 value={formData.admissionDate}
//                 onChange={handleChange}
//                 required
//               />

//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//             >
//               {loading
//                 ? "Adding Member..."
//                 : "Add Member"}
//             </button>

//           </form>

//         </div>
//       </div>
//     </div>
//   );
// }

// export default AddMember;
import { useState } from "react";

import AdminLayout from "../components/AdminLayout";

import "../styles/AddMember.css";

function AddMember() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    age: "",
    weight: "",
    emergencyContact: "",
    membership: "Monthly",
    username: "",
    password: "",
    admissionDate: "",
  });

  const [loading, setLoading] = useState(false);

  // HANDLE INPUT
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // HANDLE SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      // ADMISSION DATE
      const admission = new Date(formData.admissionDate);

      // COPY DATE
      const dueDate = new Date(admission);

      // MEMBERSHIP LOGIC
      if (formData.membership === "Monthly") {
        dueDate.setMonth(dueDate.getMonth() + 1);
      } else if (formData.membership === "Quarterly") {
        dueDate.setMonth(dueDate.getMonth() + 3);
      } else if (formData.membership === "Yearly") {
        dueDate.setFullYear(dueDate.getFullYear() + 1);
      }

      // FINAL DATA
      const memberData = {
        ...formData,
        dueDate,
      };

      // API CALL
      const response = await fetch("https://gym-backend-h2rw.onrender.com/api/member/add", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(memberData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Member Added Successfully");

        // RESET FORM
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          address: "",
          age: "",
          weight: "",
          emergencyContact: "",
          membership: "Monthly",
          username: "",
          password: "",
          admissionDate: "",
        });
      } else {
        alert(data.message || "Failed to add member");
      }
    } catch (error) {
      console.log(error);

      alert("Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="add-member-page">
        {/* LEFT SIDE */}

        <div className="member-left">
          <div className="overlay"></div>

          <div className="left-content">
            <h1>
              ADD NEW
              <span> MEMBER</span>
            </h1>

            <p>
              Create gym member accounts manually and provide login credentials
              directly from admin dashboard.
            </p>

            <div className="stats">
              <div className="stat-box">
                <h2>24/7</h2>

                <span>Support</span>
              </div>

              <div className="stat-box">
                <h2>500+</h2>

                <span>Members</span>
              </div>

              <div className="stat-box">
                <h2>10+</h2>

                <span>Trainers</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}

        <div className="member-right">
          <div className="member-card">
            <h1>Add New Member</h1>

            <p>Fill member details and generate login credentials.</p>

            <form onSubmit={handleSubmit}>
              <div className="input-grid">
                {/* FULL NAME */}
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />

                {/* EMAIL */}
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

                {/* PHONE */}
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />

                {/* AGE */}
                <input
                  type="number"
                  name="age"
                  placeholder="Age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                />

                {/* WEIGHT */}
                <input
                  type="number"
                  name="weight"
                  placeholder="Weight (kg)"
                  value={formData.weight}
                  onChange={handleChange}
                  required
                />

                {/* EMERGENCY CONTACT */}
                <input
                  type="text"
                  name="emergencyContact"
                  placeholder="Emergency Contact"
                  value={formData.emergencyContact}
                  onChange={handleChange}
                  required
                />

                {/* ADDRESS */}
                <textarea
                  name="address"
                  placeholder="Full Address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                ></textarea>

                {/* MEMBERSHIP */}
                <select
                  name="membership"
                  value={formData.membership}
                  onChange={handleChange}
                >
                  <option value="Monthly">Monthly</option>

                  <option value="Quarterly">Quarterly</option>

                  <option value="Yearly">Yearly</option>
                </select>

                {/* USERNAME */}
                <input
                  type="text"
                  name="username"
                  placeholder="Member Username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />

                {/* PASSWORD */}
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                {/* ADMISSION DATE */}
                <input
                  type="date"
                  name="admissionDate"
                  value={formData.admissionDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" disabled={loading}>
                {loading ? "Adding Member..." : "Add Member"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AddMember;
