import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Button from '../Button';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`;

const Title = styled.h1`
    font-size: 24px;
    margin-bottom: 20px;
`;

const Input = styled.input`
    padding: 10px;
    margin: 10px 0;
    width: 300px;
    font-size: 16px;
`;



const InviteUser = () => {
    const [email, setEmail] = useState('');
    const organization = localStorage.getItem('organization');

    const handleInvite = async () => {
        try {
            const response = await axios.post('http://localhost:5000/invitations', {
                email,
                status: 'pending',
                organization,
                date: new Date().toISOString(),
                });
            alert('User invited successfully!');
        } catch (error) {
            console.error('There was an error inviting the user!', error);
            alert('Failed to invite user.');
        }
    };

    return (
        <Container>
            <Title>Invite User</Title>
            <Input
                type="email"
                placeholder="Enter user's email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Button onClick={handleInvite}>Invite</Button>
        </Container>
    );
};

export default InviteUser;