import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import AdminPage from './views/AdminPage';
import UserPage from './views/UserPage';
import ReportPage from './views/ReportPage';
import Home from './views/Home'; 
import './app.css';

const App = () => (
  <div className="app-container">
    <nav className="navbar">
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
      >
        Home
      </NavLink>
      <NavLink
        to="/admin"
        className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
      >
        Admin
      </NavLink>
      <NavLink
        to="/user"
        className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
      >
        User
      </NavLink>
      <NavLink
        to="/reports"
        className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
      >
        Reports
      </NavLink>
    </nav>

    <main>
      <h1 className="welcome-title">Welcome to the Communication Tracker Application</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/reports" element={<ReportPage />} />
      </Routes>
    </main>
    <footer className="footer">
      <p>© 2024 Communication Tracker App. All rights reserved.</p>
    </footer>
  </div>
);

const Wrapper = () => (
  <Router>
    <App />
  </Router>
);

export default Wrapper;
