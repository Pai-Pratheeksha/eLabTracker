// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import Unauthorized from './pages/Unauthorized';

import StudentDashboard from './pages/StudentDashboard';
import FacultyDashboard from './pages/FacultyDashboard';
import Home from './pages/Home'
import Footer from './components/Footer';
import About from './pages/About';
import Terms from './pages/Terms';
import Navbar from './components/Navbar';
import { useEffect, useState } from 'react';
import axios from "axios";

function App() {
  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("role");
  //   window.location.href = "/login";
  // };

  const [loading, setLoading] = useState(true)
  const [userRole, setUserRole] = useState(null)

  useEffect(()=>{
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role) {
      // Optional: verify token with backend
      axios.get("/api/auth/verify", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        console.log(res.data)
        if (res.data.valid) {
          setUserRole(role);
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("role");
        }
        setLoading(false);
      })
      .catch(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) return <p>Loading...</p>;

  // const showNavbarRoutes = ["/faculty-dashboard", "/student-dashboard"];

  return (
    <Router>
      <>
        {/* {showNavbarRoutes.includes(location.pathname) && (
          <Navbar onLogout={handleLogout} />
        )} */}

        <Routes>
          <Route path="/" element={
            userRole == "faculty" ? (
              <Navigate to="/faculty-dashboard" />
            ) : userRole == "student" ? (
              <Navigate to="/student-dashboard" />
            ) : (
            <Home />
            )} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          <Route element={<ProtectedRoute allowedRoles={['student']} />}>
            <Route path="/student-dashboard" element={<StudentDashboard />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['faculty']} />}>
            <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
          </Route>
        </Routes>

        <Footer /> {/* Always visible on every route */}
      </>
    </Router>
  );
}

export default App;
