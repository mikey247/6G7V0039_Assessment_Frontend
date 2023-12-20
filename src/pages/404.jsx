import { Link } from "react-router-dom";
import "./404.css"
const NotFound = () => {
    return (
        <div className="not-found-container">
            <h1>404</h1>
            <h2>Page Not Found</h2>
            <p>The page you are looking for does not exist or another error occurred.</p>
            <Link to="/">Go back home</Link>
        </div>
    );
};

export default NotFound;
