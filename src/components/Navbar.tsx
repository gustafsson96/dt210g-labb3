import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-right">
        {!user && <NavLink to="/" className="nav-link">Blog</NavLink>}
        {!user && <NavLink to="/login" className="nav-link">Login</NavLink>}
        {user && <button className="nav-button" onClick={logout}>Logout</button>}
      </div>
    </nav>
  );
}

export default Navbar;