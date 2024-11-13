import React, { useState } from 'react';

function EventForm({ addEvent }) {
  const [formData, setFormData] = useState({
    eventName: '',
    description: '',
    eventDate: '',
    eventTime: '',
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

    if (!formData.eventName) {
      formErrors.eventName = 'Название события обязательно';
      isValid = false;
    }

    if (!formData.description) {
      formErrors.description = 'Описание события обязательно';
      isValid = false;
    }

    if (!formData.eventDate) {
      formErrors.eventDate = 'Дата события обязательна';
      isValid = false;
    }

    if (!formData.eventTime) {
      formErrors.eventTime = 'Время события обязательно';
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      addEvent(formData);
      setFormData({
        eventName: '',
        description: '',
        eventDate: '',
        eventTime: '',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Название события:
          <input type="text" name="eventName" value={formData.eventName} onChange={handleChange} />
        </label>
        {errors.eventName && <span>{errors.eventName}</span>}
      </div>
      <div>
        <label>Описание события:
          <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
        </label>
        {errors.description && <span>{errors.description}</span>}
      </div>
      <div>
        <label>Дата события:
          <input type="date" name="eventDate" value={formData.eventDate} onChange={handleChange} />
        </label>
        {errors.eventDate && <span>{errors.eventDate}</span>}
      </div>
      <div>
        <label>Время события:
          <input type="time" name="eventTime" value={formData.eventTime} onChange={handleChange} />
        </label>
        {errors.eventTime && <span>{errors.eventTime}</span>}
      </div>
      <div>
        <button type="submit">Добавить событие</button>
      </div>
    </form>
  );
}

export default EventForm;
