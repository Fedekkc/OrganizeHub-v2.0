import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useAuth } from '../context/Context';
import Modal from './Modal';
import Button from './Button';
import Input from './Input';

const Title = styled.h1`
    font-size: 2em;
    color: white;
`;




const CreateTeamModal = ({ isModalOpen, setIsModalOpen, teams, setTeams }) => {
    const [isUserListVisible, setIsUserListVisible] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [teamName, setTeamName] = useState('');
    const [users, setUsers] = useState([]);
    const { organizationId } = useAuth();



    const getOrganizationUsers = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/organizations/${organizationId}/users`);
            setUsers(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

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

    const handleAddUser = (userId) => {
        setSelectedUsers([...selectedUsers, userId]);
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

    return (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <Title>Add Team</Title>
            <Input type="text" name="name" placeholder="Team Name" onChange={handleInputChange} value={teamName} />

            <Button onClick={() => setIsUserListVisible(!isUserListVisible)}>
                {isUserListVisible ? "Hide Users" : "Add Users"}
            </Button>

            {isUserListVisible && (
                <ul>
                    {users.map((user) => (
                        <li key={user.userId}>
                            <span>{user.email}</span>
                            <Button onClick={() => handleAddUser(user.userId)}>Add</Button>
                        </li>
                    ))}
                </ul>
            )}

            <h3>Selected Users:</h3>
            <ul>
                {selectedUsers.map((userId) => (
                    <li key={userId}>{users.find(user => user.userId === userId)?.email}</li>
                ))}
            </ul>

            <Button onClick={() => handleCreateTeam(teamName, selectedUsers)}>Add Team</Button>
        </Modal>
    );
};

export default CreateTeamModal;