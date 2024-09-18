import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from './pages/Home';
import Register from './pages/Register'
import TaskManagementPage from './pages/TaskManagement';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />}></Route>
        <Route exact path="/register" element={<Register />}></Route>
        <Route exact path="/home" element={<Home />}></Route>
        <Route
          exact
          path="/manage-task"
          element={<TaskManagementPage/>}
        ></Route>
      </Routes>
    </Router>
  );
}

export default App