import React, { useState } from 'react';

function CommentForm({ addComment, eventId }) {
  const [formData, setFormData] = useState({
    username: '',
    comment: '',
    rating: 1,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    if (!formData.username) {
      formErrors.username = 'Имя обязательно';
      isValid = false;
    }

    if (!formData.comment) {
      formErrors.comment = 'Комментарий не может быть пустым';
      isValid = false;
    }

    if (formData.rating < 1 || formData.rating > 5) {
      formErrors.rating = 'Оценка должна быть от 1 до 5';
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      addComment(eventId, formData);
      setFormData({
        username: '',
        comment: '',
        rating: 1,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Имя:
          <input type="text" name="username" value={formData.username} onChange={handleChange} />
        </label>
        {errors.username && <span>{errors.username}</span>}
      </div>
      <div>
        <label>Комментарий:
          <textarea name="comment" value={formData.comment} onChange={handleChange}></textarea>
        </label>
        {errors.comment && <span>{errors.comment}</span>}
      </div>
      <div>
        <label>Оценка:
          <input type="number" name="rating" value={formData.rating} onChange={handleChange} min="1" max="5" />
        </label>
        {errors.rating && <span>{errors.rating}</span>}
      </div>
      <div>
        <button type="submit">Добавить комментарий</button>
      </div>
    </form>
  );
}

export default CommentForm;
