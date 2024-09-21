import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`;

const Title = styled.h1`
    font-size: 2em;
    margin-bottom: 20px;
`;

const Input = styled.input`
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 300px;
`;

const Button = styled.button`
    padding: 10px 20px;
    margin: 10px 0;
    border: none;
    border-radius: 4px;
    background-color: #007BFF;
    color: white;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;

const PasswordList = styled.ul`
    list-style-type: none;
    padding: 0;
`;

const PasswordItem = styled.li`
    background: #f9f9f9;
    margin: 5px 0;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    width: 300px;
    display: flex;
    justify-content: space-between;
`;

const Passwords = () => {
    const [passwords, setPasswords] = useState([]);
    const [newPassword, setNewPassword] = useState('');

    const addPassword = () => {
        if (newPassword.trim() !== '') {
            setPasswords([...passwords, newPassword]);
            setNewPassword('');
        }
    };

    return (
        <Container>
            <Title>Password Manager</Title>
            <Input
                type="text"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />
            <Button onClick={addPassword}>Add Password</Button>
            <PasswordList>
                {passwords.map((password, index) => (
                    <PasswordItem key={index}>
                        {password}
                    </PasswordItem>
                ))}
            </PasswordList>
        </Container>
    );
};

export default Passwords;