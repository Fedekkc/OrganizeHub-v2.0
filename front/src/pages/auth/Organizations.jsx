import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../context/Context';

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
    const [invitations, setInvitations] = useState([]);
    const { userEmail } = useAuth();

    useEffect(() => {
        console.log(userEmail);
        getInvitations();
    }, []);

    const handleSearch = () => {
        axios.get('http://localhost:5000/organizations', { orgId })
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });

    }

    const getInvitations = () => {
        axios.get(`http://localhost:5000/invitations/email/${userEmail}`)
            .then((res) => {
                
                if (res.data.length > 0) {
                    console.log(res.data);
                    setInvitations(res.data);
                    console.log(invitations);
                } else {
                    setInvitations([]);
                }
            })
            .catch((err) => {
                console.log(err);
            }
        );
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


            <Title>Invitations</Title>
            <ul>
                {invitations.length > 0 ? (
                    invitations.map((invitation) => (
                        <li key={invitation.invitationId}>{invitation.organization.name}</li>
                    ))
                ) : (
                    <li>No invitations found.</li>
                )}
            </ul>





        </Container>

    );
};

export default AssignOrg;