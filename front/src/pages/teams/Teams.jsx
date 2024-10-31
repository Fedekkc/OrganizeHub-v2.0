import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { CiCirclePlus } from 'react-icons/ci';

const TeamsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`;

const TeamCard = styled.div`
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    margin: 10px;
    width: 300px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    position: relative;

    &:hover .user-list {
        display: block;
    }
`;

const TeamName = styled.h2`
    margin: 0;
    font-size: 1.5em;
    color: #333;
`;

const UserList = styled.ul`
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 10px;
    list-style-type: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 100%;
    z-index: 1;
`;

const UserListItem = styled.li`
    margin-bottom: 5px;
    color: #555;
`;

const Circle = styled(CiCirclePlus)`
    color: #333;
    font-size: 2em;
    cursor: pointer;
`;


const Teams = () => {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [organizationId, setOrganizationId] = useState(null);

    useEffect(() => {
        const storedOrganizationId = localStorage.getItem('organization');

        if (storedOrganizationId) {
            setOrganizationId(storedOrganizationId);
        } else {
            console.error('No se encontró el organizationId en localStorage');
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (organizationId) {
            axios.get(`http://localhost:5000/teams/organization/${organizationId}`)
                .then(response => {
                    setTeams(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Hubo un error al obtener los equipos', error);
                    setLoading(false);
                });
        }
    }, [organizationId]);

    if (loading) {
        return <p>Cargando equipos...</p>;
    }

    return (
        <TeamsContainer>
            {teams.length > 0 ? (
                teams.map(team => (
                    <TeamCard key={team.teamId}>
                        <TeamName>{team.name}</TeamName>
                        <UserList className="user-list">
                            {team.users && team.users.length > 0 ? (
                                team.users.map(user => (
                                    <UserListItem key={user.userId}>{user.firstName} {user.lastName}</UserListItem>
                                ))
                            ) : (
                                <UserListItem>No hay usuarios en este equipo.</UserListItem>
                            )}
                        </UserList>
                    </TeamCard>
                ))
            ) : (
                
                <TeamCard>
                    <Circle />
                </TeamCard>   
                    


            )}
        </TeamsContainer>
    );
};

export default Teams;
