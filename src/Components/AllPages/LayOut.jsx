// LayOut.js
import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

function LayOut() {
   const navigate = useNavigate();
  return (
    <section className="dashboard">
      <div className="container">
        <div className="row">
          {/* Left Side Navigation */}
          <div className="col-xl-3">
            <Nav className="flex-column dashLinks">
              <NavLink className="nav-link" to="/home">Home</NavLink>
              <NavLink className="nav-link" to="/addTask">Add Task</NavLink>
              <NavLink className="nav-link" to="/completed">Completed Tasks</NavLink>
              <NavLink className="nav-link" to="/login">Log In</NavLink>
              <NavLink className="nav-link" to="/register">Register</NavLink>
              {localStorage.getItem("token") &&<button onClick={()=>{localStorage.removeItem("token"); navigate("/login")}} className="nav-link">log out</button> }
            </Nav>
          </div>

          {/* Right Side Content */}
          <div className="col-xl-9">
            <div className="dashView">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LayOut;
