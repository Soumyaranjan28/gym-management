
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser(form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      if (res.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/member");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="login-page">
      {/* LEFT SIDE */}
      <div className="login-left">
        <div className="overlay"></div>

        <div className="left-content">
          <span className="gym-badge">#1 Fitness Club</span>

          <h1>
            TRAIN <span>LIKE A</span> BEAST
          </h1>

          <p>
            Build strength, confidence and fitness with expert trainers and
            world-class equipment.
          </p>

          <div className="stats">
            <div className="stat-card">
              <h2>5K+</h2>
              <span>Members</span>
            </div>

            <div className="stat-card">
              <h2>20+</h2>
              <span>Trainers</span>
            </div>

            <div className="stat-card">
              <h2>10+</h2>
              <span>Years</span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="login-right">
        <div className="login-card">
          <div className="logo-area">
            <h1>eFitness</h1>
            <p>Smart Gym Management</p>
          </div>

          <h2>Welcome Back 👋</h2>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group password-group">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                className="show-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <div className="options">
              <label className="remember">
                <input type="checkbox" />
                Remember me
              </label>

              <span className="forgot">Forgot password?</span>
            </div>

            <button type="submit" className="login-btn2">
              Login
            </button>
          </form>

          <div className="register-text">
            Don’t have an account?
            <Link to="/register"> Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
