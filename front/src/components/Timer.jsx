import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from './Button';
import Modal from './Modal';
import Input from './Input';

const TimerContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: transparent;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border: 1px solid #ccc;
`;

const Title = styled.h1`
    font-size: 2em;
    margin-bottom: 20px;
    color: white;
`;

const TimeDisplay = styled.h2`
    font-size: 3em;
    margin-bottom: 20px;
    color: white;
`;

const ButtonContainer = styled.div`
    display: flex;
    gap: 10px;
`;

const TaskContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: transparent;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border: 1px solid #ccc;
    margin-left: 20px;
`;

const TaskList = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0;
    color: white;
`;

const TaskItem = styled.li`
    margin-bottom: 10px;
`;

const TimerWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
`;

const Timer = () => {
    const [isRunning, setIsRunning] = useState(false);
    const [time, setTime] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [taskInput, setTaskInput] = useState('');
    const [endTime, setEndTime] = useState('18:00');
    const [breakStart, setBreakStart] = useState('12:00');
    const [breakEnd, setBreakEnd] = useState('13:00');
    const [isConfigModalOpen, setIsConfigModalOpen] = useState(true);

    useEffect(() => {
        let timer;
        if (isRunning) {
            timer = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 1000);
        } else if (!isRunning && time !== 0) {
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [isRunning, time]);

    const handleStart = () => {
        setIsRunning(true);
        setIsConfigModalOpen(false);
    };

    const handlePause = () => {
        setIsRunning(false);
    };

    const handleFinish = () => {
        setIsModalOpen(true);
    };

    const confirmFinish = () => {
        setIsRunning(false);
        setIsFinished(true);
        setIsModalOpen(false);
    };

    const cancelFinish = () => {
        setIsModalOpen(false);
    };

    const handleTaskInputChange = (e) => {
        setTaskInput(e.target.value);
    };

    const handleAddTask = () => {
        if (taskInput.trim() !== '') {
            setTasks([...tasks, taskInput]);
            setTaskInput('');
        }
    };

    const handleConfigSubmit = () => {
        setIsConfigModalOpen(false);
    };

    const formatTime = (seconds) => {
        const getSeconds = `0${seconds % 60}`.slice(-2);
        const minutes = `${Math.floor(seconds / 60)}`;
        const getMinutes = `0${minutes % 60}`.slice(-2);
        const getHours = `0${Math.floor(seconds / 3600)}`.slice(-2);
        return `${getHours}:${getMinutes}:${getSeconds}`;
    };

    return (
        <TimerWrapper>
            <TimerContainer>
                <Title>Attendance Tracker</Title>
                <TimeDisplay>{formatTime(time)}</TimeDisplay>
                <ButtonContainer>
                    {!isRunning && !isFinished && <Button onClick={handleStart}>Iniciar Jornada</Button>}
                    {isRunning && <Button onClick={handlePause}>Pausar</Button>}
                    {!isRunning && time > 0 && !isFinished && <Button onClick={handleStart}>Reanudar</Button>}
                    {!isFinished && <Button onClick={handleFinish}>Finalizar Jornada</Button>}
                </ButtonContainer>
                {isModalOpen && (
                    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                        <p>¿Estás seguro de que deseas finalizar tu jornada laboral?</p>
                        <Button onClick={confirmFinish}>Sí</Button>
                        <Button onClick={cancelFinish}>No</Button>
                    </Modal>
                )}
                {isConfigModalOpen && (
                    <Modal isOpen={isConfigModalOpen} onClose={() => setIsConfigModalOpen(false)}>
                        <p>Configura tu jornada laboral</p>
                        <label>
                            Hora de finalización:
                            <Input
                                type="time"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                            />
                        </label>
                        <label>
                            Inicio del descanso:
                            <Input
                                type="time"
                                value={breakStart}
                                onChange={(e) => setBreakStart(e.target.value)}
                            />
                        </label>
                        <label>
                            Fin del descanso:
                            <Input
                                type="time"
                                value={breakEnd}
                                onChange={(e) => setBreakEnd(e.target.value)}
                            />
                        </label>
                        <Button onClick={handleConfigSubmit}>Guardar</Button>
                    </Modal>
                )}
            </TimerContainer>
            <TaskContainer>
                <Title>Tareas</Title>
                <input
                    type="text"
                    value={taskInput}
                    onChange={handleTaskInputChange}
                    placeholder="Introduce una tarea"
                />
                <Button onClick={handleAddTask}>Agregar Tarea</Button>
                <TaskList>
                    {tasks.map((task, index) => (
                        <TaskItem key={index}>{task}</TaskItem>
                    ))}
                </TaskList>
            </TaskContainer>
        </TimerWrapper>
    );
};

export default Timer;