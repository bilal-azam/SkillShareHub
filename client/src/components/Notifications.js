import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Notifications = () => {
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
      await axios.put(`/api/notifications/${id}/read`, null, {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      setNotifications(notifications.map(n => n._id === id ? { ...n, read: true } : n));
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div>
      <h3>Notifications</h3>
      <ul>
        {notifications.map(notification => (
          <li key={notification._id} style={{ textDecoration: notification.read ? 'line-through' : 'none' }}>
            {notification.message}
            {!notification.read && <button onClick={() => markAsRead(notification._id)}>Mark as Read</button>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
