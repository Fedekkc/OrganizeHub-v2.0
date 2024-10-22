import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`;

const Title = styled.h1`
    font-size: 2em;
    color: #333;
`;

const Section = styled.div`
    width: 100%;
    max-width: 600px;
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

const Management = () => {
    const organizationId = localStorage.getItem('organization');
    const [roleName, setRoleName] = useState('');
    const [roleDescription, setRoleDescription] = useState('');
    const [permissions, setPermissions] = useState([]);

    useEffect(() => {
        getRoles(); // Cargar roles al inicio
        getPermissions(); // Cargar permisos al inicio
    }, []);

    const getRoles = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/roles/organization/${organizationId}`);
            console.log(`Roles: ${response.data}`);
        } catch (error) {
            console.error(`Error getting roles: ${error}`);
        }
    };

    const getPermissions = async () => {
        try {
            const response = await axios.get('http://localhost:5000/permissions');
            console.log(`Permissions: ${response.data}`);
        } catch (error) {
            console.error(`Error getting permissions: ${error}`);
        }
    };

    const createRole = async (e) => {
        e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

        const formData = new FormData();
        formData.append('roleName', roleName);
        formData.append('roleDescription', roleDescription);
        formData.append('organizationId', organizationId);
        formData.append('permissions', JSON.stringify(permissions));

        try {
            const response = await axios.post('http://localhost:5000/roles', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(`Role created successfully: ${response.data}`);
            // Resetear los campos después de crear el rol
            setRoleName('');
            setRoleDescription('');
            setPermissions([]);
        } catch (error) {
            console.error(`Error creating role: ${error}`);
        }
    };

    return (
        <Container>
            <Title>Management</Title>

            <Section>
                <SectionTitle>Create Role</SectionTitle>
                <form onSubmit={createRole}>
                    <Input 
                        type="text" 
                        placeholder="Role Name" 
                        value={roleName}
                        onChange={(e) => setRoleName(e.target.value)} 
                        required 
                    />
                    <Input 
                        type="text" 
                        placeholder="Role Description" 
                        value={roleDescription}
                        onChange={(e) => setRoleDescription(e.target.value)} 
                        required 
                    />
                    <Button type="submit">Create Role</Button>
                </form>
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
