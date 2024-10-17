// /c:/Users/Pasante 1/Desktop/intranet/OrganizeHub-v2.0/front/src/pages/documentation/project.jsx

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ReactFlow, { MiniMap, Controls } from 'react-flow-renderer';
import { CiCirclePlus } from 'react-icons/ci';
import { CiMail } from "react-icons/ci";
import { CgSlack } from "react-icons/cg";

import { useParams } from 'react-router-dom';

const Container = styled.div`
    padding: 20px;
    max-width: 100vw;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    align-items: center;
`;

const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
`;

const Title = styled.h2`
    font-size: 2rem;
    text-align: center;
    color: white;
`;

const Section = styled.section`
    width: 30%;
        border-radius: 10px;
    border: 1px solid white;
`;

const ProjectInfo = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;
    padding: 1rem;
    height: 20%;
    width: 100%;
    max-width: 100vw;
    align-items: center;
    justify-content: space-around;

`;

const ProjectContent = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;
    padding: 1rem;
    width: 100%;
    max-width: 100vw;
    justify-content: space-around;
    align-items: top;
`;


const SectionTitle = styled.h3`
    font-size: 1.5rem;
    color: #555;
`;

const Paragraph = styled.p`
    font-size: 1em;
    color: #666;
    line-height: 1.6;
`;

const Box = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 1rem 1rem 1rem;
    justify-content: top;
    align-items: center;
    border-radius: 10px;
    border: 1px solid white;
    width: 30%;
    
`;



const List = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 80%;
    padding: 1rem;
    align-items: center;
    max-height: 20rem;
    overflow-y: auto;
    overflow-x: hidden;
    
`;

const DocItem = styled.div`
    padding: 1rem;
    display: flex;
    flex-direction: row;
    
    height: 0.7rem;
    width: 90%;
    align-items: center;
    justify-content: left;
    border-radius: 10px;
    border: 1px solid white;

    &:hover {
        cursor: pointer;
        transition: ease 0.1s;
        transform: scale(1.02);
        border: 1px solid #DBEEB4;
        background-color: rgba(255, 255, 255, 0.1);
    }
`;

const InfoTooltip = styled.div`
    position: absolute;
    background-color: rgba(255, 255, 255, 1.0);
    color: black;
    padding: 0.5rem;
    border-radius: 5px;
    font-size: 0.8rem;
    top: 50px;
    left: 0;
    z-index: 10;
    white-space: nowrap;
`;

const DocItemInfo = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;
    align-items: center;
    justify-content: left;
`;

const AddDoc = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;
    align-items: center;
    justify-content: center;

    width: 100%;
    color: white;
    font-size: 0rem;
    text-align: center;


    &:hover {
        cursor: pointer;
        transition: ease 0.1s;
        transform: scale(1.02);
        color: #0056b3;
    }
`;


const UserItem = styled.div`
    padding: 1rem;
    display: flex;
    flex-direction: row;
    gap: 1rem;
    height: 0.7rem;
    width: 80%;
    align-items: center;
    justify-content: left;
    border-radius: 10px;
    border: 1px solid #ccc;

    &:hover {
        transition: ease 0.1s;
        transform: scale(1.02);
        border: 1px solid #DBEEB4;
        background-color: rgba(255, 255, 255, 0.1);
    }
`;

const UserItemInfo = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;
    align-items: center;
    justify-content: left;
    color: white;
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

const MailIcon = styled(CiMail)`

    &:hover {
        cursor: pointer;
        transition: ease 0.1s;
        transform: scale(1.02);
        color: #DBEEB4;

    }
`;

const SlackIcon = styled(CgSlack)`
       &:hover {
        cursor: pointer;
        transition: ease 0.1s;
        transform: scale(1.02);
        color: #DBEEB4;

    }
`;

const Input = styled.input`
/* este input es para el boton de agregar documento, por lo que hay que limpiarlo lo mas posible */
    padding: 0;
    margin: 0;
    background-color: transparent;
    border: none;
    color: white;
    font-size: 0.5rem;
    cursor: pointer;
    display: none;
    
`;

const InputName = styled.input`
    background-color: transparent;
    border: 1px solid #ccc;
    border-radius: 4px;
    color: #ccc;
