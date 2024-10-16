import React, { useEffect } from 'react';
import styled from 'styled-components';
import { BiBlanket } from 'react-icons/bi';
import { BsDiagram2 } from 'react-icons/bs';
import { CiCirclePlus} from 'react-icons/ci';
import { useAuth } from '../../context/Context';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
    border: 1px solid #ccc;
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
    justify-content: left;
    border-radius: 10px;
    border: 1px solid #ccc;

    &:hover {
        cursor: pointer;
        transition: ease 0.1s;
        transform: scale(1.02);
        border: 1px solid #DBEEB4;
        background-color: rgba(255, 255, 255, 0.1);
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
    justify-content: left;
`;

const ProjectTitle = styled.h2`
    font-size: 1rem;
    font-weight: bold;
    color: white;
`;

const ProjectDescription = styled.p`
    font-size: 1rem;
    color: white;
`;

const ItemIcons = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;
    align-items: center;
    justify-content: space-between;
`;

const ItemInfoContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`;

const IconBiBlanket = styled(BiBlanket)`
    color: white;
    font-size: 1.5rem;

    &:hover {
        cursor: pointer;
        transition: ease 0.1s;
        transform: scale(1.02);
        color: #DBEEB4;
    }
`;

const IconBsDiagram2 = styled(BsDiagram2)`
    color: white;
    font-size: 1.5rem;

    &:hover {
        cursor: pointer;
        transition: ease 0.1s;
        transform: scale(1.02);
        color: #DBEEB4;
    }
`;

const InfoTooltip = styled.div`
    position: absolute;
    background-color: rgba(255, 255, 255, 0.4);
    color: black;
    padding: 0.5rem;
    border-radius: 5px;
    font-size: 0.8rem;
    top: 50px;
    left: 0;
    z-index: 10;
    white-space: nowrap;
`;
const AddNewProject = styled.div`
    padding: 1rem;
    display: flex;
    flex-direction: row;
    gap: 1rem;
    height: 2rem;
    width: 100%;
    align-items: center;
    justify-content: center;

`;
const Circle = styled(CiCirclePlus)`
    color: white;
    font-size: 2rem;

    &:hover {
        cursor: pointer;
        transition: ease 0.1s;
        transform: scale(1.02);
        color: #DBEEB4;
        
    }
`;



const Documentation = () => {
    const [iconInfo, setIconInfo] = React.useState({ show: false, text: '', position: {} });
    const [projects, setProjects] = React.useState([]);
    const Navigate = useNavigate();
    const { userId } = useAuth();
    useEffect(() => {
        axios.get(`http://localhost:5000/projects/all/${userId}`)
            .then((response) => {
                console.log(response.data);
                setProjects(response.data);
                console.log(projects);

            })
            .catch((error) => {
                console.log(error);
            });
    }, []);


    const handleIconInfo = (text, e) => {
        const position = {
            top: e.target.getBoundingClientRect().top + window.scrollY,
            left: e.target.getBoundingClientRect().left + window.scrollX,
        };
        setIconInfo({ show: true, text, position });
    };

    const hideIconInfo = () => {
        setIconInfo({ show: false, text: '', position: {} });
    };

    const handleAddProject = () => {
        console.log('Agregar nuevo proyecto');
        Navigate('/projects/create');
    };

    return (
        <Container>
            <ListContainer>
                <List>
                    {projects.map((project, index) => (
                        <ListItem key={index}>
                            <ProjectLogo src={project.logo} alt={project.name} />
                            <ItemInfoContainer>
                                <ProjectInfo>
                                    <ProjectTitle>{project.name}</ProjectTitle>
                                    <ProjectDescription>{project.description}</ProjectDescription>
                                </ProjectInfo>
                                <ItemIcons>
                                    <IconBiBlanket 
                                        onMouseEnter={(e) => handleIconInfo('Documentación', e)} 
                                        onMouseLeave={hideIconInfo} 
                                    />
                                    <IconBsDiagram2 
                                        onMouseEnter={(e) => handleIconInfo('Diagramas', e)} 
                                        onMouseLeave={hideIconInfo} 
                                    />
                                </ItemIcons>
                            </ItemInfoContainer>

                        </ListItem>
                    )) 
                    }
                    <ListItem>
                        <AddNewProject onClick={handleAddProject} > <Circle/> </AddNewProject>
                        
                    </ListItem>
                </List>
            </ListContainer>
            {iconInfo.show && (
                <InfoTooltip style={{ top: iconInfo.position.top + 30, left: iconInfo.position.left }}  >
                    {iconInfo.text}
                </InfoTooltip>
            )}
            <UsersContainer>
                <h2>Usuarios</h2>
                <List>
                    {/* Lista de usuarios */}
                </List>
            </UsersContainer>
        </Container>
    );
};

export default Documentation;
