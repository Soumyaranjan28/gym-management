// function StatCard({ title, value, success, danger }) {
//   let className = "card stat info";
//   if (success) className = "card stat success";
//   if (danger) className = "card stat danger";

//   return (
//     <div className={className}>
//       <h4>{title}</h4>
//       <h1>{value}</h1>
//     </div>
//   );
// }

// export default StatCard;
// import {
//   FaUsers,
//   FaUserClock,
//   FaUserPlus,
//   FaWalking,
//   FaCalendarCheck
// } from "react-icons/fa";

// function StatCard({ title, value, success, danger, icon }) {
//   let className = "card stat info";

//   if (success) className = "card stat success";
//   if (danger) className = "card stat danger";

//   // Icon resolver (optional but clean)
//   const renderIcon = () => {
//     switch (icon) {
//       case "members":
//         return <FaUsers />;
//       case "expiring":
//         return <FaUserClock />;
//       case "new":
//         return <FaUserPlus />;
//       case "visitors":
//         return <FaWalking />;
//       case "bookings":
//         return <FaCalendarCheck />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className={className}>
//       <div className="stat-header">
//         <h4>{title}</h4>
//         {icon && <span className="stat-icon">{renderIcon()}</span>}
//       </div>

//       <h1>{value}</h1>
//     </div>
//   );
// }

// export default StatCard;
function StatCard({ title, value, success, danger }) {
  let className = "card stat info";
  if (success) className = "card stat success";
  if (danger) className = "card stat danger";

  return (
    <div className={className}>
      <h4>{title}</h4>
      <h1>{value}</h1>
    </div>
  );
}

export default StatCard;
