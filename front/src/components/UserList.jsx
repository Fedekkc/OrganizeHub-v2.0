import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/Context';
import StatusIndicator from './StatusIndicator';
import InfoTooltip from './InfoTooltip';

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

const UserInfoContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

    
`;
const UserData = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    align-items: left;
    
`;



const UserAvatar = styled.img`
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    border: 1px solid #ccc;
    object-fit: cover;
`;




const UserList = () => {
    const [users, setUsers] = useState([]);
    // creo userInfo para que pueda recibir varios parametros sin definir la cantidad de parametros
    const [userInfo, setUserInfo] = useState({ show: false, text: {}, position: {} });


    const { organizationId } = useAuth();


    const handleUserInfo = (text, e) => {
        const position = {
            top: e.target.getBoundingClientRect().top + window.scrollY,
            left: e.target.getBoundingClientRect().left + window.scrollX,
        };
        setUserInfo({ show: true, text, position });
    };

    const hideUserInfo = () => {
        setUserInfo({ show: false, text: {}, position: {} });
    };


    //DyD
    const handleDragStart = (e, userId, user) => {
        e.dataTransfer.setData('userId', userId);
        e.dataTransfer.setData('user', JSON.stringify(user));
        
    };



    const handleDragOver = (e) => {
        e.preventDefault();
    };


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                
                const response = await axios.get(`http://localhost:5000/organizations/${organizationId}/users`);
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <UserListContainer>
            Lista de usuarios 
            {users.map(user => (
                <UserItem key={user.userId}
                draggable
                onDragStart={(e) => handleDragStart(e, user.userId,user)}
                onMouseEnter={(e) => handleUserInfo({
                    avatar: user.avatar,
                    firstName: user.firstName,
                    email: user.email
                }
                    , e)} onMouseLeave={hideUserInfo}>
                    <StatusIndicator online={user.isActive} />
                    <UserName>{user.firstName}</UserName>
                </UserItem>
            ))}
            {userInfo.show && (
                <InfoTooltip style={{ top: userInfo.position.top + 45, left: userInfo.position.left }}  >
                    <UserInfoContainer>
                        <UserAvatar src={userInfo.text.avatar} alt='user avatar' />
                        <UserData>
                            <span>{userInfo.text.firstName}</span>
                            <span>{userInfo.text.email}</span>
                        </UserData>
                        
                    </UserInfoContainer>

                </InfoTooltip>
            )}
        </UserListContainer>

    );
};

export default UserList;
