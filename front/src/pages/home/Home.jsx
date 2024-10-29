import React from 'react';
import styled from 'styled-components';

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
`;

const Description = styled.p`
    font-size: 1.2rem;
    color: #666;
`;

const Home = () => {
    return (
        <HomeContainer>
            <Title>Home Page</Title>
            <Description>[Accesos directos a las funciones más usadas]</Description>
        </HomeContainer>
    );
};

export default Home;