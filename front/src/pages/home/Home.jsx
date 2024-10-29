import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100%;
`;

const Title = styled.h1`
    font-size: 2.5rem;
    color: #333;
    margin-bottom: 1rem;
`;

const Description = styled.p`
    font-size: 1.2rem;
    color: #666;
    margin-bottom: 2rem;
`;

const CardContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    width: 80%;
    justify-content: center;
    align-items: center;

    div {
        display: flex;
        align-items: center;
        justify-content: center;
        &:hover {
            background-color: white;
        }

    }

`;

const Card = styled.div`
    background-color: #f8f9fa;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height:10rem;
    width: 10rem;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 2rem;
    text-align: center;
    cursor: pointer;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
        transform: translateY(-10px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }
`;

const CardTitle = styled.h2`
    font-size: 1.5rem;
    color: #333;
    margin-bottom: 0.5rem;
`;

const Home = () => {
    const navigate = useNavigate();

    return (
        <HomeContainer>
            <Title>Home Page</Title>
            <CardContainer>
                <Card onClick={() => navigate('/attendance')}>
                    <CardTitle>Attendance</CardTitle>
                </Card>
                <Card onClick={() => navigate('/teams')}>
                    <CardTitle>Teams</CardTitle>
                </Card>
                <Card onClick={() => navigate('/documentation')}>
                    <CardTitle>Documentation</CardTitle>
                </Card>
                <Card onClick={() => navigate('/passwords')}>
                    <CardTitle>Passwords</CardTitle>
                </Card>
            </CardContainer>
        </HomeContainer>
    );
};

export default Home;
