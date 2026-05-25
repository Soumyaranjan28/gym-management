import { useState, useEffect, useRef } from "react";
import "../styles/member-dashboard.css";
import MobileNavbar from "../components/MobileNavbar";
import axios from "axios";
import { 
  FiDroplet, 
  FiHeart, 
  FiZap, 
  FiClock, 
  FiPlay, 
  FiPause, 
  FiRotateCcw, 
  FiX, 
  FiCheck 
} from "react-icons/fi";
import { FaDumbbell, FaQuoteLeft, FaFire } from "react-icons/fa";
import { makePayment } from "../services/adminService";

// ================= WORKOUT DATABASE =================
const todayWorkout = [
  {
    day: "Monday",
    title: "Chest & Triceps",
    exercises: ["Bench Press", "Push Ups", "Chest Fly", "Tricep Dips"],
    image: "/images/chest.jpg",
  },
  {
    day: "Tuesday",
    title: "Cardio Day",
    exercises: ["Running", "Cycling", "Jump Rope", "Burpees"],
    image: "/images/cardio.jpg",
  },
  {
    day: "Wednesday",
    title: "Back & Biceps",
    exercises: ["Pull Ups", "Deadlift", "Barbell Row", "Bicep Curl"],
    image: "/images/back.jpg",
  },
  {
    day: "Thursday",
    title: "Rest Day 😴",
    exercises: ["Recovery", "Stretching", "Meditation"],
    image: "/images/rest.jpg",
  },
  {
    day: "Friday",
    title: "Leg Day",
    exercises: ["Squats", "Lunges", "Leg Press", "Calf Raises"],
    image: "/images/legs.jpg",
  },
  {
    day: "Saturday",
    title: "Shoulders",
    exercises: ["Shoulder Press", "Lateral Raise", "Front Raise"],
    image: "/images/shoulder.jpg",
  },
  {
    day: "Sunday",
    title: "Full Body",
    exercises: ["Push Ups", "Pull Ups", "Squats", "Plank"],
    image: "/images/fullbody.jpg",
  },
];

// Motivational Quotes
const fitnessQuotes = [
  "The only bad workout is the one that didn't happen. Make today count!",
  "Clear your mind of can't, and let the training do the talking.",
  "What hurts today makes you stronger tomorrow. Embrace the grind.",
  "Success starts with self-discipline. Stay consistent, stay driven.",
  "Your body can stand almost anything. It's your mind that you have to convince.",
  "Consistency is the key. Small daily improvements lead to massive results."
];

