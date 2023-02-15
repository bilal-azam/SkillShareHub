import { Link } from 'react-router-dom';
import NotificationAlerts from './NotificationsDropdown';

const Navbar = () => {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/messages">Messages</Link>
            <NotificationAlerts />
            <div className="dropdown">
                <button className="dropbtn">Actions</button>
                <div className="dropdown-content">
                <Link to="/settings">Settings</Link>
                <Link to="/logout">Logout</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;