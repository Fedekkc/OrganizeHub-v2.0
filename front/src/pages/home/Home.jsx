import React from 'react';
import styled from 'styled-components';

const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f0f0f0;
`;

const Title = styled.h1`
    font-size: 2.5rem;
    color: #333;
`;

const Description = styled.p`
    font-size: 1.2rem;
    color: #666;
`;

const Home = () => {
    return (
        <HomeContainer>
            <Title>Welcome to Home</Title>
            <Description>This is the home page of our application.</Description>
        </HomeContainer>
    );
};

export default Home;