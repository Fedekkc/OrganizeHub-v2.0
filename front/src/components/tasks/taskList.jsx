import React from 'react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styled, { css } from 'styled-components';

const TaskListContainer = styled.div`
    width: 320px;
    margin: 0 auto;
    padding: 10px;
    background-color: #f9f9f9;
    border-radius: 12px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
`;

const TaskItem = styled.div`
    padding: 16px;
    margin: 8px 0;
    background-color: #ffffff;
    border: 1px solid #ddd;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
    
    ${({ isDragging }) =>
        isDragging &&
        css`
            background-color: #f0f0f0;
            box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
            opacity: 0.9;
            transform: scale(1.05);
        `}
    
    &:hover {
        background-color: #f1f1f1;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }
`;

const ItemTypes = {
    TASK: 'task',
};

const Task = ({ task, index, moveTask }) => {
    const [{ isDragging }, ref] = useDrag({
        type: ItemTypes.TASK,
        item: { index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [, drop] = useDrop({
        accept: ItemTypes.TASK,
        hover: (draggedItem) => {
            if (draggedItem.index !== index) {
                moveTask(draggedItem.index, index);
                draggedItem.index = index;
            }
        },
    });

    return (
        <TaskItem ref={(node) => ref(drop(node))} isDragging={isDragging}>
            {task}
        </TaskItem>
    );
};

const TaskList = ({ tasks, moveTask }) => {
    return (
        <TaskListContainer>
            {tasks.map((task, index) => (
                <Task key={index} index={index} task={task} moveTask={moveTask} />
            ))}
        </TaskListContainer>
    );
};

const TaskListApp = () => {
    const [tasks, setTasks] = React.useState([
        'Task 1',
        'Task 2',
        'Task 3',
        'Task 4',
    ]);

    const moveTask = (fromIndex, toIndex) => {
        const updatedTasks = [...tasks];
        const [movedTask] = updatedTasks.splice(fromIndex, 1);
        updatedTasks.splice(toIndex, 0, movedTask);
        setTasks(updatedTasks);
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <TaskList tasks={tasks} moveTask={moveTask} />
        </DndProvider>
    );
};

export default TaskListApp;
