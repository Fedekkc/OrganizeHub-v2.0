import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { CiCirclePlus, CiTrash } from 'react-icons/ci';
import UserList from '../../components/UserList';
import StatusIndicator from '../../components/StatusIndicator';
import { useAuth } from '../../context/Context';
import CreateTeamModal from '../../components/CreateTeamModal';
import { useNavigate } from 'react-router-dom';
import InfoTooltip from '../../components/InfoTooltip';

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
    justify-content: center;
    align-items: top;
    margin-top: -1rem;
    width: 80%;
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
    overflow: hidden;
    transition: transform 0.3s;

    &:hover {
        transform: scale(1.05);
    }
`;

const TeamName = styled.h3`
    margin: 0;
    font-size: 1rem;
    color: #333;
    text-align: center;
    overflow: hidden;
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
    color: white;
    font-size: 2em;
    cursor: pointer;
    transition: transform 0.3s;
`;

const CreateTeamCard = styled(TeamCard)`
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    padding: 20px;
    margin: 10px;
    border: 1px solid #ddd;
    height: 10rem;
    font-size: 3rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    transition: transform 0.3s;

    &:hover {
        transform: scale(1.05);
    }
`;

const DeleteTeamCard = styled(TeamCard)`
    background-color: #f9f9f9;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    padding: 20px;
    margin: 10px;
    border: 1px dashed #f00;
    height: 10rem;
    font-size: 3rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    transition: transform 0.3s;

    &:hover {
        transform: scale(1.05);
    }
`;

const Trash = styled(CiTrash)`
    color: #f00;
    font-size: 3rem;
    cursor: pointer;
    transition: transform 0.3s;
`;

// Styled components para el menú contextual
const ContextMenu = styled.div`
  position: absolute;
  top: ${({ position }) => position.top}px;
  left: ${({ position }) => position.left}px;
  background-color: white;
  border: 1px solid #ddd;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 10px;
  z-index: 100;
`;

const MenuItem = styled.div`
  padding: 8px 12px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;


const Teams = () => {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userInfo, setUserInfo] = useState({ show: false, text: '', position: {} });
    const [contextMenu, setContextMenu] = useState({ show: false, position: {} });


    const { isAdmin, organizationId } = useAuth();
    const navigate = useNavigate();


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

    const handleDuplicateTeam = (teamId) => {
        const teamToDuplicate = teams.find(team => team.teamId == teamId);
        var newTeam = {
            ...teamToDuplicate,
            teamId: null,        
            name: `${teamToDuplicate.name} (copia)`,
            organization: organizationId,
            users: teamToDuplicate.users.map(user => user.userId)
        };


        axios.post('http://localhost:5000/teams', newTeam)
            .then(response => {
                console.log('Equipo duplicado', response.data);
                setTeams(prevTeams => [...prevTeams, response.data]);
            })
            .catch(error => {
                console.error('Hubo un error al duplicar el equipo', error);
            });
    };





    const handleRightClick = (e, teamId) => {
        e.preventDefault(); // Evita que aparezca el menú contextual del navegador (IMPORTANTE)
        const position = { top: e.clientY, left: e.clientX };
        setContextMenu({ show: true, position, teamId });
    };

    const handleCloseMenu = () => {
        setContextMenu({ show: false, position: {} });
    };

    const handleMenuAction = (action) => {
        if (action === 'delete') {
            handleDeleteTeam(contextMenu.teamId);
        }
        if (action === 'edit') {
            handleOpenTeam(contextMenu.teamId);
        }
        if (action === 'duplicate') {
            handleDuplicateTeam(contextMenu.teamId);
        }


        setContextMenu({ show: false, position: {} });
    };



    const handleOpenTeam = (teamId) => {
        navigate(`/teams/${teamId}`);
    };

    const handleUserInfo = (text, e) => {
        const position = {
            top: e.target.getBoundingClientRect().top + window.scrollY,
            left: e.target.getBoundingClientRect().left + window.scrollX,
        };
        setUserInfo({ show: true, text, position });
    };

    const hideUserInfo = () => {
        setUserInfo({ show: false, text: '', position: {} });
    };

    const handleDragStart = (e, teamId) => {
        e.dataTransfer.setData('teamId', teamId);
    };

    const handleDrop = (e) => {
        const teamId = e.dataTransfer.getData('teamId');
        handleDeleteTeam(teamId);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDeleteTeam = (teamId) => {
        setTeams(prevTeams => prevTeams.filter(team => team.teamId != teamId));
        console.log(teams);
        axios.delete(`http://localhost:5000/teams/${teamId}`)
            .then(response => {
                console.log('Equipo eliminado', response.data);

            })
            .catch(error => {
                console.error('Hubo un error al eliminar el equipo', error);
            });
    };

    if (loading) {
        return <p>Cargando equipos...</p>;
    }

    return (
        <Container onClick={handleCloseMenu}>
            <TeamsContainer>
                {teams.length > 0 ? (
                    teams.map(team => (
                        <TeamCard
                            key={team.teamId}
                            onClick={() => handleOpenTeam(team.teamId)}
                            draggable
                            onDragStart={(e) => handleDragStart(e, team.teamId)}
                            onContextMenu={(e) => handleRightClick(e, team.teamId)}
                        >
                            <TeamTitleContainer>
                                <TeamName>{team.name}</TeamName>
                            </TeamTitleContainer>
                            <TeamUsersList>
                                {team.users.map(user => (
                                    <UserListItem key={user.userId} onMouseEnter={(e) => handleUserInfo(user.email, e)} onMouseLeave={hideUserInfo}>
                                        <StatusIndicator online={user.isActive} />
                                        {user.firstName} {user.lastName}
                                    </UserListItem>
                                ))}
                            </TeamUsersList>
                            {userInfo.show && (
                                <InfoTooltip style={{ top: userInfo.position.top + 30, left: userInfo.position.left }}>
                                    {userInfo.text}
                                </InfoTooltip>
                            )}
                        </TeamCard>
                    ))
                ) : (
                    null
                )}

                {isAdmin && (
                    <>
                        <CreateTeamCard>
                            <Circle onClick={() => setIsModalOpen(true)} />
                            <CreateTeamModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} teams={teams} setTeams={setTeams} />
                        </CreateTeamCard>
                        <DeleteTeamCard onDrop={handleDrop} onDragOver={handleDragOver}>
                            <Trash />
                        </DeleteTeamCard>
                        {contextMenu.show && (
                            <ContextMenu position={contextMenu.position}>
                                <MenuItem onClick={() => handleMenuAction('delete')}>Eliminar</MenuItem>
                                <MenuItem onClick={() => handleMenuAction('edit')}>Editar</MenuItem>
                                <MenuItem onClick={() => handleMenuAction('duplicate')}>Duplicar</MenuItem>
                            </ContextMenu>
                        )}
                    </>
                )}
            </TeamsContainer>
            <UserListContainer>
                <UserList />
            </UserListContainer>
        </Container>
    );
};

export default Teams;