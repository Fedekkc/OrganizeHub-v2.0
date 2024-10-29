import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../context/Context';
import Button from '../../components/Button';
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";



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

const InvitationsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 5px;

`;

const Invitation = styled.div`
    display: flex;
    gap: 1rem;
    align-items: center;
`;

const Section = styled.div`
    width: 70%;
    margin: 2rem 0;
    padding: 2rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    gap: 2rem;

`;

const OrganizationsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    justify-content: center;
    align-items: center;

`;

const Input = styled.input`
    padding: 10px;
    margin: 10px 0;
    background-color: transparent;
    border: 1px solid #ccc;
    border-radius: 4px;
    color: #ccc;
`;

const AcceptButton = styled(Button)`

    &:hover {
        background-color: rgba(0, 255, 0, 0.5);
    }
`;

const RejectButton = styled(Button)`
    
    &:hover {
        background-color: rgba(255, 0, 0, 0.8);
    }
`;




const AssignOrg = () => {
    const navigate = useNavigate();
    const [orgId, setOrgId] = useState('');
    const [invitation, setInvitation] = useState();
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
                setInvitation(res.data);
            })
            .catch((err) => {
                console.log(err);
            }
        );
    }

    const handleCreate = () => {
        navigate('/organization/create');
    }

    const handleAccept = () => {
        axios.post(`http://localhost:5000/invitations/accept/${invitation.invitationId}`)
            .then((res) => {
                console.log(res.data);
                navigate('/home');
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const handleReject = () => {
        axios.post(`http://localhost:5000/invitations/reject/${invitation.invitationId}`)
            .then((res) => {
                console.log(res.data);
                navigate('/home');
            })
            .catch((err) => {
                console.log(err);
            });
    }


    return (
        <Container>
            <Section>
                <OrganizationsContainer>
            <Title>Join or Create an Organization</Title>
            <SearcherContainer>
                <Input type="text" placeholder="Organization ID" value={orgId} onChange={(e) => setOrgId(e.target.value)} />
                <Button onClick={handleSearch}>Search</Button>
                
            </SearcherContainer>
            OR... 
            <Button onClick={handleCreate}>Create a new organization</Button>
            </OrganizationsContainer>
            </Section>

            {invitation ?
                <InvitationsContainer>
                    <h2>Invitation</h2>
                    <Invitation>
                        <p>You have been invited to join the organization {invitation.organization.name}</p>
                        <AcceptButton onClick={(e) => handleAccept}>
                            <FaCheck />
                        </AcceptButton>
                        <RejectButton onClick={(e) => handleReject }>   
                            <ImCross /> 
                        </RejectButton>
                    </Invitation>
                </InvitationsContainer>
                : null            
            }





        </Container>

    );
};

export default AssignOrg;