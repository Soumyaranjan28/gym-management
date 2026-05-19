import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import "../styles/Register.css";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",

    email: "",

    phone: "",

    address: "",

    age: "",

    weight: "",

    emergencyContact: "",

    membership: "Monthly",

    admissionDate: "",

    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const admission = new Date(form.admissionDate);

    const dueDate = new Date(admission);

    if (form.membership === "Monthly") {
      dueDate.setMonth(dueDate.getMonth() + 1);
    } else if (form.membership === "Quarterly") {
      dueDate.setMonth(dueDate.getMonth() + 3);
    } else if (form.membership === "Yearly") {
      dueDate.setFullYear(dueDate.getFullYear() + 1);
    }

    // 👇 SEND DATA

    const memberData = {
      ...form,

      admissionDate: form.admissionDate,

      dueDate,
    };
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(memberData),
      });

      const data = await response.json();

      alert(data.message);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="register-page">
      {/* LEFT SECTION */}
      <div className="register-left">
        <div className="overlay"></div>

        <div className="left-content">
          <h1>
            BUILD YOUR
            <span> DREAM BODY</span>
          </h1>

          <p>
            Join our premium gym with expert trainers, modern equipment and
            transformation programs.
          </p>

          <div className="features">
            <div>✔ Expert Trainers</div>
            <div>✔ Modern Equipment</div>
            <div>✔ Flexible Membership</div>
          </div>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="register-right">
        <div className="register-card">
          <h1>Create Account</h1>

          <p>Start your fitness journey today.</p>

          {/* IMPORTANT */}
          <form onSubmit={handleSubmit} className="register-form">
            <div className="input-grid">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                required
              />

              <input
                type="number"
                name="age"
                placeholder="Age"
                value={form.age}
                onChange={handleChange}
                required
              />

              <input
                type="number"
                name="weight"
                placeholder="Weight (kg)"
                value={form.weight}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="emergencyContact"
                placeholder="Emergency Contact Number"
                value={form.emergencyContact}
                onChange={handleChange}
                required
              />
              <input
                type="date"
                name="admissionDate"
                value={form.admissionDate}
                onChange={handleChange}
                required
              />

              <textarea
                name="address"
                placeholder="Full Address"
                value={form.address}
                onChange={handleChange}
                required
              ></textarea>

              <select
                name="membership"
                value={form.membership}
                onChange={handleChange}
              >
                <option value="Monthly">Monthly Membership</option>

                <option value="Quarterly">Quarterly Membership</option>

                <option value="Yearly">Yearly Membership</option>
              </select>
            </div>
            <input
              className="DD"
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />

            <button type="submit">Create Account</button>
          </form>
          <div className="login-link">
            Already have an account?
            <Link to="/login"> Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
