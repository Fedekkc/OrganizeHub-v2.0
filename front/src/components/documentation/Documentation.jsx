import React from 'react';
import styled from 'styled-components';


const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    gap: 1rem;


`;

const UsersContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    justify-content: center;
    align-items: center;
`;

const ListContainer = styled.div`
    display: flex;
    gap: 1rem;
    padding: 1rem;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    box-shadow: 7px 8px 23px 0px rgba(0,0,0,0.61);
    width: 80%;
`;
const List = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    align-items: center;
`;
const ListItem = styled.div`
    padding: 1rem;
    display: flex;
    flex-direction: row;
    gap: 1rem;
    height: 2rem;
    width: 80%;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    box-shadow: 7px 8px 23px 0px rgba(0,0,0,0.61);
    -webkit-box-shadow: 7px 8px 23px 0px rgba(0,0,0,0.61);
    -moz-box-shadow: 7px 8px 23px 0px rgba(0,0,0,0.61);

    &:hover {
        cursor:pointer;
        transition: ease 0.1s;
        transform: scale(1.05);
    }
`;

const ProjectLogo = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
`;

const ProjectInfo = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;
    align-items: center;
    justify-content: space-between;
`;
const ProjectTitle = styled.h2`
    font-size: 1rem;
    font-weight: bold;
`;

const ProjectDescription = styled.p`
    font-size: 1rem;
`;

const projects = [
    {
        title: 'Proyecto 1',
        description: 'Descripción del proyecto 1',
        logo: 'https://cinefilosoficial.com/wp-content/uploads/2020/11/michael-scott.jpg',
    },
    {
        title: 'Proyecto 2',
        description: 'Descripción del proyecto 2',
        logo: 'https://cinefilosoficial.com/wp-content/uploads/2020/11/michael-scott.jpg',
    },
    {
        title: 'Proyecto 3',
        description: 'Descripción del proyecto 3',
        logo: 'https://cinefilosoficial.com/wp-content/uploads/2020/11/michael-scott.jpg',
    },
    {
        title: 'Proyecto 4',
        description: 'Descripción del proyecto 4',
        logo: 'https://cinefilosoficial.com/wp-content/uploads/2020/11/michael-scott.jpg',
    },
    {
        title: 'Proyecto 5',
        description: 'Descripción del proyecto 5',
        logo: 'https://cinefilosoficial.com/wp-content/uploads/2020/11/michael-scott.jpg',
    },
    {
        title: 'Proyecto 6',
        description: 'Descripción del proyecto 6',
        logo: 'https://cinefilosoficial.com/wp-content/uploads/2020/11/michael-scott.jpg',
    },
];


const Documentation = () => {
    return (
        <Container>
            <ListContainer>
                <List>
                    {projects.map((project, index) => (
                        <ListItem key={index}>
                            <ProjectLogo src={project.logo} alt={project.title} />
                            <ProjectInfo>
                                <ProjectTitle>{project.title}</ProjectTitle>
                                <ProjectDescription>{project.description}</ProjectDescription>
                            </ProjectInfo>
                        </ListItem>
                    ))}
                </List>
            </ListContainer>
            <UsersContainer>
                <h2>Usuarios</h2>
                <List>
                    <ListItem>
                        <p>Usuario 1</p>
                    </ListItem>
                    <ListItem>
                        <p>Usuario 2</p>
                    </ListItem>
                    <ListItem>
                        <p>Usuario 3</p>
                    </ListItem>
                    <ListItem>
                        <p>Usuario 4</p>
                    </ListItem>
                    <ListItem>
                        <p>Usuario 5</p>
                    </ListItem>
                    <ListItem>
                        <p>Usuario 6</p>
                    </ListItem>
                </List>
            </UsersContainer>
        </Container>
    );
};


export default Documentation;