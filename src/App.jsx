import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import LoginRegister from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import ProjectDetails from "./pages/ProjectDetails";
import AddTask from "./pages/AddTask";
import Navbar from "./components/Navbar";
import FooterBar from "./components/FooterBar";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      {user && <Navbar />}
      <div className="content">
        <Routes>
          <Route path="/" element={user ? <Dashboard /> : <LoginRegister />} />
          <Route path="/projects/:id" element={user ? <ProjectDetails /> : <Navigate to="/" />} />
          <Route path="/add-task/:projectId" element={user ? <AddTask /> : <Navigate to="/" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      <FooterBar />
    </Router>
  );
}

export default App;
