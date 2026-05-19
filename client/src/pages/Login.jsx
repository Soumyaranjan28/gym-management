// import { Link } from "react-router-dom";

// function Login() {
//   return (
//     <div style={styles.page}>
//       <div style={styles.card}>
//         <h2>Login</h2>

//         <input placeholder="Email" />
//         <input type="password" placeholder="Password" />

//         <button>Login</button>

//         <p>
//           New user? <Link to="/register">Register</Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   page: {
//     height: "100vh",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     background: "#111"
//   },
//   card: {
//     width: "320px",
//     padding: "25px",
//     background: "#1e1e1e",
//     color: "#fff",
//     borderRadius: "8px",
//     display: "flex",
//     flexDirection: "column",
//     gap: "12px"
//   }
// };

// export default Login;
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { loginUser } from "../services/authService";

// function Login() {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     email: "",
//     password: ""
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async () => {
//     try {
//       const res = await loginUser(form);

//       // Save token
//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("role", res.data.role);

//       // Redirect based on role
//       if (res.data.role === "admin") {
//         navigate("/admin");
//       } else {
//         alert("Member login successful");
//       }
//     } catch (error) {
//       alert(error.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div style={styles.page}>
//       <div style={styles.card}>
//         <h2>Login</h2>

//         <input
//           name="email"
//           placeholder="Email"
//           onChange={handleChange}
//         />
//         <input
//           name="password"
//           type="password"
//           placeholder="Password"
//           onChange={handleChange}
//         />

//         <button onClick={handleSubmit}>Login</button>

//         <p>
//           New user? <Link to="/register">Register</Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   page: {
//     height: "100vh",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     background: "#111"
//   },
//   card: {
//     width: "320px",
//     padding: "25px",
//     background: "#1e1e1e",
//     color: "#fff",
//     borderRadius: "8px",
//     display: "flex",
//     flexDirection: "column",
//     gap: "12px"
//   }
// };

// export default Login;
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { loginUser } from "../services/authService";

// function Login() {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     email: "",
//     password: ""
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async () => {
//     try {
//       const res = await loginUser(form);

//       // Save auth data
//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("role", res.data.role);

//       // 🔀 Redirect based on role
//       if (res.data.role === "admin") {
//         navigate("/admin");
//       } else {
//         navigate("/member");
//       }
//     } catch (error) {
//       alert(error.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div style={styles.page}>
//       <div style={styles.card}>
//         <h2>Login</h2>

//         <input
//           name="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={handleChange}
//         />
//         <input
//           name="password"
//           type="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={handleChange}
//         />

//         <button onClick={handleSubmit}>Login</button>

//         <p>
//           New user? <Link to="/register">Register</Link>
//         </p>
//         <p style={{ fontSize: "12px", color: "#aaa" }}>
//   Admin and Members use the same login
// </p>

//       </div>
//     </div>

//   );
// }

// const styles = {
//   page: {
//     height: "100vh",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     background: "#111"
//   },
//   card: {
//     width: "320px",
//     padding: "25px",
//     background: "#1e1e1e",
//     color: "#fff",
//     borderRadius: "8px",
//     display: "flex",
//     flexDirection: "column",
//     gap: "12px"
//   }
// };

// export default Login;
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { loginUser } from "../services/authService";
// import "./Auth.css";

// function Login() {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ email: "", password: "" });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async () => {
//     try {
//       const res = await loginUser(form);
//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("role", res.data.role);

//       res.data.role === "admin"
//         ? navigate("/admin")
//         : navigate("/member");
//     } catch (err) {
//       alert("Invalid credentials");
//     }
//   };

//   return (
//     <div className="auth-wrapper">
//       <div className="auth-card">
//         <h2>eFitness</h2>
//         <p className="subtitle">Gym Management</p>

//         <input
//           name="email"
//           placeholder="Email"
//           onChange={handleChange}
//         />
//         <input
//           name="password"
//           type="password"
//           placeholder="Password"
//           onChange={handleChange}
//         />

//         <button onClick={handleSubmit}>Log in</button>

//         <p className="switch">
//           Don’t have an account? <Link to="/register">Register</Link>
//         </p>
//       </div>

//       <div className="auth-image">
//         <img
//           src="https://images.unsplash.com/photo-1599058917212-d750089bc07e"
//           alt="Fitness"
//         />
//       </div>
//     </div>
//   );
// }

// export default Login;
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { loginUser } from "../services/authService";
// import "./Auth.css";

// function Login() {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ email: "", password: "" });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async () => {
//     try {
//       const res = await loginUser(form);
//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("role", res.data.role);

//       res.data.role === "admin"
//         ? navigate("/admin")
//         : navigate("/member");
//     } catch (err) {
//       alert("Invalid credentials");
//     }
//   };

//   return (
//     <div className="auth-wrapper">
//       <div className="auth-card">
//         <h2>eFitness</h2>
//         <p className="subtitle">Gym Management</p>

//         <input
//           name="email"
//           placeholder="Email"
//           onChange={handleChange}
//         />
//         <input
//           name="password"
//           type="password"
//           placeholder="Password"
//           onChange={handleChange}
//         />

//         <button onClick={handleSubmit}>Log in</button>

//         <p className="switch">
//           Don’t have an account? <Link to="/register">Register</Link>
//         </p>
//       </div>

//       <div className="auth-image">
//         <img
//           src="https://images.unsplash.com/photo-1599058917212-d750089bc07e"
//           alt="Fitness"
//         />
//       </div>
//     </div>
//   );
// }

// export default Login;
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { loginUser } from "../services/authService";
// import "./Auth.css";

// function Login() {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [remember, setRemember] = useState(false);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async () => {
//     try {
//       const res = await loginUser(form);

//       console.log("LOGIN SUCCESS:", res.data); // debug

//       // ✅ ALWAYS store token properly
//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("role", res.data.role);

//       // ✅ Redirect
//       if (res.data.role === "admin") {
//         navigate("/admin");
//       } else {
//         navigate("/member");
//       }
//     } catch (err) {
//       console.log(err.response?.data);
//       alert("Invalid credentials");
//     }
//   };
//   return (
//     <div className="auth-wrapper">
//       <div className="auth-card">
//         <h1 className="brand">eFitness</h1>
//         <p className="subtitle">Smart Gym Management</p>

//         <div className="field">
//           <input
//             name="email"
//             placeholder="Email address"
//             value={form.email}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="field password-wrapper">
//           <input
//             name="password"
//             type={showPassword ? "text" : "password"}
//             placeholder="Password"
//             value={form.password}
//             onChange={handleChange}
//           />
//           <button
//             type="button"
//             className="toggle-btn"
//             onClick={() => setShowPassword(!showPassword)}
//           >
//             {showPassword ? "Hide" : "Show"}
//           </button>
//         </div>

//         <div className="options">
//           <label className="remember-me">
//             <input
//               type="checkbox"
//               checked={remember}
//               onChange={(e) => setRemember(e.target.checked)}
//             />
//             Remember me
//           </label>
//           <span className="forgot">Forgot password?</span>
//         </div>

//         <button className="login-btn" onClick={handleSubmit}>
//           Log in
//         </button>

//         <p className="switch">
//           Don’t have an account? <Link to="/register">Register</Link>
//         </p>
//       </div>

//       <div className="auth-image">
//         <div className="image-overlay" />
//         <img
//           src="https://images.unsplash.com/photo-1599058917212-d750089bc07e"
//           alt="Fitness"
//         />
//       </div>
//     </div>
//   );
// }

// export default Login;
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
