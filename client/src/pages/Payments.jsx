import { useState, useEffect } from "react";
import AdminLayout from "../components/AdminLayout";
import "../styles/payments.css";
import { getAllPayments, makePayment } from "../services/adminService";
import {
  FiDollarSign,
  FiCreditCard,
  FiUsers,
  FiClock,
  FiPlus,
  FiCheckCircle,
  FiCalendar,
  FiUser,
  FiHash,
} from "react-icons/fi";

function Payments() {
  // ================= STATE =================
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await getAllPayments();
        if (res.data && res.data.success) {
          // Map DB models to visual list items
          const mapped = res.data.payments.map((p) => {
            const memberName = p.member?.name || "Anonymous Member";
            const memberPlan = p.planName || p.member?.membership || "Monthly";
            return {
              id: p._id,
              member: memberName,
              plan: memberPlan,
              amount: p.amount,
              method: p.method || "UPI",
              date: new Date(p.createdAt).toLocaleDateString(),
              status: p.status || "Paid"
            };
          });
          setTransactions(mapped);
        }
      } catch (error) {
        console.error("Failed to load payments from server", error);
      }
    };
    fetchPayments();
  }, []);

  const [formData, setFormData] = useState({
    member: "",
    plan: "Monthly",
    amount: "",
    method: "Cash",
  });

  const [showForm, setShowForm] = useState(false);

  // ================= COMPUTED STATS =================
  const totalRevenue = transactions.reduce((acc, t) => acc + Number(t.amount), 0);
  const activeSubscriptions = transactions.length;
  const pendingInvoices = 0;

  // ================= HANDLERS =================
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.member.trim() || !formData.amount) return;
    try {
      await makePayment({
        amount: Number(formData.amount),
        method: formData.method,
        planName: formData.plan,
        userEmail: formData.member, // admin logs by member name/email
      });
      // Re-fetch payments from DB so data is always in sync
      const res = await getAllPayments();
      if (res.data && res.data.success) {
        const mapped = res.data.payments.map((p) => {
          const memberName = p.member?.name || "Anonymous Member";
          const memberPlan = p.planName || p.member?.membership || "Monthly";
          return {
            id: p._id,
            member: memberName,
            plan: memberPlan,
            amount: p.amount,
            method: p.method || "UPI",
            date: new Date(p.createdAt).toLocaleDateString(),
            status: p.status || "Paid"
          };
        });
        setTransactions(mapped);
      }
      setFormData({ member: "", plan: "Monthly", amount: "", method: "Cash" });
      setShowForm(false);
    } catch (error) {
      console.error("Failed to log payment", error);
      alert("Failed to log payment. The member email may not exist in the system.");
    }
  };

  // ================= UTILITIES =================
  const getInitials = (name) => {
    if (!name) return "?";
    const parts = name.trim().split(/\s+/);
    if (parts.length > 1)
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    return parts[0][0].toUpperCase();
  };

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);

  const getMethodBadge = (method) => {
    const map = {
      Cash: { bg: "rgba(16,185,129,0.15)", color: "#10b981" },
      Card: { bg: "rgba(56,189,248,0.15)", color: "#38bdf8" },
      UPI: { bg: "rgba(168,85,247,0.15)", color: "#a855f7" },
    };
    return map[method] || map.Cash;
  };

  return (
    <AdminLayout>
      <div className="payments-page">
        {/* HEADER */}
        <div className="payments-header">
          <div>
            <span className="payments-badge">Financial Management</span>
            <h1>Payments</h1>
            <p>Track revenue, log transactions, and manage gym subscriptions.</p>
          </div>
          <button className="add-payment-btn" onClick={() => setShowForm(!showForm)}>
            <FiPlus style={{ marginRight: "8px" }} />
            {showForm ? "Cancel" : "Log Payment"}
          </button>
        </div>

        {/* STATS CARDS */}
        <div className="payments-stats-grid">
          <div className="payment-stat-card">
            <div className="payment-stat-header">
              <h3>Total Revenue</h3>
              <div className="payment-stat-icon revenue">
                <FiDollarSign />
              </div>
            </div>
            <h1>{formatCurrency(totalRevenue)}</h1>
            <p className="stat-change positive">This period</p>
          </div>

          <div className="payment-stat-card">
            <div className="payment-stat-header">
              <h3>Active Subscriptions</h3>
              <div className="payment-stat-icon subs">
                <FiUsers />
              </div>
            </div>
            <h1>{activeSubscriptions}</h1>
            <p className="stat-change">Logged transactions</p>
          </div>

          <div className="payment-stat-card">
            <div className="payment-stat-header">
              <h3>Pending Invoices</h3>
              <div className="payment-stat-icon pending">
                <FiClock />
              </div>
            </div>
            <h1>{pendingInvoices}</h1>
            <p className="stat-change">Awaiting payment</p>
          </div>
        </div>

        {/* LOG PAYMENT FORM */}
        {showForm && (
          <div className="payment-form-card">
            <h2>
              <FiCreditCard style={{ marginRight: "10px" }} /> Log New Transaction
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label><FiUser className="form-icon" /> Member Name</label>
                  <input
                    type="text"
                    name="member"
                    placeholder="Enter member name..."
                    value={formData.member}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label><FiHash className="form-icon" /> Plan</label>
                  <select name="plan" value={formData.plan} onChange={handleInputChange}>
                    <option value="Monthly">Monthly</option>
                    <option value="Quarterly">Quarterly</option>
                    <option value="Yearly">Yearly</option>
                  </select>
                </div>

                <div className="form-group">
                  <label><FiDollarSign className="form-icon" /> Amount (₹)</label>
                  <input
                    type="number"
                    name="amount"
                    placeholder="Enter amount..."
                    value={formData.amount}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label><FiCreditCard className="form-icon" /> Payment Method</label>
                  <select name="method" value={formData.method} onChange={handleInputChange}>
                    <option value="Cash">Cash</option>
                    <option value="Card">Card</option>
                    <option value="UPI">UPI</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="submit-payment-btn">
                <FiCheckCircle style={{ marginRight: "8px" }} /> Submit Payment
              </button>
            </form>
          </div>
        )}

        {/* TRANSACTION TABLE */}
        <div className="transactions-card">
          <div className="transactions-header">
            <h2>
              <FiCalendar style={{ marginRight: "10px" }} /> Transaction History
            </h2>
            <span className="tx-count">{transactions.length} records</span>
          </div>

          <div className="transactions-table-container">
            {transactions.length > 0 ? (
              <table className="transactions-table">
                <thead>
                  <tr>
                    <th>Member</th>
                    <th>Plan</th>
                    <th>Amount</th>
                    <th>Method</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx) => {
                    const methodStyle = getMethodBadge(tx.method);
                    return (
                      <tr key={tx.id}>
                        <td>
                          <div className="tx-member-cell">
                            <div className="tx-avatar">{getInitials(tx.member)}</div>
                            <span>{tx.member}</span>
                          </div>
                        </td>
                        <td>{tx.plan}</td>
                        <td style={{ fontWeight: 700, color: "#10b981" }}>
                          {formatCurrency(tx.amount)}
                        </td>
                        <td>
                          <span
                            className="method-badge"
                            style={{ background: methodStyle.bg, color: methodStyle.color }}
                          >
                            {tx.method}
                          </span>
                        </td>
                        <td style={{ color: "#9ca3af" }}>{tx.date}</td>
                        <td>
                          <span className="status-badge paid">
                            <FiCheckCircle style={{ marginRight: "4px" }} /> {tx.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <div className="no-transactions">
                No transactions logged yet. Click "Log Payment" to add one.
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default Payments;
