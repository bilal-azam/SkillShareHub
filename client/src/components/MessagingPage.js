import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MessagingPage.css';

const MessagingPage = ({ match }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await axios.get(`/api/messages/${match.params.userId}`, {
                    headers: { 'x-auth-token': localStorage.getItem('token') }
                });
                setMessages(res.data);
            } catch (err) {
                console.error(err.response.data.message);
            }
        };

        fetchMessages();
    }, [match.params.userId]);

    const sendMessage = async () => {
        try {
            const res = await axios.post('/api/messages/send', {
                recipientId: match.params.userId,
                content: newMessage
            }, {
                headers: { 'x-auth-token': localStorage.getItem('token') }
            });
            setMessages([...messages, res.data]);
            setNewMessage('');
        } catch (err) {
            console.error(err.response.data.message);
        }
    };

    return (
        <div className="messaging-page">
            <ul>
                {messages.map(message => (
                    <li key={message._id} className={message.sender === match.params.userId ? 'received' : 'sent'}>
                        {message.content}
                    </li>
                ))}
            </ul>
            <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default MessagingPage;
