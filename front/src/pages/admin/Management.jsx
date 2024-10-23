import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

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
    
    margin: 20px 0;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
`;

const SectionTitle = styled.h2`
    font-size: 1.5em;
    color: #555;
    margin-bottom: 10px;
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const Button = styled.button`
    background-color: #007BFF;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 1em;
    cursor: pointer;
    border-radius: 5px;
    margin-top: 20px;

    &:hover {
        background-color: #0056b3;
    }
`;

const Checkbox = styled.input`
    display: none;
    width: 100%;
`;

const PermissionSection = styled(Section)`
    display: flex;
    flex-wrap: row;
    justify-content: left;
    width: 50%;
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

    &:hover {
        background-color: #f0f0f0;
    }
`;

const Label = styled.label`
    width: 100%;
    
    cursor: pointer;
`;

const Management = () => {
    const organizationId = localStorage.getItem('organization');
    const [roles, setRoles] = useState([]);
    const [permissions, setPermissions] = useState([]);
    const [existingPermissions, setExistingPermissions] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        organizationId: parseInt(organizationId, 10),
        permissions: [],
    });

    useEffect(() => {
        getRoles(); // Cargar roles al inicio
        getPermissions(); // Cargar permisos al inicio
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
            console.log(response.data);
        } catch (error) {
            console.error(`Error getting roles: ${error}`);
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
        e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
                        
        setFormData((prevFormData) => ({
            ...prevFormData,
            permissions: permissions.map((permission) => parseInt(permission, 10)),
        }));

        

        console.log(formData);

        try {
            const response = await axios.post('http://localhost:5000/roles', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(`Role created successfully: ${response.data}`);
            setFormData({
                name: '',
                description: '',
                permissions: [],
            });
            setPermissions([]);
        } catch (error) {
            console.log(error);

        }
    };

    const handlePermissionChange = (e) => {
        if (e.target.checked) {
            setPermissions([...permissions, e.target.value]);
            
            e.target.parentElement.style.backgroundColor = 'grey';
            console.log(e.target.parentElement);
        } else {
            setPermissions(permissions.filter((permission) => permission !== e.target.value));
            e.target.parentElement.style.backgroundColor = '#f9f9f9';
        }
    }

    return (
        <Container>
            <Title>Management</Title>
            <Section style={
                {
                    display: 'flex',
                    width: '80%',
                    flexDirection: 'row',
                    

                }
            }>
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
                        onChange={ handleChange} 
                        required 
                    />
                    <Section>
                        <SectionTitle>Permissions</SectionTitle>
                        {existingPermissions.length > 0 ? (
                            existingPermissions.map((permission) => (
                                <PermissionSection key={permission.permissionId}>
                                    <Checkbox 
                                        type="checkbox" 
                                        id={permission.permissionId} 
                                        name={permission.permissionName} 
                                        value={permission.permissionId}
                                        onChange={(e) => {
                                            handlePermissionChange(e);
                                        }}
                                    />
                                    <Label htmlFor={permission.permissionId}>{permission.name}</Label>
                                </PermissionSection>
                            ))
                        ) : (
                            <p>No hay permisos, problema en la base de datos</p>
                        )}
                    </Section>

                    <Button type="submit">Create Role</Button>
                </form>
            </Section>
            <Section>
                <SectionTitle>Roles</SectionTitle>
                {roles.length > 0 ? (
                    roles.map((role) => (
                        <Section key={role.roleId}>
                            <SectionTitle>{role.name}</SectionTitle>
                            <p>{role.description}</p>
                            <p>Permissions:</p>
                            <ul>
                                {role.permissions.map((permission) => (
                                    <li key={permission.permissionId}>{permission.name}</li>
                                ))}
                            </ul>
                        </Section>
                    ))
                ) : (
                    <p>No roles found</p>
                )}


                
            </Section>



            </Section>

            <Section>
                <SectionTitle>Create Team</SectionTitle>
                <Input type="text" placeholder="Team Name" />
                <Button>Create Team</Button>
            </Section>

            <Section>
                <SectionTitle>Invite User</SectionTitle>
                <Input type="email" placeholder="User Email" />
                <Button>Invite User</Button>
            </Section>

            <Section>
                <SectionTitle>Permissions</SectionTitle>

            </Section>
        </Container>
    );
};

export default Management;
