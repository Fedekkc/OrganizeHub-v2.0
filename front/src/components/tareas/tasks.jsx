import React from 'react';
import styled from 'styled-components';

const TasksSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    justify-content: center;
    align-items: center;
    `;

const TaskTeam = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    justify-content: center;
    align-items: center;
    `;


const Task = styled.div`
    padding: 1rem;
box-shadow: 7px 8px 23px 0px rgba(0,0,0,0.61);
-webkit-box-shadow: 7px 8px 23px 0px rgba(0,0,0,0.61);
-moz-box-shadow: 7px 8px 23px 0px rgba(0,0,0,0.61);
    border-radius: 10px;
    width: 15rem;
    height: 15rem;
    max-width: 15rem;
    max-height: 10rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &:hover {
        scale: 1.05;
        transition: ease 0.1s;
        cursor: pointer;    

    `;


const tasks = [
    {
        title: 'Tarea 1',
        description: 'Descripción de la tarea 1',
        date: '2021-10-20',
    },
    {
        title: 'Tarea 2',
        description: 'Descripción de la tarea 2',
        date: '2021-10-21',
    },
    {
        title: 'Tarea 3',
        description: 'Descripción de la tarea 3',
        date: '2021-10-22',
    },
    {
        title: 'Tarea 4',
        description: 'Descripción de la tarea 4',
        date: '2021-10-23',
    },
    {
        title: 'Tarea 5',
        description: 'Descripción de la tarea 5',
        date: '2021-10-24',
    },
    {
        title: 'Tarea 6',
        description: 'Descripción de la tarea 6',
        date: '2021-10-25',
    },
];


const Tasks = () => {
    return (
        <TasksSection>
            
        </TasksSection>
    );
};

export default Tasks;