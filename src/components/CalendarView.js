import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; 
import { useNavigate } from 'react-router-dom';

const CalendarView = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const sampleEvents = [
      {
        title: 'LinkedIn Post - Company A',
        date: '2024-12-28',
        description: 'Posted an update on LinkedIn.',
        company: 'Company A'
      },
      {
        title: 'Email Follow-up - Company B',
        date: '2024-12-29',
        description: 'Sent follow-up email.',
        company: 'Company B'
      },
      {
        title: 'Phone Call - Company C',
        date: '2025-01-05',
        description: 'Follow-up phone call.',
        company: 'Company C'
      }
    ];

    setEvents(sampleEvents);
  }, []);

  const handleDateClick = (arg) => {
    alert(`Date clicked: ${arg.dateStr}`);
    navigate('/user');
  };

  const handleEventClick = (info) => {
    setSelectedEvent(info.event); 
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="calendar-view">
      
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events.map(event => ({
          title: event.title,
          date: event.date,
          extendedProps: {
            description: event.description,
            company: event.company
          }
        }))}
        dateClick={handleDateClick} 
        eventClick={handleEventClick} 
      />


      {selectedEvent && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="text-xl font-bold">{selectedEvent.title}</h3>
            <p><strong>Company:</strong> {selectedEvent.extendedProps.company}</p>
            <p><strong>Description:</strong> {selectedEvent.extendedProps.description}</p>
            <button onClick={closeModal} className="btn-close">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarView;
