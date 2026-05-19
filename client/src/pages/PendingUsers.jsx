// import { useEffect, useState } from "react";

// import {
//   getPendingUsers,
//   approveUser,
//   rejectUser,
// } from "../services/adminService";

// import AdminLayout from "../components/AdminLayout";

// // import "../styles/PendingMembers.css";

// function PendingMembers() {

//   const [users, setUsers] = useState([]);

//   const loadUsers = async () => {

//     try {

//       const res = await getPendingUsers();

//       setUsers(res.data);

//     } catch (error) {

//       console.log(error);
//     }
//   };

//   useEffect(() => {

//     loadUsers();

//   }, []);

//   const handleApprove = async (id) => {

//     await approveUser(id);

//     loadUsers();
//   };

//   const handleReject = async (id) => {

//     await rejectUser(id);

//     loadUsers();
//   };

//   return (

//     <AdminLayout>

//       <div className="pending-page">

//         <h1>Pending Members</h1>

//         <div className="pending-grid">

//           {users.length === 0 ? (

//             <p className="empty-text">
//               No pending users
//             </p>

//           ) : (

//             users.map((u) => (

//               <div
//                 className="pending-card"
//                 key={u._id}
//               >

//                 <h2>{u.name}</h2>

//                 <p>{u.email}</p>

//                 <p>{u.phone}</p>

//                 <div className="pending-buttons">

//                   <button
//                     className="approve-btn"
//                     onClick={() =>
//                       handleApprove(u._id)
//                     }
//                   >
//                     Approve
//                   </button>

//                   <button
//                     className="reject-btn"
//                     onClick={() =>
//                       handleReject(u._id)
//                     }
//                   >
//                     Reject
//                   </button>

//                 </div>

//               </div>
//             ))
//           )}

//         </div>

//       </div>

//     </AdminLayout>
//   );
// }

// export default PendingMembers;
import { useEffect, useState } from "react";

import {
  getPendingUsers,
  approveUser,
  rejectUser,
} from "../services/adminService";

import AdminLayout from "../components/AdminLayout";

import "../styles/PendingMembers.css";

function PendingMembers() {

  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {

    try {

      setLoading(true);

      const res = await getPendingUsers();

      setUsers(res.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {

    loadUsers();

  }, []);

  const handleApprove = async (id) => {

    try {

      await approveUser(id);

      loadUsers();

    } catch (error) {

      console.log(error);
    }
  };

  const handleReject = async (id) => {

    try {

      await rejectUser(id);

      loadUsers();

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <AdminLayout>

      <div className="pending-page">

        {/* HEADER */}

        <div className="pending-header">

          <div>

            <span className="pending-badge">
              Gym Management
            </span>

            <h1>Pending Members</h1>

            <p>
              Approve or reject newly registered members.
            </p>

          </div>

        </div>

        {/* LOADING */}

        {loading ? (

          <div className="empty-box">

            <h2>Loading Members...</h2>

          </div>

        ) : users.length === 0 ? (

          <div className="empty-box">

            <h2>No Pending Members</h2>

            <p>
              All registration requests are reviewed.
            </p>

          </div>

        ) : (

          <div className="pending-grid">

            {users.map((u) => (

              <div
                className="pending-card"
                key={u._id}
              >

                {/* AVATAR */}

                <div className="member-avatar">

                  {u.name?.charAt(0).toUpperCase()}

                </div>

                {/* INFO */}

                <h2>{u.name}</h2>

                <p className="email">
                  {u.email}
                </p>

                <span className="phone">
                  📞 {u.phone}
                </span>

                {/* BUTTONS */}

                <div className="pending-buttons">

                  <button
                    className="approve-btn"
                    onClick={() =>
                      handleApprove(u._id)
                    }
                  >
                    ✅ Approve
                  </button>

                  <button
                    className="reject-btn"
                    onClick={() =>
                      handleReject(u._id)
                    }
                  >
                    ❌ Reject
                  </button>

                </div>

              </div>
            ))}
          </div>
        )}
      </div>

    </AdminLayout>
  );
}

export default PendingMembers;