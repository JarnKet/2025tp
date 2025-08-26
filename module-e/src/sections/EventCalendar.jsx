import { useState } from "react";
import eventsData from "../constants/events.json";

const EventCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);

  const today = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Category colors
  const categoryColors = {
    Technology: "bg-blue-500",
    Music: "bg-green-500",
    History: "bg-yellow-500",
    Art: "bg-purple-500",
    Food: "bg-red-500"
  };

  // Get events for the current month
  const getEventsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return eventsData.filter(event => {
      if (Array.isArray(event.date)) {
        // Check if date is within range
        const startDate = new Date(event.date[0]);
        const endDate = new Date(event.date[1]);
        return date >= startDate && date <= endDate;
      } else {
        return event.date === dateStr;
      }
    });
  };

  // Get calendar days for current month
  const getCalendarDays = () => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(currentYear, currentMonth, day));
    }

    return days;
  };

  const goToPrevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const isToday = (date) => {
    if (!date) return false;
    return date.toDateString() === today.toDateString();
  };

  const isWeekend = (date) => {
    if (!date) return false;
    const day = date.getDay();
    return day === 0 || day === 6; // Sunday or Saturday
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const closePopup = () => {
    setSelectedEvent(null);
  };

  return (
    <section className="py-16">
      <div className="cs-container">
        <h2 className="mb-8 text-3xl font-bold text-center">Event Calendar</h2>

        {/* Calendar Header */}
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={goToPrevMonth}
              className="px-4 py-2 text-white transition-colors bg-blue-500 rounded hover:bg-blue-600"
            >
              Prev
            </button>
            <h3 className="text-xl font-semibold">
              {monthNames[currentMonth]} {currentYear}
            </h3>
            <button
              onClick={goToNextMonth}
              className="px-4 py-2 text-white transition-colors bg-blue-500 rounded hover:bg-blue-600"
            >
              Next
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map(day => (
              <div key={day} className="p-2 font-semibold text-center text-gray-600">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="grid grid-cols-7 gap-1">
            {getCalendarDays().map((date, index) => {
              const events = date ? getEventsForDate(date) : [];

              return (
                <div
                  key={index}
                  className={`min-h-[80px] p-1 border border-gray-200 ${
                    !date ? 'bg-gray-50' :
                    isToday(date) ? 'bg-blue-100' :
                    isWeekend(date) ? 'bg-gray-100' : 'bg-white'
                  }`}
                >
                  {date && (
                    <>
                      <div className="mb-1 text-sm font-medium">
                        {date.getDate()}
                      </div>
                      <div className="space-y-1">
                        {events.map((event, eventIndex) => (
                          <div
                            key={eventIndex}
                            onClick={() => handleEventClick(event)}
                            className={`text-xs p-1 rounded cursor-pointer text-white ${
                              categoryColors[event.category] || 'bg-gray-500'
                            } hover:opacity-80 transition-opacity`}
                          >
                            {event.title}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-6">
            <h4 className="mb-2 text-sm font-semibold">Categories:</h4>
            <div className="flex flex-wrap gap-2">
              {Object.entries(categoryColors).map(([category, color]) => (
                <div key={category} className="flex items-center gap-1">
                  <div className={`w-3 h-3 rounded ${color}`}></div>
                  <span className="text-xs">{category}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Event Details Popup */}
        {selectedEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-md p-6 mx-4 bg-white rounded-lg">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold">{selectedEvent.title}</h3>
                <button
                  onClick={closePopup}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-3">
                <div>
                  <span className="font-semibold">Date: </span>
                  {Array.isArray(selectedEvent.date)
                    ? `${selectedEvent.date[0]} to ${selectedEvent.date[1]}`
                    : selectedEvent.date
                  }
                </div>
                <div>
                  <span className="font-semibold">Place: </span>
                  {selectedEvent.place}
                </div>
                <div>
                  <span className="font-semibold">Category: </span>
                  <span className={`inline-block px-2 py-1 rounded text-white text-xs ${
                    categoryColors[selectedEvent.category] || 'bg-gray-500'
                  }`}>
                    {selectedEvent.category}
                  </span>
                </div>
                <div>
                  <span className="font-semibold">Description: </span>
                  {selectedEvent.content}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default EventCalendar;
