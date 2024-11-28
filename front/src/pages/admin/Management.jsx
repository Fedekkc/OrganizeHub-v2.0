import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Modal from '../../components/Modal';
import Button from '../../components/Button';
import CreateTeam from '../../components/admin/CreateTeam';
import AdminUsers from '../../components/admin/AdminUsers';
import InviteUser from '../../components/admin/InviteUser';
import Input from '../../components/Input';
import InfoTooltip from '../../components/InfoTooltip';
import { CiCirclePlus } from 'react-icons/ci';
import { RxCross1 } from "react-icons/rx";


const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    width: 90vw;
`;

const Title = styled.h1`
    font-size: 2em;
    color: #333;
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

const PermissionsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid #ddd;
    border-radius: 5px;
`;

const Permission = styled(Section)`
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
    padding: 10px;
    width: 70%;
    height: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: ${(props) => (props.isSelected ? 'grey' : 'transparent')};
    color: lightgrey;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s;
    &:hover {
        background-color: ${(props) => (props.isSelected ? '#f9f9f9' : 'grey')};
    }
    margin: 0 0 15px 0;
`;

const Role = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin: 10px 0;
    background-color: #f9f9f9;
    color: #333;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s;
    text-align: left;
    width: 50%;

    &:hover {
        background-color: grey;
    }
`;

const Button2 = styled(Button)`
    width: 100%;
`;

const Circle = styled(CiCirclePlus)`
    font-size: 2em;
    color: white;
    cursor: pointer;

    &:hover {
        color: green;
    }
`;

const PermissionHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    width: 100%;
    margin: 1rem;
`;

const SuggestionsList = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0;
    max-height: 150px;
    max-width: 20rem;
    overflow-y: auto;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    position: absolute;
    top: 85%;
    width: 100%;
    z-index: 1000;
`;

const SuggestionItem = styled.li`
    padding: 2px;
    border-bottom: 1px solid #ddd;
    width: 100%;
    max-width: 15rem;
    
    &:last-child {
        border-bottom: none;
    }

    &:hover {
        background-color: #f9f9f9;
        cursor: pointer;
    }
`;

const SelectedPermissionsList = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 10px 0 0 0;
    width: 100%;
    display: grid;
    gap: 5px;
    grid-template-columns: 1fr 1fr;


`;

const SelectedPermissionItem = styled.li`
    padding: 5px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    margin: 5px 0;
    color: grey;
    font-size: 1rem;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
    
    
`;

const Cross = styled(RxCross1)`
    margin-top: 5px;
    font-size: 0.7em;
    color: white;
    cursor: pointer;
    border-radius: 50%;

    &:hover {
        background-color: grey;
    }
