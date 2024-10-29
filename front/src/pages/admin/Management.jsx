import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Modal from '../../components/Modal';
import Button from '../../components/Button';
import CreateTeam from '../../components/admin/CreateTeam';
import AdminUsers from '../../components/admin/AdminUsers';
import InviteUser from '../../components/admin/InviteUser';
import Input from '../../components/Input';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    width: 100vw;
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
    height: 1rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    
    background-color: ${(props) => (props.isSelected ? 'grey' : '#f9f9f9')};
    color: #333;
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

const Management = () => {
    const organizationId = localStorage.getItem('organization');
    const [roles, setRoles] = useState([]);
    const [permissions, setPermissions] = useState(new Set());
    const [existingPermissions, setExistingPermissions] = useState([]);
    const [users, setUsers] = useState([]);
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
            console.log(organizationId);
        } catch (error) {
            console.error(`Error getting roles: ${error}`);
        }
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
            }
            return updatedPermissions;
        });
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
                            {existingPermissions.length > 0 ? (
                                existingPermissions.map((permission) => (
                                    <Permission
                                        key={permission.permissionId}
                                        isSelected={permissions.has(permission.permissionId.toString())}
                                        onClick={() => handlePermissionClick(permission.permissionId)}
                                    >
                                        {permission.name}
                                    </Permission>
                                ))
                            ) : (
                                <p>No hay permisos, problema en la base de datos</p>
                            )}
                        </PermissionsContainer>

                        <Button2 type="submit">Create Role</Button2>
                    </form>
                </Section>

                <Section>
                    <SectionTitle>Roles</SectionTitle>
                    {roles.length > 0 ? (
                        roles.map((role) => (
                            <Role key={role.roleId}>
                                <p>{role.name}</p>
                                <p>{role.description}</p>
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
