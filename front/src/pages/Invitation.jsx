import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/Context';
const Invitation = () => {
    const { url } = useParams();
    const [invitation, setInvitation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { userId } = useAuth();

    useEffect(() => {
        const fetchInvitation = async () => {
            try {
                console.log(userId);
                const response = await axios.get(`http://localhost:5000/invitation/url/${url}`);
                setInvitation(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchInvitation();
    }, [url]);

    const handleAccept = async () => {
        try {
            await axios.post(`http://localhost:5000/invitation/accept/${url}`);
            alert('Invitation accepted!');
        } catch (err) {
            alert('Error accepting invitation');
        }
    };

    const handleReject = async () => {
        try {
            await axios.post(`http://localhost:5000/invitation/reject/${url}`);
            alert('Invitation rejected!');
        } catch (err) {
            alert('Error rejecting invitation');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Invitation</h1>
            {invitation ? (
                <div>
                    <p>{invitation.message}</p>
                    <button onClick={handleAccept}>Accept</button>
                    <button onClick={handleReject}>Reject</button>
                </div>
            ) : (
                <p>No invitation found</p>
            )}
        </div>
    );
};

export default Invitation;