`;

const Management = () => {
    const organizationId = localStorage.getItem('organization');
    const [roles, setRoles] = useState([]);
    const [permissions, setPermissions] = useState([]); 
    const [existingPermissions, setExistingPermissions] = useState([]);
    const [users, setUsers] = useState([]);
    const [isBrowserOpen, setIsBrowserOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [roleInfo, setRoleInfo] = useState({
        show: false,
        text: '',
        position: { top: 0, left: 0 }
    });

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const addPermission = (permission) => {
        setPermissions([...permissions, permission]);

    };

    const suggestedPermissions = existingPermissions.filter(perm =>
        perm.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleRoleInfo = (text, e) => {
        const position = {
            top: e.target.getBoundingClientRect().top + window.scrollY,
            left: e.target.getBoundingClientRect().left + window.scrollX,
        };
        setRoleInfo({ show: true, text, position });
    };

    const hideRoleInfo = () => {
        setRoleInfo({ show: false, text: '', position: { top: 0, left: 0 } });
    };

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        organizationId: parseInt(organizationId, 10),
        permissions: [],
    });

    useEffect(() => {
        getRoles(); // Cargar roles al inicio
        getPermissions(); // Cargar permisos al inicio
        getOrganizationUsers(); // Cargar usuarios al inicio
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const getRoles = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/roles/organization/${organizationId}`);
            setRoles(response.data);
            
        } catch (error) {
            console.error(`Error getting roles: ${error}`);
        }
    };

   

    const getOrganizationUsers = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/organizations/${organizationId}/users`);
            setUsers(response.data);
            
        } catch (error) {
            console.log(error);
        }
    };

    const getPermissions = async () => {
        try {
            const response = await axios.get('http://localhost:5000/permissions');
            
            setExistingPermissions(response.data);
        } catch (error) {
            console.error(`Error getting permissions: ${error}`);
        }
    };

    const createRole = async (e) => {
        e.preventDefault();

        const newRoleData = {
            ...formData,
            organizationId: parseInt(organizationId, 10),
            permissions: Array.from(permissions).map((perm) => parseInt(perm, 10)),
        };

        try {
            const response = await axios.post('http://localhost:5000/roles', newRoleData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setFormData({
                name: '',
                description: '',
                permissions: [],
            });
            setPermissions(new Set());
            setRoles([...roles, response.data]);
        } catch (error) {
            console.log(error);
        }
    };

    const handlePermissionClick = (permissionId) => {
        setPermissions((prevPermissions) => {
            const updatedPermissions = new Set(prevPermissions);
            if (updatedPermissions.has(permissionId.toString())) {
                updatedPermissions.delete(permissionId.toString());
            } else {
                updatedPermissions.add(permissionId.toString());
                addPermission(permissionId.toString());
            }
            return updatedPermissions;
        });
    };

    const handleRemovePermission  = (permissionId) => {
        setPermissions((prevPermissions) => {
            const updatedPermissions = new Set(prevPermissions);
            updatedPermissions.delete(permissionId.toString());
            return updatedPermissions;
        });

    }

    const handleBrowser = () => {
        setIsBrowserOpen(!isBrowserOpen);
    };

    return (
        <Container>
            <Title>Management</Title>
            <Section style={{ display: 'flex', width: '80%', flexDirection: 'row' }}>
                <Section>
                    <SectionTitle>Create Role</SectionTitle>
                    <form onSubmit={createRole}>
                        <Input  
                            type="text"
                            placeholder="Role Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            type="text"
                            placeholder="Role Description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />

                        <PermissionsContainer>
                        <SectionTitle>Permissions</SectionTitle>
                            <PermissionHeader>
                              
                                {isBrowserOpen && (
                                    <Input
                                        style={{ width: '20rem' }}
                                        type="text"
                                        placeholder="Search Permissions"
                                        value={searchTerm}
                                        onChange={handleSearchChange}

                                    />
                                )}
                                {isBrowserOpen && searchTerm && (
                                    <SuggestionsList>
                                        {suggestedPermissions.map((perm) => (
                                            <SuggestionItem key={perm.permissionId} onClick={() => handlePermissionClick(perm.permissionId)}>
                                                {perm.name} 
                                            </SuggestionItem>
                                        ))}
                                    </SuggestionsList>
                                )}
                                <Circle onClick={handleBrowser} />
                            </PermissionHeader>

                            <SelectedPermissionsList>
                                {Array.from(permissions).map((permId) => {
                                    const perm = existingPermissions.find(p => p.permissionId.toString() === permId);
                                    return (
                                        <SelectedPermissionItem key={permId}>
                                            {perm ? perm.name : 'Unknown Permission'} 
                                            <Cross onClick={() => handleRemovePermission(permId)}
                                            />
                                        </SelectedPermissionItem>
                                    );
                                })}
                            </SelectedPermissionsList>
                        </PermissionsContainer>

                        <Button2 type="submit">Create Role</Button2>
                    </form>
                </Section>

                <Section>
                    <SectionTitle>Roles</SectionTitle>
                    {roles.length > 0 ? (
                        roles.map((role) => (
                            <Role key={role.roleId} onMouseEnter={(e) => handleRoleInfo(role.description, e)} onMouseLeave={hideRoleInfo}>
                                <p>{role.name}</p>
                                {roleInfo.show && (
                                    <InfoTooltip style={{ top: roleInfo.position.top + 30, left: roleInfo.position.left }}>
                                        {roleInfo.text}
                                    </InfoTooltip>
                                )}
                            </Role>
                        ))
                    ) : (
                        <p>No roles found</p>
                    )}
                </Section>
            </Section>
            <CreateTeam users={users} organizationId={organizationId} />
            <InviteUser />
            <AdminUsers />
        </Container>
    );
};

export default Management;