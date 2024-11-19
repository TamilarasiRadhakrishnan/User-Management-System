import React, { useState, useEffect } from 'react';

const UserForm = ({ addUser, updateUser, currentUser, setCurrentUser, closeForm }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  useEffect(() => {
    if (currentUser) setFormData(currentUser);
  }, [currentUser]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentUser) {
      updateUser({ ...formData, id: currentUser.id });
    } else {
      addUser({ ...formData, id: Date.now() });
    }
    setFormData({ name: '', email: '' });
    setCurrentUser(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">{currentUser ? 'Update User' : 'Add User'}</button>
      <button type="button" onClick={closeForm}>Cancel</button>
    </form>
  );
};

export default UserForm;
