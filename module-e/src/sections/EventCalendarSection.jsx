import EventCalendar from '../components/EventCalendar';

const EventCalendarSection = () => {
  return (
    <section style={{ padding: '40px 0', backgroundColor: '#f9fafb' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '10px' }}>
            Events in Lyon
          </h2>
          <p style={{ fontSize: '16px', color: '#6b7280' }}>
            Discover exciting events happening in Lyon throughout the year
          </p>
        </div>
        <EventCalendar />
      </div>
    </section>
  );
};

export default EventCalendarSection;
