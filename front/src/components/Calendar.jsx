import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import { useAuth } from '../context/Context';

const localizer = momentLocalizer(moment);
moment.locale('es');

const DnDCalendar = withDragAndDrop(BigCalendar);

const CalendarContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

const CustomCalendar = styled(DnDCalendar)`
    padding: 1rem;
    border-radius: 10px;
    border: 1px solid #ccc;
    width: 100%;
    height: 40rem;
    background-color: #494A48;

    .rbc-toolbar {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #31322F;
        border-radius: 10px;
        padding: 0.5rem;
        color: white;

        button {
            color: white;
            cursor: pointer;
            &:hover {
                color: #BEC0BC;
            }
        }
    }

    .rbc-header {
        background-color: #31322F;
        color: white;
    }

    .rbc-row {
        color: white;
        &:hover {
            cursor: pointer;
        }
    }

    .rbc-off-range {
        color: gray;
    }

    .rbc-day-bg {
        background-color: #494A48;
        cursor: pointer;
        &:hover {
            background-color: #757575;
        }
    }

    .rbc-today {
        background-color: #565755; /* Día actual resaltado */
    }

    .rbc-event {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: lightblue;
        color: white;
        border-radius: 2px;
        padding: 2px;
        cursor: pointer;
        &:hover {
            background-color: rgba(173, 216, 230, 0.8);
        }
    }

    


`;

const Calendar = ({ events, onDateSelect, onEventUpdate }) => {
    const [eventList, setEventList] = useState(events);
    const { addEvent, updateEvent, deleteEvent } = useAuth();



    const handleEventResize = ({ event, start, end }) => {
        updateEvent({ ...event, start, end });

    };

    const handleEventDrop = ({ event, start, end }) => {
        console.log(event);
        updateEvent({ ...event, start, end });
    };

    return (
        <CalendarContainer>
            <CustomCalendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                timeslots={1}
                step={60}
                views={['month', 'week', 'day']}
                selectable
                onSelectSlot={(slotInfo) => {
                    onDateSelect(slotInfo.start);
                }}
                onEventDrop={handleEventDrop}
                onEventResize={handleEventResize}
                resizable
                draggableAccessor={() => true} // Permitir arrastrar todos los eventos
            />
        </CalendarContainer>
    );
};

export default Calendar;
