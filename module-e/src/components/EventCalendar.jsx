import { useState } from 'react';
import eventsData from '../constants/events.json';

const EventCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);

  const categoryColors = {
    'Technology': '#3b82f6',
    'Music': '#a855f7',
    'History': '#f59e0b',
    'Art': '#10b981',
    'Food': '#ef4444'
  };

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Empty cells for days before first day of month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const getEventsForDay = (day) => {
    if (!day) return [];

    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    return eventsData.filter(event => {
      if (Array.isArray(event.date)) {
        const startDate = event.date[0];
        const endDate = event.date[1];
        return dateStr >= startDate && dateStr <= endDate;
      } else {
        return event.date === dateStr;
      }
    });
  };

  const isToday = (day) => {
    const today = new Date();
    return today.getDate() === day &&
           today.getMonth() === currentDate.getMonth() &&
           today.getFullYear() === currentDate.getFullYear();
  };

  const isWeekend = (day) => {
    if (!day) return false;
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return date.getDay() === 0 || date.getDay() === 6;
  };

  const goToPrevious = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNext = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <button onClick={goToPrevious} style={{ padding: '10px 20px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '5px' }}>
          Prev
        </button>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <button onClick={goToNext} style={{ padding: '10px 20px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '5px' }}>
          Next
        </button>
      </div>

      {/* Week days */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '1px', backgroundColor: '#e5e7eb' }}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} style={{ padding: '10px', backgroundColor: '#f3f4f6', textAlign: 'center', fontWeight: 'bold' }}>
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '1px', backgroundColor: '#e5e7eb' }}>
        {getDaysInMonth().map((day, index) => {
          const events = getEventsForDay(day);
          const dayStyle = {
            minHeight: '80px',
            padding: '5px',
            backgroundColor: isToday(day) ? '#dbeafe' : isWeekend(day) ? '#f9fafb' : 'white',
            border: isToday(day) ? '2px solid #3b82f6' : 'none'
          };

          return (
            <div key={index} style={dayStyle}>
              {day && (
                <>
                  <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>{day}</div>
                  {events.map((event, eventIndex) => (
                    <div
                      key={eventIndex}
                      onClick={() => setSelectedEvent(event)}
                      style={{
                        fontSize: '10px',
                        padding: '2px',
                        margin: '1px 0',
                        backgroundColor: categoryColors[event.category] || '#6b7280',
                        color: 'white',
                        borderRadius: '3px',
                        cursor: 'pointer'
                      }}
                    >
                      {event.title.substring(0, 15)}...
                    </div>
                  ))}
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Simple modal */}
      {selectedEvent && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '10px',
            maxWidth: '400px',
            width: '90%'
          }}>
            <h3 style={{ marginBottom: '10px', fontSize: '18px', fontWeight: 'bold' }}>{selectedEvent.title}</h3>
            <p><strong>Date:</strong> {Array.isArray(selectedEvent.date) ? `${selectedEvent.date[0]} to ${selectedEvent.date[1]}` : selectedEvent.date}</p>
            <p><strong>Place:</strong> {selectedEvent.place}</p>
            <p><strong>Category:</strong> {selectedEvent.category}</p>
            <p><strong>Description:</strong> {selectedEvent.content}</p>
            <button
              onClick={() => setSelectedEvent(null)}
              style={{ marginTop: '15px', padding: '10px 20px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '5px' }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventCalendar;
