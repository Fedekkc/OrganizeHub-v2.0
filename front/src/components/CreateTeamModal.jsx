import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useAuth } from '../context/Context';
import Modal from './Modal';
import Button from './Button';
import Input from './Input';
import { CiCirclePlus } from 'react-icons/ci';

const Title = styled.h1`
    font-size: 2em;
    color: white;
`;

const CirclePlus = styled(CiCirclePlus)`
    font-size: 3rem;
    color: white;
    transition: transform 0.3s ease;  /* Añadir animación de desplazamiento */
    
    /* Desplazarse a la derecha cuando el UserBrowser esté abierto */
    transform: ${(props) => (props.isUserBrowserOpen ? 'translateX(20px)' : 'translateX(0)')}; 

    &:hover {
        cursor: pointer;
        color: #DBEEB4;
    }
`;

const UserBrowserContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;
    padding: 1rem;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;
    border: 1px solid #ccc;
    width: 90%;
`;

const UserBrowser = styled(Input)`
    display: ${(props) => (props.isUserBrowserOpen ? 'flex' : 'none')};
    width: 80%;
    transition: ease 0.2s;
`;

const SuggestionsList = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0;
    max-height: 150px;
    overflow-y: auto;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    position: absolute;
    width: 80%;
    z-index: 1000;
`;

const SuggestionItem = styled.li`
    padding: 2px;
    border-bottom: 1px solid #ddd;
    width: 20%;
    max-width: 10rem;
    

    &:last-child {
        border-bottom: none;
    }

    &:hover {
        background-color: #f9f9f9;
        cursor: pointer;
    }
`;

const CreateTeamModal = ({ isModalOpen, setIsModalOpen, teams, setTeams }) => {
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [isUserBrowserOpen, setIsUserBrowserOpen] = useState(false);
    const [teamName, setTeamName] = useState('');
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const { organizationId } = useAuth();

    const handleUserBrowser = () => {
        setIsUserBrowserOpen(!isUserBrowserOpen);
    };

    const getOrganizationUsers = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/organizations/${organizationId}/users`);
            setUsers(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (isModalOpen) {
            setSelectedUsers([]);
            setTeamName('');
            getOrganizationUsers();
        }
    }, [isModalOpen]);

    const handleInputChange = (e) => {
        setTeamName(e.target.value);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleAddUser = (userId) => {
        setSelectedUsers([...selectedUsers, userId]);
        setSearchTerm('');
    };

    const handleCreateTeam = (teamName, selectedUsers) => {
        const teamData = {
            name: teamName,
            users: selectedUsers,
            organization: parseInt(organizationId, 10),
        };

        axios.post("http://localhost:5000/teams", teamData)
            .then((response) => {
                console.log(response.data);
                setIsModalOpen(false);
                setTeams([...teams, response.data]);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const filteredUsers = users.filter(user =>
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <Title>Add Team</Title>
            <Input type="text" name="name" placeholder="Team Name" onChange={handleInputChange} value={teamName} />
            <UserBrowserContainer>
                <UserBrowser
                    type="text"
                    name="users"
                    placeholder="Search Users"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    isUserBrowserOpen={isUserBrowserOpen}
                />
                <CirclePlus
                    onClick={() => handleUserBrowser()}
                    isUserBrowserOpen={isUserBrowserOpen}
                />
                {isUserBrowserOpen && searchTerm && (
                    <SuggestionsList>
                        {filteredUsers.map(user => (
                            <SuggestionItem key={user.userId} onClick={() => handleAddUser(user.userId)}>
                                {user.email}
                            </SuggestionItem>
                        ))}
                    </SuggestionsList>
                )}
            </UserBrowserContainer>

            <h3>Selected Users:</h3>
            <ul>
                {selectedUsers.map(userId => (
                    <li key={userId}>{users.find(user => user.userId === userId)?.email}</li>
                ))}
            </ul>

            <Button onClick={() => handleCreateTeam(teamName, selectedUsers)}>Add Team</Button>
        </Modal>
    );
};

export default CreateTeamModal;