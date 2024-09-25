// Attendance.js
import React, { useState } from 'react';
import styled from 'styled-components';
import Calendar from '../../components/Calendar';
import moment from 'moment';
import Modal from '../../components/AddTaskModal'; // Asegúrate de importar el modal

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  gap: 2rem;
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

const CalendarContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

const Attendance = () => {
    const [task, setTask] = useState('');
    const [meetingTitle, setMeetingTitle] = useState('');
    const [meetingTime, setMeetingTime] = useState('');
    const [events, setEvents] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddTask = () => {
        if (task.trim()) {
            const newEvent = {
                title: task,
                start: new Date(),
                end: new Date(moment().add(1, 'hours').toDate()), // Define una duración por defecto de 1 hora
                allDay: false,
            };
            setEvents([...events, newEvent]);
            setTask('');
        }
    };

    const handleAddMeeting = () => {
        if (meetingTitle.trim() && meetingTime.trim()) {
            const meetingDate = moment(meetingTime, "HH:mm").toDate();
            const newEvent = {
                title: meetingTitle,
                start: meetingDate,
                end: new Date(moment(meetingDate).add(1, 'hours').toDate()), // Duración de 1 hora
                allDay: false,
            };
            setEvents([...events, newEvent]);
            setMeetingTitle('');
            setMeetingTime('');
        }
    };

    const handleDateSelect = (selectedDate) => {
        // Abrir el modal cuando se selecciona una fecha
        setSelectedDate(selectedDate);
        setIsModalOpen(true);
    };

    const handleAddEvent = () => {
        if (!selectedDate || task.trim() === '') return;

        const newEvent = {
            title: task,
            start: selectedDate,
            end: new Date(moment(selectedDate).add(1, 'hours').toDate()), // Duración de 1 hora
            allDay: false,
        };

        setEvents([...events, newEvent]);
        setTask('');
        setIsModalOpen(false); // Cerrar el modal después de agregar el evento
    };

    return (
        <Container>
             <CalendarContainer>
                <Title>Attendance Tracker con Calendario</Title>
                <Calendar
                    events={events}
                    onDateSelect={handleDateSelect} // Pasa la función de selección de fecha
                />
            </CalendarContainer>

            <div style={{ width: '30%' }}>
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
                    <Button onClick={handleAddMeeting}>Agregar Reunión</Button>
                </MeetingContainer>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h2>Agregar tarea el {moment(selectedDate).format('MMMM Do YYYY')}</h2>
                <Input
                    type="text"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    placeholder="Agregar tarea"
                />
                <Button onClick={handleAddEvent}>Agregar Evento</Button>
            </Modal>
        </Container>
    );
};

export default Attendance;
