import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaCartShopping } from "react-icons/fa6";

import "./NavigationBar.css"
import { authActions } from "../redux/authRedux";


const Navbar = () => {
    const auth = useSelector((state) => state.auth);
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(authActions.logout());
        window.location.reload(); // Refresh the page after logout
    };

return (
    <nav className="navbar">
        <div className="navbar-brand">ProductStore</div>
        <div className="nav-links">
            <Link to="/">Products</Link>
            <Link to="/customers">Customers</Link>
        </div>
        <div className="nav-links">
            {!auth.isLoggedIn &&<Link to="/login">Login</Link>}
            {auth.isLoggedIn && <button className="logoutButton" onClick={handleLogout}>Logout</button>}
            <span style={{ marginRight: '10px' }}></span>
            {auth.isLoggedIn && <span>Hey, {auth.userFirstName}</span>}
            <Link to={"/cart"}> <span> <FaCartShopping size={"17px"}/> [{cart.quantity}]</span> </Link>
        </div>
    </nav>
);
};

export default Navbar;
