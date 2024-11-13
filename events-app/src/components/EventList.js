import React from 'react';
import CommentForm from './CommentForm';

function EventList({ events, addComment }) {
  return (
    <div>
      {events.map((event) => (
        <div key={event.id}>
          <h3>{event.eventName}</h3>
          <p>{event.description}</p>
          <p>{event.eventDate} {event.eventTime}</p>

          <h4>Комментарии:</h4>
          {event.comments.map((comment, idx) => (
            <div key={idx}>
              <p><strong>{comment.username}:</strong> {comment.comment} (Оценка: {comment.rating})</p>
            </div>
          ))}

          <CommentForm addComment={addComment} eventId={event.id} />
        </div>
      ))}
    </div>
  );
}

export default EventList;
