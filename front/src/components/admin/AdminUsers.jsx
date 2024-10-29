import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Button from '../Button';
import Modal from '../Modal'; // Asegúrate de tener un componente Modal
import { useAuth } from '../../context/Context';
import moment from 'moment';
import { CiCalendar } from 'react-icons/ci';
import Input from '../Input';

const Container = styled.div`
    padding: 20px;
`;

const Title = styled.h1`
    margin-bottom: 20px;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

const Thead = styled.thead`
    background-color: #f4f4f4;
`;

const Th = styled.th`
    padding: 10px;
    border: 1px solid #ddd;
`;

const Tbody = styled.tbody``;

const Tr = styled.tr`
    &:nth-child(even) {
        background-color: #f9f9f9;
    }
`;

const Td = styled.td`
    padding: 10px;
    border: 1px solid #ddd;
`;

const Select = styled.select`
    margin: 10px 0;
    padding: 10px;
`;

const Option = styled.option``;



const TitulosContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Titulo = styled.h2`
    margin: 0;
`;

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const { userId } = useAuth();

    // Estados de los modales
    const [isEventModalOpen, setIsEventModalOpen] = useState(false);
    const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [eventName, setEventName] = useState('');
    const [teamId, setTeamId] = useState('');
    const [roleId, setRoleId] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('task');
    const [endingDate, setEndingDate] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [projects, setProjects] = useState([]);
    const [project, setProject] = useState(null);
    const [title, setTitle] = useState('');

    // Estados para roles y equipos
    const [teams, setTeams] = useState([]);
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const organizationId = localStorage.getItem('organization');

        // Cargar usuarios, equipos y roles desde el mismo endpoint
        axios.get(`http://localhost:5000/organizations/${organizationId}`)
            .then(response => {
                console.log(response.data);
                setUsers(response.data.users);
                setTeams(response.data.teams);
                setRoles(response.data.roles);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching:', error);
                setLoading(false);
            });
    };

    const handleAddEvent = () => {
        const eventData = {
            eventName: eventName,
            description: description,
            type: type,
            endingDate: endingDate,
            assignedBy: userId,
        };

        axios.post(`http://localhost:5000/users/${selectedUser}/events`, eventData)
            .then(response => {
                console.log(`Event "${eventName}" assigned to user ${selectedUser}`);
                setIsEventModalOpen(false);
                // Reinicia los estados del modal
                setEventName('');
                setDescription('');
                setType('task');
                setEndingDate(null);
                // Actualiza la lista si es necesario
            })
            .catch(error => {
                console.error('Error assigning event:', error);
            });
    };

    const handleAssignTeam = () => {
        const teamData = {
            teamId: teamId,
        };
        axios.post(`http://localhost:5000/users/${selectedUser}/teams`, teamData)
            .then(response => {
                console.log(`User ${selectedUser} assigned to team ID "${teamId}"`);
                setIsTeamModalOpen(false);
                setTeamId('');
                // Actualiza la lista si es necesario
            })
            .catch(error => {
                console.error('Error assigning team:', error);
            });
    };

    const handleDeleteUser = () => {
        if (selectedUser === userId) {
            console.log("Cannot delete the current user");
            return;
        }
        axios.delete(`http://localhost:5000/users/${selectedUser}`)
            .then(response => {
                console.log(`User ${selectedUser} deleted`);
                setUsers(users.filter(user => user.userId !== selectedUser));
                setIsDeleteModalOpen(false);
            })
            .catch(error => {
                console.error('Error deleting user:', error);
            });
    };

    const handleAssignRole = () => {
        const roleData = {
            roleId: roleId,
        };
        axios.put(`http://localhost:5000/users/${selectedUser}/role`, roleData)
            .then(response => {
                console.log(`Role ID "${roleId}" assigned to user ${selectedUser}`);
                setIsRoleModalOpen(false);
                setRoleId('');
            })
            .catch(error => {
                console.error('Error assigning role:', error);
            });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <Title>Admin Users</Title>
            <Table>
                <Thead>
                    <tr>
                        <Th>Name</Th>
                        <Th>Email</Th>
                        <Th>Actions</Th>
                    </tr>
                </Thead>
                <Tbody>
                    {users.map(user => (
                        <>
                        <Tr key={user.userId}>
                            <Td>{user.firstName}</Td>
                            <Td>{user.email}</Td>
                            <Td>
                                <Button onClick={() => { setSelectedUser(user.userId); setIsEventModalOpen(true); }}>Assign Event</Button>
                                <Button onClick={() => { setSelectedUser(user.userId); setIsTeamModalOpen(true); }}>Assign Team</Button>
                                <Button onClick={() => { setSelectedUser(user.userId); setIsDeleteModalOpen(true); }}>Delete</Button>
                                <Button onClick={() => { setSelectedUser(user.userId); setIsRoleModalOpen(true); }}>Assign Role</Button>
                            </Td>
                        </Tr>
                        </>
                    ))}
                </Tbody>
            </Table>

            {/* Modales */}
            <Modal isOpen={isEventModalOpen} onClose={() => setIsEventModalOpen(false)}>
                    <Titulo>Agregar Evento - {moment(selectedDate).format('DD/MM/YYYY')} <CiCalendar /> </Titulo>
                <Select onChange={(e) => setType(e.target.value)}>
                    <Option value="task">Tarea</Option>
                    <Option value="meeting">Reunión</Option>
                </Select>

                <Select onChange={(e) => setProject(parseInt(e.target.value))}>
                    {projects.map((project) => (
                        <Option key={project.projectId} value={project.projectId}>{project.name}</Option>
                    ))}
                </Select>

                <Input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Agregar título"
                />

                <Input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Agregar descripción"
                />
                {type === 'meeting' ? (
                    <Input
                        type="time"
                        onChange={(e) => {
                            const endDate = new Date(selectedDate);
                            const [hours, minutes] = e.target.value.split(':');

                            endDate.setHours(hours);
                            endDate.setMinutes(minutes);
                            setEndingDate(endDate);
                        }}
                        placeholder="Seleccionar hora de finalización"
                        value={endingDate ? moment(endingDate).format('HH:mm') : ''}
                    />
                ) : (
                    <Input
                        type="datetime-local"
                        onChange={(e) => setEndingDate(new Date(e.target.value))}
                        placeholder="Seleccionar fecha y hora de finalización"
                        min={moment().format('YYYY-MM-DDTHH:mm')}
                    />
                )}

                <Button onClick={handleAddEvent}>Agregar Evento</Button>
            </Modal>

            <Modal isOpen={isTeamModalOpen} onClose={() => setIsTeamModalOpen(false)}>
                <Title>Assign Team</Title>
                <Select value={teamId} onChange={(e) => setTeamId(e.target.value)}>
                    <Option value="">Select a team</Option>
                    {teams.map(team => (
                        <Option key={team.teamId} value={team.teamId}>
                            {team.name}
                        </Option>
                    ))}
                </Select>
                <Button onClick={handleAssignTeam}>Confirm</Button>
            </Modal>

            <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
                <Title>Delete User</Title>
                <p>Are you sure you want to delete this user?</p>
                <Button onClick={handleDeleteUser}>Yes</Button>
                <Button onClick={() => setIsDeleteModalOpen(false)}>No</Button>
            </Modal>

            <Modal isOpen={isRoleModalOpen} onClose={() => setIsRoleModalOpen(false)}>
                <Title>Assign Role</Title>
                <Select value={roleId} onChange={(e) => setRoleId(e.target.value)}>
                    <Option value="">Select a role</Option>
                    {roles.map(role => (
                        <Option key={role.roleId} value={role.roleId}>
                            {role.name}
                        </Option>
                    ))}
                </Select>
                <Button onClick={handleAssignRole}>Confirm</Button>
            </Modal>
        </Container>

    );
};

export default AdminUsers;
