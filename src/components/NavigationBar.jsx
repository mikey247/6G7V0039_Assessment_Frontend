import { Link } from "react-router-dom";
import "./NavigationBar.css"

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-brand">ProductStore</div>
            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
                <Link to="/customers">Customers</Link>
            </div>
        </nav>
    );
};

export default Navbar;
