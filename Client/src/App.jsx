import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import LoginPage from "./Pages/LoginForm.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import { AuthContext, AuthProvider } from "./context/AuthContext.jsx";

import Dashboard from "./Pages/Dashboard.jsx";

// Helper: Role-based dashboards
const RoleBasedReports = ({ roleConfig }) => {
  const { user } = useContext(AuthContext);

  if (!user || !user.role) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-500">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <>
      {roleConfig.dashboards.prep.includes(user.role) && (
        <div id="dahsboard">
          <Dashboard />
        </div>
      )}
    </>
  );
};

const App = () => {
  const roleConfig = {
    admin : ['admin'],
    technician : ['technician'],
    supervisor : ['supervisor']
  };

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/*Public Page */}
          <Route path="/login" element={<LoginPage />} />

          {/*Protected Routes*/}
          <Route path="/"
            element={
              <ProtectedRoute allowedRoles={[...roleConfig.admin, ...roleConfig.supervisor]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
