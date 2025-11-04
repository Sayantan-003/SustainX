// // import React from "react";
// // import { Route, Routes, BrowserRouter } from "react-router-dom";
// // import "./App.css";
// // import LoginPage from "./Pages/LoginForm.jsx";
// // import ProtectedRoute from "./ProtectedRoute.jsx";
// // import { AuthContext, AuthProvider } from "./context/AuthContext.jsx";

// // import Dashboard from "./Pages/Dashboard.jsx";
// // import ChecklistPage from "./Pages/ChecklistPage.jsx";

// // // Helper: Role-based dashboards
// // const RoleBasedReports = ({ roleConfig }) => {
// //   const { user } = useContext(AuthContext);

// //   if (!user || !user.role) {
// //     return (
// //       <div className="flex items-center justify-center py-12">
// //         <div className="text-gray-500">Loading dashboard...</div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <>
// //       {roleConfig.dashboards.prep.includes(user.role) && (
// //         <div id="dahsboard">
// //           <Dashboard />
// //         </div>
// //       )}
// //     </>
// //   );
// // };

// // const App = () => {
// //   const roleConfig = {
// //     admin: ["admin"],
// //     technician: ["technician"],
// //     supervisor: ["supervisor"],
// //   };

// //   return (
// //     <AuthProvider>
// //       <BrowserRouter>
// //         <Routes>
// //           {/*Public Page */}
// //           <Route path="/login" element={<LoginPage />} />

// //           {/*Protected Routes*/}
// //           <Route
// //             path="/"
// //             element={
// //               <ProtectedRoute
// //                 allowedRoles={[...roleConfig.admin, ...roleConfig.supervisor]}
// //               >
// //                 <Dashboard />
// //               </ProtectedRoute>
// //             }
// //           />
// //           <Route
// //             path="/checklists"
// //             element={<ProtectedRoute allowedRoles={[...roleConfig.admin, roleConfig.supervisor]}>
// //               <ChecklistPage/>
// //             </ProtectedRoute>}
// //           />
// //         </Routes>
// //       </BrowserRouter>
// //     </AuthProvider>
// //   );
// // };

// // export default App;

// import React from "react";
// import { Route, Routes, BrowserRouter } from "react-router-dom";
// import "./App.css";
// import LoginPage from "./Pages/LoginForm.jsx";
// import ProtectedRoute from "./ProtectedRoute.jsx";
// import { AuthContext, AuthProvider } from "./context/AuthContext.jsx";

// import Dashboard from "./Pages/Dashboard.jsx";
// import ChecklistPage from "./Pages/ChecklistPage.jsx"; // Import the new page

// const App = () => {
//   const roleConfig = {
//     admin: ["admin"],
//     technician: ["technician"],
//     supervisor: ["supervisor"],
//   };

//   return (
//     <AuthProvider>
//       <BrowserRouter>
//         <Routes>
//           {/* Public Page */}
//           <Route path="/login" element={<LoginPage />} />

//           {/* Protected Routes */}
//           <Route
//             path="/"
//             element={
//               <ProtectedRoute
//                 allowedRoles={[...roleConfig.admin, ...roleConfig.supervisor]}
//               >
//                 <Dashboard />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/checklists"
//             element={
//               <ProtectedRoute allowedRoles={[...roleConfig.admin, ...roleConfig.supervisor]}>
//                 <ChecklistPage />
//               </ProtectedRoute>
//             }
//           />
//         </Routes>
//       </BrowserRouter>
//     </AuthProvider>
//   );
// };

// export default App;

import React from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import "./App.css";
import LoginPage from "./Pages/LoginForm.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import WorkOrderPage from "./Pages/WorkOrderPage.jsx";
import ChecklistPage from "./Pages/ChecklistPage.jsx";
import CreateChecklistPage from "./Pages/CreateCheckListPage.jsx" 
import { Loader2 } from "lucide-react";

// Loading component
const LoadingScreen = () => (
  <div className="flex items-center justify-center min-h-screen bg-slate-50">
    <div className="text-center">
      <Loader2 className="w-20 h-25 text-blue-600 animate-spin mx-auto mb-4" />
      <p className="text-slate-600 font-medium">Loading...</p>
    </div>
  </div>
);

// App Routes Component (needs to be inside AuthProvider to use useAuth)
const AppRoutes = () => {
  const { loading, isAuthenticated } = useAuth();

  const roleConfig = {
    admin: ["admin"],
    technician: ["technician"],
    supervisor: ["supervisor"],
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Routes>
      {/* Public Route */}
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />}
      />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute
            allowedRoles={[...roleConfig.admin, ...roleConfig.supervisor]}
          >
            <WorkOrderPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/checklists"
        element={
          <ProtectedRoute
            allowedRoles={[...roleConfig.admin, ...roleConfig.supervisor]}
          >
            <ChecklistPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/checklists/new"
        element={
          <ProtectedRoute
            allowedRoles={[...roleConfig.admin, ...roleConfig.supervisor]}
          >
            <CreateChecklistPage />
          </ProtectedRoute>
        }
      />

      {/* Catch all - redirect to login if not authenticated, otherwise to dashboard */}
      <Route
        path="*"
        element={
          isAuthenticated ? (
            <Navigate to="/" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
};

// Main App Component
const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
