import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`;

const Title = styled.h2`
    margin-bottom: 20px;
`;

const SearcherContainer = styled.div`
    display: flex;
    gap: 1rem;
    align-items: center;
`;


const AssignOrg = () => {
    const navigate = useNavigate();
    const [orgId, setOrgId] = useState('');

    const handleSearch = () => {
        axios.get('http://localhost:5000/organizations', { orgId })
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });

    }

    const handleCreate = () => {
        navigate('/organization/create');
    }

    return (
        <Container>
            <Title>Join or Create an Organization</Title>
            <SearcherContainer>
                <input type="text" placeholder="Organization ID" value={orgId} onChange={(e) => setOrgId(e.target.value)} />
                <button onClick={handleSearch}>Search</button>
                
            </SearcherContainer>
            OR... 
            <button onClick={handleCreate}>Create a new organization</button>

            

        </Container>
    );
};

export default AssignOrg;