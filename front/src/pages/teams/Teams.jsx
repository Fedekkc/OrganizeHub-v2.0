import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { CiCirclePlus } from 'react-icons/ci';
import UserList from '../../components/UserList';
import StatusIndicator from '../../components/StatusIndicator';
import { useAuth } from '../../context/Context';
import CreateTeamModal from '../../components/CreateTeamModal';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 20px;
    gap: 2rem;
    width: 100vw;
`;


const TeamsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
    align-items: center;
    justify-content: center;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border: 1px solid #ddd;
    width: 60%;
    min-height: 50vh;
    max-height: 80vh;
    overflow-y: scroll;
    scrollbar-width: none;
    -ms-overflow-style: none;

`;

const TeamTitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: top;
    //hacer que el texto se vaya hacia arriba
    margin-top: -1rem;
    
`;

const TeamUsersList = styled.ul`
    display: flex;
    align-items: top;
    
    border-radius: 8px;
    padding: 10px;
    list-style-type: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    width: 80%;
    height: 80%;
    margin: 0;
    
    

`;



const TeamCard = styled.div`
    background-color: #f9f9f9;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 8px;
    padding: 20px;
    margin: 10px;
    width: auto;
    height: 10rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    scroll-behavior: smooth;
    cursor: pointer;
    

`;

const TeamName = styled.h3`
    margin: 0;
    font-size: 1.2rem;
    color: #333;
    text-align: center;

`;


const UserListContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: top;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border: 1px solid #ddd;
    width: 20%;
    min-height: 50vh;
    max-height: 80vh;
`;



const UserListItem = styled.li`
    display: flex;
    align-items: center;
    justify-content: left;
    gap: 1rem;
    margin-bottom: 5px;
    color: #555;
    padding: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    height: 1rem;
    width: 100%;
`;

const Circle = styled(CiCirclePlus)`
    color: #333;
    font-size: 2em;
    cursor: pointer;
    transition: transform 0.3s;
    &:hover {
        transform: scale(1.1);

    }

`;

const CreateTeamCard = styled(TeamCard)`
    background-color: #f9f9f9;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    padding: 20px;
    margin: 10px;
    
    height: 10rem;
    font-size: 3rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);


`;


    


const Teams = () => {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [organizationId, setOrganizationId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { isAdmin } = useAuth();
    const navigate = useNavigate();

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
                    console.log(response.data)
                    setTeams(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Hubo un error al obtener los equipos', error);
                    setLoading(false);
                });
        }
    }, [organizationId]);

    const handleOpenTeam = (teamId) => {
        navigate(`/teams/${teamId}`);

    };



    if (loading) {
        return <p>Cargando equipos...</p>;
    }

    return (
        <Container>
        <TeamsContainer>
            {teams ? 
                teams.map(team => (
                    <TeamCard key={team.teamId} onClick={() => handleOpenTeam(team.teamId)}>
                        <TeamTitleContainer>
                        <TeamName>{team.name}</TeamName>
                        </TeamTitleContainer>
                        <TeamUsersList>
                            {team.users.map(user => (
                                <UserListItem key={user.userId}> 
                                <StatusIndicator online={user.isActive} />
                                 {user.firstName} {user.lastName}</UserListItem>
                            ))}
                        </TeamUsersList>
                    </TeamCard>
                )): (
                    <p>No hay equipos en esta organización.</p>
                )}
                {isAdmin && (
                    <CreateTeamCard>
                        <Circle onClick={() => setIsModalOpen(true)}/>
                        <CreateTeamModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} teams={teams} setTeams={setTeams} />
                    </CreateTeamCard>
                )}
                </TeamsContainer>
            <UserListContainer>
                <UserList />
            </UserListContainer>
        
        </Container>
    );
};

export default Teams;