function MemberDashboard() {
  // ================= STATE MANAGEMENT =================
  const [user, setUser] = useState(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        return JSON.parse(userData);
      } catch (e) {
        console.error("Failed to parse user data", e);
      }
    }
    return { name: "Athlete", email: "" };
  });

  const [greeting] = useState(() => {
    const hrs = new Date().getHours();
    if (hrs < 12) return "Good Morning";
    if (hrs < 17) return "Good Afternoon";
    return "Good Evening";
  });

  const [water, setWater] = useState(2.5);
  const [calories, setCalories] = useState(1240);
  const [streak, setStreak] = useState(12);
  const [heartRate, setHeartRate] = useState(78);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  // Timer & Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeWorkout, setActiveWorkout] = useState(null);
  const [completedExercises, setCompletedExercises] = useState([]);
  const [workoutCompleted, setWorkoutCompleted] = useState(false);
  const [time, setTime] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const timerRef = useRef(null);

  // ================= DYNAMIC DATE HANDLING =================
  const todayName = new Date().toLocaleDateString("en-US", { weekday: "long" });

  // Rotate quotes
  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % fitnessQuotes.length);
    }, 15000);

    return () => clearInterval(quoteInterval);
  }, []);

  // Fluctuating Heartbeat simulation (alive page effect)
  useEffect(() => {
    const interval = setInterval(() => {
      setHeartRate((prev) => {
        const change = Math.floor(Math.random() * 5) - 2; // -2 to +2
        const next = prev + change;
        return next < 65 ? 65 : next > 95 ? 95 : next;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Stopwatch Logic
  useEffect(() => {
    if (timerActive) {
      timerRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [timerActive]);

  // Membership Validity days calculation (uses user.expiryDate or user.dueDate from state)
  const getExpiryDate = () => {
    if (user.expiryDate) return new Date(user.expiryDate);
    if (user.dueDate) return new Date(user.dueDate);
    // Dynamic default fallback so they have a nice VIP card starting state
    return new Date("2026-08-20");
  };

  const expiryDate = getExpiryDate();
  const today = new Date();
  const diffTime = Math.max(0, expiryDate - today);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const progressPercent = Math.min(100, Math.max(5, (diffDays / 365) * 100));

  // ================= FUNCTIONS =================
  // ================= FUNCTIONS =================
  const markAttendance = async () => {
    console.log("Attendance button clicked");
    try {
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("user");
      if (!userData) {
        alert("User not found. Please login again.");
        return;
      }
      const userObj = JSON.parse(userData);
      
      // Try Render server first, fallback to localhost:5000 if needed
      let res;
      try {
        res = await axios.post(
          "https://gym-backend-h2rw.onrender.com/api/attendance/mark",
          {
            memberId: userObj._id,
            name: userObj.name,
            email: userObj.email,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (err) {
        console.warn("Render server failing, trying local server for attendance");
        res = await axios.post(
          "http://localhost:5000/api/attendance/mark",
          {
            memberId: userObj._id,
            name: userObj.name,
            email: userObj.email,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
      
      if (res.data) {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Attendance failed");
    }
  };

  // Payment Option States & Functionality
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [paymentStep, setPaymentStep] = useState("select"); // select, qr, card, success
  const [selectedPlan, setSelectedPlan] = useState({ name: "Monthly Pass", price: 1500 });
  const [payMethod, setPayMethod] = useState("UPI");

  const handlePlanSelect = (name, price) => {
    setSelectedPlan({ name, price });
    setPaymentStep("method");
  };

  const handleProcessPayment = async () => {
    setPaymentStep("processing");
    try {
      const res = await makePayment({
        amount: selectedPlan.price,
        method: payMethod,
        planName: selectedPlan.name,
        userEmail: user.email,
        userId: user._id
      });
      
      if (res.data && res.data.success) {
        // Update user state and local storage with new expiry Date & Membership plan
        const updatedUser = {
          ...user,
          expiryDate: res.data.expiryDate,
          dueDate: res.data.expiryDate,
          membership: res.data.membership
        };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        
        // Show success step
        setPaymentStep("success");
      } else {
        alert("Payment registration failed on backend");
        setPaymentStep("method");
      }
    } catch (error) {
      console.error("Payment error: ", error);
      alert("Failed to submit payment. Please verify local server connectivity.");
      setPaymentStep("method");
    }
  };


  const handleStartTimer = () => setTimerActive(true);
  const handlePauseTimer = () => setTimerActive(false);
  const handleResetTimer = () => {
    setTimerActive(false);
    setTime(0);
  };

  const handleStartTraining = (workout) => {
    setActiveWorkout(workout);
    setCompletedExercises(new Array(workout.exercises.length).fill(false));
    setWorkoutCompleted(false);
    setTime(0);
    setTimerActive(true);
    setIsModalOpen(true);
  };

  const handleStartTodayWorkout = () => {
    const todayWorkoutObj = todayWorkout.find(w => w.day === todayName) || todayWorkout[0];
    handleStartTraining(todayWorkoutObj);
  };

  const toggleExercise = (index) => {
    setCompletedExercises((prev) => {
      const copy = [...prev];
      copy[index] = !copy[index];
      return copy;
    });
  };

  const allExercisesDone = completedExercises.length > 0 && completedExercises.every(item => item === true);

  const handleFinishWorkout = () => {
    setTimerActive(false);
    setWorkoutCompleted(true);
    setCalories((prev) => prev + 320);
    setStreak((prev) => prev + 1);
  };

  const formatTime = (totalSecs) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="member-dashboard">
      {/* ================= NAVBAR ================= */}
      <MobileNavbar />

      {/* ================= MOTIVATIONAL QUOTE ================= */}
      <div className="quote-container">
        <FaQuoteLeft className="quote-icon" />
        <span className="quote-text">{fitnessQuotes[currentQuoteIndex]}</span>
      </div>

      {/* ================= HERO ================= */}
      <div className="hero-card">
        <div>
          <h1>{greeting}, {user.name.split(" ")[0]}! 🔥</h1>
          <p>Train hard, stay strong, keep smashing your goals.</p>
        </div>
        <div className="hero-buttons">
          <button className="start-btn" onClick={handleStartTodayWorkout}>
            Start Today's Workout
          </button>
          <button className="attendance-btn" onClick={markAttendance}>
            Mark Attendance
          </button>
        </div>
      </div>

      {/* ================= STATS / METRICS ================= */}
      <div className="stats-container">
        {/* Calories Card */}
        <div className="stat-box">
          <div className="metric-header">
            <h3>Calories</h3>
            <FaFire className="metric-icon" />
          </div>
          <div className="metric-body">
            <span className="metric-value">{calories}</span>
            <span style={{ fontSize: "14px", color: "var(--text-muted)", marginLeft: "5px" }}>kcal</span>
          </div>
          <div className="metric-footer">
            Today's Burn
            <div className="stat-actions">
              <button className="action-btn" onClick={() => setCalories(prev => prev + 100)}>+100</button>
              <button className="action-btn minus" onClick={() => setCalories(prev => Math.max(0, prev - 100))}>-100</button>
            </div>
          </div>
        </div>

        {/* Water Card */}
        <div className="stat-box">
          <div className="metric-header">
            <h3>Water</h3>
            <FiDroplet className="metric-icon" />
          </div>
          <div className="metric-body">
            <span className="metric-value">{water.toFixed(2)}</span>
            <span style={{ fontSize: "14px", color: "var(--text-muted)", marginLeft: "5px" }}>L</span>
          </div>
          <div className="metric-footer">
            Daily Intake Goal
            <div className="stat-actions">
              <button className="action-btn" onClick={() => setWater(prev => prev + 0.25)}>+250ml</button>
              <button className="action-btn minus" onClick={() => setWater(prev => Math.max(0, prev - 0.25))}>-250ml</button>
            </div>
          </div>
        </div>

        {/* Heart Rate Card */}
        <div className="stat-box">
          <div className="metric-header">
            <h3>Heart Rate</h3>
            <FiHeart className="metric-icon" />
          </div>
          <div className="metric-body">
            <span className="metric-value">{heartRate}</span>
            <span style={{ fontSize: "14px", color: "var(--text-muted)", marginLeft: "5px" }}>bpm</span>
          </div>
          <div className="metric-footer">
            Realtime Pulse (Fluctuating)
          </div>
        </div>

        {/* Workout Streak Card */}
        <div className="stat-box">
          <div className="metric-header">
            <h3>Streak</h3>
            <FiZap className="metric-icon" />
          </div>
          <div className="metric-body">
            <span className="metric-value">{streak} Days</span>
          </div>
          <div className="metric-footer">
            Keep up the fire! 🔥
          </div>
        </div>
      </div>

      {/* ================= WEEKLY WORKOUT PLAN ================= */}
      <div className="section-title">
        <h2>Weekly Workout Schedule</h2>
      </div>

      <div className="workout-grid">
        {todayWorkout.map((workout, index) => {
          const isToday = workout.day === todayName;
          return (
            <div className={`workout-card ${isToday ? "is-today" : ""}`} key={index}>
              {isToday && <span className="today-badge">Active Today</span>}
              <div className="workout-image-container">
                <img src={workout.image} alt={workout.title} />
                <div className="workout-image-overlay" />
              </div>

              <div className="workout-content">
                <div>
                  <span className="workout-day">{workout.day}</span>
                  <h3>{workout.title}</h3>
                  <ul>
                    {workout.exercises.map((exercise, i) => (
                      <li key={i}>{exercise}</li>
                    ))}
                  </ul>
                </div>

                <button 
                  className={isToday ? "pulse-btn" : ""}
                  onClick={() => handleStartTraining(workout)}
                >
                  {isToday ? "Start Workout Now" : "Review & Train"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ================= MEMBERSHIP VIP PASS ================= */}
      <div className="section-title">
        <h2>Membership Wallet</h2>
      </div>

      <div className="membership-card">
        <div className="vip-card-banner">
          <div className="vip-card-info">
            <h2>GOLD VIP CLUB PASS</h2>
            <p>Premium Gym Access & Amenities</p>
            <p style={{ fontSize: "13px", marginTop: "12px", opacity: 0.85 }}>
              Holder: {user.name.toUpperCase()}
            </p>
          </div>
          <div className="vip-chip-container">
            <div className="vip-chip" />
            <button className="vip-renew-btn" onClick={() => { setIsPayModalOpen(true); setPaymentStep("select"); }}>Renew Pass</button>
          </div>
        </div>
        <div className="vip-card-progress">
          <div className="validity-header">
            <span>Validity Days Remaining</span>
            <span>{diffDays} Days Left (Valid till {expiryDate.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })})</span>
          </div>
          <div className="validity-bar-bg">
            <div className="validity-bar-fill" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>
      </div>

      {/* ================= PREMIUM PAYMENT MODAL ================= */}
      {isPayModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content payment-modal">
            <button className="modal-close-btn" onClick={() => setIsPayModalOpen(false)}>
              <FiX />
            </button>

            {paymentStep === "select" && (
              <div className="payment-select-step">
                <h2>Choose Membership Plan</h2>
                <p className="modal-subtitle">Select a plan to instantly extend your validity pass</p>
                
                <div className="plans-selection-grid">
                  <div className="plan-select-card" onClick={() => handlePlanSelect("Monthly Premium Pass", 1500)}>
                    <div className="plan-card-header">
                      <h3>Monthly</h3>
                      <span className="price">₹1,500</span>
                    </div>
                    <p>Access to all gym machines, cardio section, and locker rooms.</p>
                    <button className="select-plan-btn">Select Plan</button>
                  </div>

                  <div className="plan-select-card popular" onClick={() => handlePlanSelect("Quarterly Premium Pass", 4000)}>
                    <div className="popular-badge">Best Value</div>
                    <div className="plan-card-header">
                      <h3>Quarterly</h3>
                      <span className="price">₹4,000</span>
                    </div>
                    <p>Includes free personal trainer consultation & customized diet chart.</p>
                    <button className="select-plan-btn">Select Plan</button>
                  </div>

                  <div className="plan-select-card" onClick={() => handlePlanSelect("Yearly Premium Pass", 12000)}>
                    <div className="plan-card-header">
                      <h3>Yearly</h3>
                      <span className="price">₹12,000</span>
                    </div>
                    <p>VIP lounge access, unlimited steam bath, and 2 guest passes/month.</p>
                    <button className="select-plan-btn">Select Plan</button>
                  </div>
                </div>
              </div>
            )}

            {paymentStep === "method" && (
              <div className="payment-method-step">
                <h2>Select Payment Method</h2>
                <p className="modal-subtitle">Selected: <strong>{selectedPlan.name} (₹{selectedPlan.price})</strong></p>

                <div className="method-selection-list">
                  <div className={`method-card-option ${payMethod === "UPI" ? "active" : ""}`} onClick={() => setPayMethod("UPI")}>
                    <div className="option-indicator" />
                    <span>UPI (GPay / PhonePe / Paytm)</span>
                  </div>

                  <div className={`method-card-option ${payMethod === "Card" ? "active" : ""}`} onClick={() => setPayMethod("Card")}>
                    <div className="option-indicator" />
                    <span>Credit / Debit Card</span>
                  </div>

                  <div className={`method-card-option ${payMethod === "NetBanking" ? "active" : ""}`} onClick={() => setPayMethod("NetBanking")}>
                    <div className="option-indicator" />
                    <span>Net Banking</span>
                  </div>
                </div>

                <div className="method-actions">
                  <button className="back-btn" onClick={() => setPaymentStep("select")}>Back</button>
                  <button className="pay-now-action-btn" onClick={() => setPaymentStep(payMethod === "UPI" ? "qr" : "card")}>
                    Proceed to Pay
                  </button>
                </div>
              </div>
            )}

            {paymentStep === "qr" && (
              <div className="payment-qr-step text-center">
                <h2>Scan QR Code</h2>
                <p className="modal-subtitle">Scan via GPay, PhonePe or any UPI application</p>
                
                <div className="qr-wrapper">
                  <img 
                    src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=upi://pay?pa=efitness@upi%26pn=eFitness%20Gym%26am=1500%26cu=INR" 
                    alt="Payment QR" 
                  />
                  <div className="qr-price">₹{selectedPlan.price}</div>
                </div>

                <p className="qr-note">Once you scan and make payment, click confirm below.</p>

                <div className="method-actions">
                  <button className="back-btn" onClick={() => setPaymentStep("method")}>Back</button>
                  <button className="pay-now-action-btn" onClick={handleProcessPayment}>Confirm Payment</button>
                </div>
              </div>
            )}

            {paymentStep === "card" && (
              <div className="payment-card-step">
                <h2>Card Payment</h2>
                <p className="modal-subtitle">Pay securely using your Debit or Credit Card</p>

                <form onSubmit={(e) => { e.preventDefault(); handleProcessPayment(); }} className="premium-payment-form">
                  <div className="form-group-item">
                    <label>Cardholder Name</label>
                    <input type="text" placeholder="John Doe" required />
                  </div>

                  <div className="form-group-item">
                    <label>Card Number</label>
                    <input type="text" placeholder="4111 2222 3333 4444" maxLength="19" required />
                  </div>

                  <div className="form-row-items">
                    <div className="form-group-item">
                      <label>Expiry Date</label>
                      <input type="text" placeholder="MM/YY" maxLength="5" required />
                    </div>
                    <div className="form-group-item">
                      <label>CVV</label>
                      <input type="password" placeholder="***" maxLength="3" required />
                    </div>
                  </div>

                  <div className="method-actions" style={{ marginTop: "25px" }}>
                    <button type="button" className="back-btn" onClick={() => setPaymentStep("method")}>Back</button>
                    <button type="submit" className="pay-now-action-btn">Pay ₹{selectedPlan.price}</button>
                  </div>
                </form>
              </div>
            )}

            {paymentStep === "processing" && (
              <div className="payment-processing-step text-center">
                <div className="payment-spinner" />
                <h2>Processing Transaction...</h2>
                <p className="modal-subtitle">Connecting secure banking gateway. Please do not close or refresh this page.</p>
              </div>
            )}

            {paymentStep === "success" && (
              <div className="payment-success-step text-center">
                <span className="success-icon-badge">🎉</span>
                <h2>Payment Successful!</h2>
                <p className="modal-subtitle">Your {selectedPlan.name} is now active!</p>
                
                <div className="payment-success-summary">
                  <div className="summary-row">
                    <span>Transaction ID:</span>
                    <strong>TXN{Math.floor(100000 + Math.random() * 900000)}</strong>
                  </div>
                  <div className="summary-row">
                    <span>Amount Paid:</span>
                    <strong>₹{selectedPlan.price}</strong>
                  </div>
                  <div className="summary-row">
                    <span>Pass Validity:</span>
                    <strong>Extended +{selectedPlan.name.toLowerCase().includes("year") ? 365 : selectedPlan.name.toLowerCase().includes("quarter") ? 90 : 30} Days</strong>
                  </div>
                </div>

                <button className="finish-workout-btn" onClick={() => setIsPayModalOpen(false)}>
                  Go to Dashboard
                </button>
              </div>
            )}
          </div>
        </div>
      )}


      {/* ================= WORKOUT STOPWATCH TIMER MODAL ================= */}
      {isModalOpen && activeWorkout && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close-btn" onClick={() => setIsModalOpen(false)}>
              <FiX />
            </button>

            {!workoutCompleted ? (
              <>
                <h2>Track Your Training</h2>
                <p className="modal-subtitle">
                  {activeWorkout.day} - {activeWorkout.title}
                </p>

                {/* Stopwatch Section */}
                <div className="timer-container">
                  <div className="timer-display">{formatTime(time)}</div>
                  <div className="timer-controls">
                    {timerActive ? (
                      <button className="timer-btn pause" onClick={handlePauseTimer}>
                        <FiPause style={{ marginRight: "5px" }} /> Pause
                      </button>
                    ) : (
                      <button className="timer-btn start" onClick={handleStartTimer}>
                        <FiPlay style={{ marginRight: "5px" }} /> Resume
                      </button>
                    )}
                    <button className="timer-btn reset" onClick={handleResetTimer}>
                      <FiRotateCcw style={{ marginRight: "5px" }} /> Reset
                    </button>
                  </div>
                </div>

                {/* Exercises Checklist */}
                <div className="checklist-container">
                  <h3>Exercises Checklist ({completedExercises.filter(Boolean).length}/{activeWorkout.exercises.length})</h3>
                  {activeWorkout.exercises.map((exercise, idx) => (
                    <div 
                      key={idx} 
                      className={`checklist-item ${completedExercises[idx] ? "completed" : ""}`}
                      onClick={() => toggleExercise(idx)}
                    >
                      <div className="checkbox">
                        {completedExercises[idx] && <FiCheck />}
                      </div>
                      <span className="checklist-text">{exercise}</span>
                    </div>
                  ))}
                </div>

                <button 
                  className="finish-workout-btn"
                  onClick={handleFinishWorkout}
                  disabled={!allExercisesDone}
                >
                  <FaDumbbell style={{ marginRight: "8px" }} /> Finish & Log Workout
                </button>
              </>
            ) : (
              <div className="completion-celebration">
                <span className="completion-icon">🏆</span>
                <h3>Workout Completed!</h3>
                <p>Outstanding effort today! You crushed the <strong>{activeWorkout.title}</strong> routine in <strong>{formatTime(time)}</strong>!</p>
                <div style={{ background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.2)", borderRadius: "12px", padding: "15px", marginBottom: "25px" }}>
                  <div style={{ color: "var(--accent-green)", fontWeight: 700, fontSize: "18px" }}>+320 kcal Burned</div>
                  <div style={{ color: "#fff", fontSize: "14px", marginTop: "4px" }}>Daily Streak updated to <strong>{streak} Days</strong>!</div>
                </div>
                <button className="finish-workout-btn" onClick={() => setIsModalOpen(false)}>
                  Back to Dashboard
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default MemberDashboard;
