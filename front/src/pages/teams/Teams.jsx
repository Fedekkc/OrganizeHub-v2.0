// /c:/Users/fede1/Desktop/Trabajo Naza/front/src/pages/teams/Teams.jsx

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

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
`;

const TeamName = styled.h2`
    margin: 0;
    font-size: 1.5em;
    color: #333;
`;

const TeamDescription = styled.p`
    font-size: 1em;
    color: #666;
`;

const Teams = () => {
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        axios.get('https://api.example.com/teams')
            .then(response => {
                setTeams(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the teams!', error);
            });
    }, []);



    return (
        <TeamsContainer>

            {teams.map(team => (
                <TeamCard key={team.id}>
                    <TeamName>{team.name}</TeamName>
                    <TeamDescription>{team.description}</TeamDescription>
                </TeamCard>
            ))}
        </TeamsContainer>
    );
};

export default Teams;