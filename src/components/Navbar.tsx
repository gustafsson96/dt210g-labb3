import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-right">
        {!user && <Link to="/" className="nav-link">Blog</Link>}
        {!user && <Link to="/login" className="nav-link">Login</Link>}
        {user && <button className="nav-button" onClick={logout}>Logout</button>}
      </div>
    </nav>
  );
}

export default Navbar;