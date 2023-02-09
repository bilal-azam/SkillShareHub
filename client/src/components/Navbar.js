import { Link } from 'react-router-dom';
import NotificationAlerts from './NotificationsDropdown';

const Navbar = () => {
    return (
        <nav>
            <Link to="/messages">Messages</Link>
            <NotificationAlerts />
        </nav>
    );
};

export default Navbar;