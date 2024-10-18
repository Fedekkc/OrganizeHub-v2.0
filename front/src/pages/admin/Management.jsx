import React from 'react';
import styled from 'styled-components';

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
    return (
        <Container>
            <Title>Management</Title>
            
            <Section>
                <SectionTitle>Create Role</SectionTitle>
                <Input type="text" placeholder="Role Name" />
                <Button>Create Role</Button>
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
        </Container>
    );
};

export default Management;