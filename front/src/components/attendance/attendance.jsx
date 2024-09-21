import React, { useState } from 'react';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 20px;
    
`;

const Title = styled.h1`
    color: white;
`;

const Input = styled.input`
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const Button = styled.button`
    padding: 10px 20px;
    margin: 10px 0;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;

const List = styled.ul`
    list-style-type: none;
    padding: 0;
`;

const ListItem = styled.li`
    padding: 10px;
    margin: 5px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const CalendarContainer = styled.div`
    margin-top: 20px;
`;

const TasksContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    justify-content: center;
    align-items: center;
`;

const MeetingContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    justify-content: center;
    align-items: center;
`;

const Attendance = () => {
    const [name, setName] = useState('');
    const [task, setTask] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [attendanceList, setAttendanceList] = useState({});
    const [meetingTitle, setMeetingTitle] = useState('');
    const [meetingTime, setMeetingTime] = useState('');

    const handleAddTask = () => {
        if (task.trim()) {
            const dateKey = selectedDate.toDateString();
            setAttendanceList(prevList => ({
                ...prevList,
                [dateKey]: [...(prevList[dateKey] || []), task],
            }));
            setTask('');
        }
    };

    const handleAddMeeting = () => {
        if (meetingTitle.trim() && meetingTime.trim()) {
            const dateKey = selectedDate.toDateString();
            const meeting = `${meetingTitle} at ${meetingTime}`;
            setAttendanceList(prevList => ({
                ...prevList,
                [dateKey]: [...(prevList[dateKey] || []), meeting],
            }));
            // Aquí llamas a tu función para integrar con Google Calendar
            addEventToGoogleCalendar(meetingTitle, selectedDate, meetingTime);
            setMeetingTitle('');
            setMeetingTime('');
        }
    };

    const addEventToGoogleCalendar = (title, date, time) => {
        // Aquí iría la lógica de integración con la API de Google Calendar
        console.log(`Evento añadido a Google Calendar: ${title} en ${date} a las ${time}`);
        // Para la integración real, sigue la documentación oficial de Google Calendar API
    };

    return (
        <Container>

            <CalendarContainer>
            <Title>Attendance Tracker con Calendario</Title>
                <Calendar onChange={setSelectedDate} value={selectedDate} />
            </CalendarContainer>
            <Button> Iniciar jornada </Button>
            <Button> Finalizar jornada </Button>

            <TasksContainer>

            <Input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Agregar tarea"
            />
            <Button onClick={handleAddTask}>Agregar Tarea</Button>
            </TasksContainer>
            <MeetingContainer>
            <Input
                type="text"
                value={meetingTitle}
                onChange={(e) => setMeetingTitle(e.target.value)}
                placeholder="Título de la reunión"
            />
            <Input
                type="time"
                value={meetingTime}
                onChange={(e) => setMeetingTime(e.target.value)}
                placeholder="Hora de la reunión"
            />
            <Button onClick={handleAddMeeting}>Agregar Reunión y Sincronizar</Button>

            <List>
                {attendanceList[selectedDate.toDateString()]?.map((item, index) => (
                    <ListItem key={index}>{item}</ListItem>
                ))}
            </List>
            </MeetingContainer>
        </Container>
    );
};

export default Attendance;
