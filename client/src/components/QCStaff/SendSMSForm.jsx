import React, { useState } from 'react';

const SendSMSForm = () => {
    const [name, setName] = useState('');
    const [railwaynum, setRailwaynum] = useState('');
    const [pwds, setPwds] = useState('');
    const [mob, setMob] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/send-sms', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
            },
                body: JSON.stringify({ name, railwaynum, pwds, mob }),
            });

        const data = await response.json();

        if (response.ok) {
            setMessage(data.message);
        } else {
            setMessage(data.error || 'Error sending SMS');
        }
    } catch (error) {
        setMessage('Error sending SMS');
    }
};

return (
    <div>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
                <label>Railway Number:</label>
                <input type="text" value={railwaynum} onChange={(e) => setRailwaynum(e.target.value)} required />
            </div>
            <div>
                <label>Password:</label>
                <input type="text" value={pwds} onChange={(e) => setPwds(e.target.value)} required />
            </div>
            <div>
                <label>Mobile Number:</label>
                <input type="text" value={mob} onChange={(e) => setMob(e.target.value)} required />
            </div>
            <button type="submit">Send SMS</button>
        </form>
        {message && <p>{message}</p>}
    </div>
);
};

export default SendSMSForm;
