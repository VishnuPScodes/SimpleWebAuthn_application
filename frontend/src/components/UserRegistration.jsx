import React, { useState } from 'react';
import axios from 'axios';

const UserRegistration = () => {
  const [username, setUsername] = useState('');

  const handleRegistration = async () => {
    try {
      const response = await axios.get(`/register?username=${username}`);
      console.log(response.data);
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter username"
      />
      <button onClick={handleRegistration}>Register</button>
    </div>
  );
};

export default UserRegistration;
