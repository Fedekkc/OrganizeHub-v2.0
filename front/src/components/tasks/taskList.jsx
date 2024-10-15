import styled from "styled-components";
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useState } from 'react';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    gap: 2rem;
    background-color: lightblue;
    width: 400px;
    margin: auto;
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
    cursor: move;
`;

const Title = styled.p`
    color: white;
    font-size: 1.5rem;
`;

function DraggableTask({ id, task, index, moveTask }) {
    const [{ isDragging }, dragRef] = useDrag(() => ({
        type: 'TASK',
        item: { id, index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    const [, dropRef] = useDrop({
        accept: 'TASK',
        hover: (draggedItem) => {
            if (draggedItem.index !== index) {
                moveTask(draggedItem.index, index);
                draggedItem.index = index;  // Actualizamos el índice del ítem arrastrado
            }
        },
    });

    return (
        <Task
            ref={(node) => dragRef(dropRef(node))}
            style={{ opacity: isDragging ? 0.5 : 1 }}
        >
            <p>{task}</p>
        </Task>
    );
}

const TaskListApp = () => {
    const [tasks, setTasks] = useState([
        { id: 1, task: "Comprar pan" },
        { id: 2, task: "Estudiar React" },
        { id: 3, task: "Ir al gimnasio" },
    ]);

    const moveTask = (fromIndex, toIndex) => {
        const updatedTasks = [...tasks];
        const [movedTask] = updatedTasks.splice(fromIndex, 1);
        updatedTasks.splice(toIndex, 0, movedTask);
        setTasks(updatedTasks);
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <Container>
                <Title>Lista de Tareas</Title>
                {tasks.map((task, index) => (
                    <DraggableTask 
                        key={task.id} 
                        id={task.id} 
                        task={task.task} 
                        index={index} 
                        moveTask={moveTask} 
                    />
                ))}
            </Container>
        </DndProvider>
    );
}

export default TaskListApp;
