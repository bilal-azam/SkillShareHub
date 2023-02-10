import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/NotificationsAlert.css';


const NotificationAlerts = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const res = await axios.get('/api/notifications', {
                    headers: { 'x-auth-token': localStorage.getItem('token') }
                });
                setNotifications(res.data);
            } catch (err) {
                console.error(err.response.data);
            }
        };

        fetchNotifications();
    }, []);

    const markAsRead = async (id) => {
        try {
            await axios.put(`/api/notifications/${id}`, {}, {
                headers: { 'x-auth-token': localStorage.getItem('token') }
            });
            setNotifications(notifications.map(n => n._id === id ? { ...n, read: true } : n));
        } catch (err) {
            console.error(err.response.data);
        }
    };

    return (
        <div className="notifications">
            <h4>Notifications</h4>
            <ul>
                {notifications.map(notification => (
                    <li key={notification._id} className={notification.read ? 'read' : 'unread'}>
                        <span>{notification.message}</span>
                        <button onClick={() => markAsRead(notification._id)}>Mark as Read</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NotificationAlerts;