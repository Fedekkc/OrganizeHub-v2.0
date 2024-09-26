// Attendance.js
import React, { useState } from 'react';
import styled from 'styled-components';
import Calendar from '../../components/Calendar';
import moment from 'moment';
import Modal from '../../components/AddTaskModal'; 
import { CiCalendar } from 'react-icons/ci';
import axios from 'axios';

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
  background-color: #bbbbbb;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
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
const Select = styled.select`
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const Titulo = styled.h2`
    display: flex;
    color: white;
    justify-content: center;
    align-items: center;
`;

const TitulosContainer = styled.div`
    display: flex;
    flex-direction: column;
    
`;



const Attendance = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('task');
    const [events, setEvents] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [endingDate, setEndingDate] = useState(null);
    const [project, setProject] = useState(1);
    const [priority, setPriority] = useState('low');


    const handleDateSelect = (selectedDate) => {
        // Abrir el modal cuando se selecciona una fecha
        setSelectedDate(selectedDate);
        setIsModalOpen(true);
    };

    const handleAddEvent = () => {
        if (!selectedDate || title.trim() === '') return;
        if (type === 'meeting' && !endingDate) return;
        

        const newEvent = {
            id: events.length + 1,
            title: title,
            start: selectedDate,
            end: endingDate,
            allDay: false,
            project: project,
            priority: priority,
            type: type,
        };
        console.log(newEvent);

        if(type === 'task'){
            axios.post('http://localhost:5000/tasks', {
                title: title,
                description: description,
                projectId: '1',
                createdById: '1',
                assignedToId: '1',
                priority: 'low',
                status: 'pending',
                dueDate: endingDate,
            }).then((response) => { 
                console.log(response);
            }).catch((error) => {
                console.log(error)
                });
        }

        setEvents([...events, newEvent]);
        console.log(events);
        setTitle('');
        setDescription('');
        setSelectedDate(null);
        setEndingDate(null);

        setIsModalOpen(false); 
    };

    const onEventUpdate = (updatedEvents) => {
        setEvents(updatedEvents);
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

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <TitulosContainer>
                <Titulo>Agregar Evento - {moment(selectedDate).format('DD/MM/YYYY')} <CiCalendar/> </Titulo>
                
                </TitulosContainer>
                <Select onChange={(e) => setType(e.target.value)}>
                    <option value="task">Tarea</option>
                    <option value="meeting">Reunión</option>
                </Select>

                <Select onChange={(e) => setProject(e.target.value)}>
                    <option value="project1">Proyecto 1</option>
                    <option value="project2">Proyecto 2</option>
                    <option value="project3">Proyecto 3</option>
                </Select>
                
                <Input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Agregar título"
                />

                <Input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Agregar descripción"
                />
                {type === 'meeting' ? (
                    <Input
                        type="time"
                        onChange={(e) => {
                            const endDate = new Date(selectedDate);
                            const [hours, minutes] = e.target.value.split(':');
                            endDate.setHours(hours);
                            endDate.setMinutes(minutes);
                            setEndingDate(endDate);
                        }}
                        placeholder="Seleccionar hora de finalización"
                    />
                ) : (
                    <Input
                        type="datetime-local"
                        onChange={(e) => setEndingDate(new Date(e.target.value))}
                        placeholder="Seleccionar fecha y hora de finalización"
                    />
                )}
                <Select onChange={(e) => setPriority(e.target.value)}>
                    <option value="low">Baja</option>
                    <option value="medium">Media</option>
                    <option value="high">Alta</option>
                </Select>
                

                <Button onClick={handleAddEvent}>Agregar Evento</Button>
            </Modal>
        </Container>
    );
};


export default Attendance;
