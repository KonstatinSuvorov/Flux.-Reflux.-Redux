import React, { useState } from 'react';
import EventForm from './components/EventForm';
import EventList from './components/EventList';

function App() {
  const [events, setEvents] = useState([]);

  const addEvent = (eventData) => {
    const newEvent = { ...eventData, id: Date.now(), comments: [] };
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  const addComment = (eventId, commentData) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === eventId
          ? { ...event, comments: [...event.comments, commentData] }
          : event
      )
    );
  };

  return (
    <div>
      <h1>События</h1>
      <EventForm addEvent={addEvent} />
      <EventList events={events} addComment={addComment} />
    </div>
  );
}

export default App;
