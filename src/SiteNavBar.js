import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import CompassLogo from "./assets/compass.png";

export default function SiteNavBa({ user, createStory, handleLogout }) {
  let navigate = useNavigate();

  return (
    <header className="navbar">
      <div className="logo" onClick={() => navigate("/")}>
        <img src={CompassLogo} alt="compass" height="75px" />
        <h2 className="site-title">Labyrinth</h2>
      </div>
      <div className="nav-links">
        <NavLink
          className={({ isActive }) => (isActive ? "selected" : "nav-link")}
          to="/"
        >
          See all Stories
        </NavLink>
        {user ? (
          <>
            <NavLink
              className={({ isActive }) => (isActive ? "selected" : "nav-link")}
              to={`/author/${user.id}`}
            >
              Your Stories
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? "selected" : "nav-link")}
              to={`/edit`}
              onClick={createStory}
            >
              Create a Story
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? "selected" : "nav-link")}
              to="/login"
              onClick={handleLogout}
            >
              Log Out
            </NavLink>
          </>
        ) : (
          <NavLink
            className={({ isActive }) => (isActive ? "selected" : "nav-link")}
            to="/login"
          >
            Log In
          </NavLink>
        )}
      </div>
    </header>
  );
}
