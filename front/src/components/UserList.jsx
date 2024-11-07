import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/Context';
import StatusIndicator from './StatusIndicator';
const UserListContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    background-color: #E4E3DE;
    border: 1px solid #ccc;
    border-radius: 8px;
    gap: 5px;
    overflow-y: scroll;
    scrollbar-width: none;
    -ms-overflow-style: none;
`;

const UserItem = styled.div`
    display: flex;
    align-items: center;
    
    padding: 10px;
    
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

    &:hover {
        background-color: #fff;
        cursor: pointer;
        transition: background-color 0.2s;
        transform: scale(1.01);

    }


`;

const UserName = styled.span`
    margin-left: 10px;
`;




const UserList = () => {
    const [users, setUsers] = useState([]);
    const { organizationId } = useAuth();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                
                const response = await axios.get(`http://localhost:5000/organizations/${organizationId}/users`);
                setUsers(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <UserListContainer>
            Lista de usuarios conectados
            {users.map(user => (
                <UserItem key={user.userId}>
                    <StatusIndicator online={user.isActive} />
                    <UserName>{user.firstName}</UserName>
                </UserItem>
            ))}
        </UserListContainer>
    );
};

export default UserList;
