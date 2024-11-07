import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Input from '../../components/Input';
import Button from '../../components/Button';
import styled from 'styled-components';

const Container = styled.div`   
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    width: 100vw;
`;

const Section = styled.div` 
    width: 100%;
    margin: 2rem 0;
    padding: 2rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    gap: 2rem;
`;

const SectionTitle = styled.h2`
    font-size: 1.5em;
    color: #555;
    margin-bottom: 10px;
`;


const Team = () => {
    const [team, setTeam] = useState([]);
    const [newMember, setNewMember] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [updatedTeam, setUpdatedTeam] = useState({});

    const teamId = useParams().teamId;

    useEffect(() => {
        fetchTeam();
        console.log(team);
    }, []);

    const fetchTeam = async () => {
        try {
            console.log(teamId);
            await axios.get(`http://localhost:5000/teams/${teamId}`)
                .then(response => {
                    console.log(response.data);
                    setTeam(response.data);
                })
                .catch(error => {
                    console.error('Error fetching team:', error);
                });

        } catch (error) {
            console.error('Error fetching team:', error);
        }
    };

    const handleAddMember = async () => {
        try {
            const response = await axios.post(`http://localhost:5000/teams/${teamId}/users`, { name: newMember });
            setTeam(response.data);
            setNewMember('');
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    const handleDeleteMember = async (userId) => {
        try {
            const response = await axios.delete(`http://localhost:5000/teams/${teamId}/users/${userId}`);
            setTeam(response.data);
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleUpdateTeam = async () => {
        try {
            const response = await axios.put(`http://localhost:5000/teams/${teamId}`, updatedTeam);
            setTeam(response.data);
            setEditMode(false);
        } catch (error) {
            console.error('Error updating team:', error);
        }
    };

    return (
        <Container>
            <SectionTitle>Team: {team.name}</SectionTitle>
            <Button onClick={() => setEditMode(!editMode)}>Edit Team</Button>
            {editMode ? (
                <Section>
                    <Input
                        type="text"
                        value={updatedTeam.name}
                        onChange={(e) => setUpdatedTeam({ ...updatedTeam, name: e.target.value })}
                    />
                    <Button onClick={handleUpdateTeam}>Save</Button>
                </Section>
            ) : (
                <Section>
                    <SectionTitle>Members</SectionTitle>
                    <ul>
                        {team.users && team.users.map((user) => (
                            <li key={user.userId}>
                                {user.firstName} {user.lastName}
                                <Button onClick={() => handleDeleteMember(user.userId)}>Delete</Button>
                            </li>
                        ))}
                    </ul>
                    <Input
                        type="text"
                        value={newMember}
                        onChange={(e) => setNewMember(e.target.value)}
                    />
                    <Button onClick={handleAddMember}>Add Member</Button>
                    <Section>
                        <SectionTitle>Tasks</SectionTitle>
                        <ul>
                            {team.tasks && team.tasks.map((task) => (
                                <li key={task.taskId}>
                                    {task.name}
                                </li>
                            ))}
                        </ul>
                    </Section>
                </Section>



            )}

        </Container>
    );
};

export default Team;
