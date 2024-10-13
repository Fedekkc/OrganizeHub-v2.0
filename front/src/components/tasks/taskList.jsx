import styled from "styled-components";
import { useDrag } from 'react-dnd'


const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    gap: 2rem;
    background-color: lightblue;
    `;  

const Task = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: #f0f0f0;
    border-radius: 4px;
    width: 100%;
    color: #333;
    font-size: 1.2rem;
    `;
const Title = styled.p`
    color: white;
    `;

const TaskListApp = () => {
    return (
        <Container>
            <Title>Lista de Tareas</Title>
            <Task>
                <p>Comprar pan</p>
            </Task>
            <Task>
                <p>Estudiar React</p>
            </Task>
            <Task>
                <p>Ir al gimnasio</p>
            </Task>
        </Container>
    );
}

export default TaskListApp;
