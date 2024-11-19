import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserForm from './UserForm';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Fetch users
  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((response) => setUsers(response.data))
      .catch(() => setError('Failed to fetch users.'));
  }, []);

  // Add user
  const addUser = (newUser) => {
    setUsers([...users, newUser]);
    setIsFormVisible(false);
  };

  // Edit user
  const updateUser = (updatedUser) => {
    setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
    setIsFormVisible(false);
  };

  // Delete user
  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div>
      {error && <p className="error">{error}</p>}
      <button onClick={() => setIsFormVisible(true)}>Add User</button>
      {isFormVisible && (
        <UserForm
          addUser={addUser}
          updateUser={updateUser}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          closeForm={() => setIsFormVisible(false)}
        />
      )}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => {
                  setCurrentUser(user);
                  setIsFormVisible(true);
                }}>
                  Edit
                </button>
                <button onClick={() => deleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