`;

const InputDescription = styled.textarea`
    
    background-color: transparent;
    border: 1px solid #ccc;
    border-radius: 4px;
    color: #ccc;
    height: auto;
    min-height: 1rem;
    max-height: 10rem;
    width: 100%;
    resize: vertical;
`;

const TextsBox = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 1rem 1rem 1rem;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    border: 1px solid white;
    width: 30%;
    height: 15rem;
    
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;

    height: 85%;
    width: 100%;
    justify-content: center;

`;

const Button = styled.button`
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;

const AddUser = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;
    align-items: center;
    justify-content: center;

    width: 100%;
    color: white;
    font-size: 0rem;
    text-align: center;
    
    &:hover {
        cursor: pointer;
        transition: ease 0.1s;
        transform: scale(1.02);
        color: #0056b3;
    }
`;



const Project = () => {
    const [projectData, setProjectData] = useState(null);

    const { projectId } = useParams();

    const [iconInfo, setIconInfo] = useState({
        show: false,
        text: '',
        position: { top: 0, left: 0 }
    });

    const handleIconInfo = (text, e) => {
        const position = {
            top: e.target.getBoundingClientRect().top + window.scrollY,
            left: e.target.getBoundingClientRect().left + window.scrollX,
        };
        setIconInfo({ show: true, text, position });
    };

    const handleChange = (e) => {

        setProjectData({
            ...projectData,
            [e.target.name]: e.target.value
        });
    };

    const hideIconInfo = () => {
        setIconInfo({
            show: false,
            text: '',
            position: { top: 0, left: 0 }
        });

    };





    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/projects/${projectId}`);
                setProjectData(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error ', error);
            }
        };
        fetchData();
    }, []);

    return (
        <Container>
            <Title>Project Documentation</Title>
            <Button>Save</Button>
            <ProjectInfo>
                
                <TextsBox>
                    
                    <SectionTitle>Título</SectionTitle>
                    
                    <InputContainer>
                    <InputName 
                        type="text" 
                        placeholder="Project Name" 
                        name="name"
                        value={projectData ? projectData.name : 'Loading...'} 
                        onChange={handleChange}
                    />
                    </InputContainer>
                    
                </TextsBox>
                <TextsBox>
                    <SectionTitle>Descripción</SectionTitle>
                    <InputContainer>
                    <InputDescription 
                        type="text" 
                        placeholder="Project Description" 
                        name="description"
                        value={projectData ? projectData.description : 'Loading...'} 
                        onChange={handleChange}
                    />
                    </InputContainer>
                </TextsBox>
            </ProjectInfo>
            <ProjectContent>
                <Box>
                    <h3>Users</h3>
                    {iconInfo.show && (
                        <InfoTooltip style={{ top: iconInfo.position.top + 30, left: iconInfo.position.left }}>
                            {iconInfo.text}
                        </InfoTooltip>
                    )}
                    <List>
                        {projectData && projectData.users.map((user) => (
                            <UserItem key={user.id}>
                                <UserItemInfo>
                                    <p>{user.firstName}</p>
                                    <p>{user.lastName}</p>
                                    <MailIcon
                                        onMouseEnter={(e) => handleIconInfo(user.email, e)}
                                        onMouseLeave={hideIconInfo}
                                        onClick={() => window.open(`mailto:${user.email}`)}
                                    />
                                    <SlackIcon
                                        onMouseEnter={(e) => handleIconInfo('Slack', e)}
                                        onMouseLeave={hideIconInfo}
                                    />
                                </UserItemInfo>
                            </UserItem>
                        ))}
                        <UserItem>
                            <AddUser>
                                <Circle />
                            </AddUser>
                        </UserItem>
                    </List>
                </Box>
                <Box>
                    <h3>Documents</h3>
                    <List>
                        <DocItem>
                            <DocItemInfo>Document 1</DocItemInfo>
                        </DocItem>
                        <DocItem>
                            <DocItemInfo>Document 2</DocItemInfo>
                        </DocItem>
                        <DocItem>
                            <DocItemInfo>Document 3</DocItemInfo>
                        </DocItem>
                        <DocItem>
                            <AddDoc>
                                <Input type="file" id="file" name="file" />
                                <label htmlFor="file"><Circle /></label>
                            </AddDoc>
                        </DocItem>
                    </List>
                </Box>
            </ProjectContent>
        </Container>
    );
};

export default Project;