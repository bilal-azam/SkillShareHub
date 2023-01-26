import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SkillExchange = () => {
  const [requests, setRequests] = useState([]);
  const [newRequest, setNewRequest] = useState({ recipient: '', skill: '', message: '' });

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get('/api/skill-exchange', {
          headers: { 'x-auth-token': localStorage.getItem('token') }
        });
        setRequests(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };

    fetchRequests();
  }, []);

  const onChange = e => setNewRequest({ ...newRequest, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/skill-exchange', newRequest, {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      setRequests([...requests, res.data]);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const onUpdate = async (id, status, date) => {
    try {
      const res = await axios.put(`/api/skill-exchange/${id}`, { status, scheduledDate: date }, {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      setRequests(requests.map(req => (req._id === id ? res.data : req)));
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div>
      <h3>Create a Skill Exchange Request</h3>
      <form onSubmit={onSubmit}>
        <input type="text" name="recipient" value={newRequest.recipient} onChange={onChange} placeholder="Recipient User ID" required />
        <input type="text" name="skill" value={newRequest.skill} onChange={onChange} placeholder="Skill" required />
        <textarea name="message" value={newRequest.message} onChange={onChange} placeholder="Message" />
        <button type="submit">Send Request</button>
      </form>

      <h3>Skill Exchange Requests</h3>
      <ul>
        {requests.map(req => (
          <li key={req._id}>
            {req.requester.name} requests to learn {req.skill} from {req.recipient.name} - Status: {req.status}
            {req.recipient._id === localStorage.getItem('userId') && req.status === 'Pending' && (
              <>
                <button onClick={() => onUpdate(req._id, 'Accepted')}>Accept</button>
                <button onClick={() => onUpdate(req._id, 'Rejected')}>Reject</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SkillExchange;
