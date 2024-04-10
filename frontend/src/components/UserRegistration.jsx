import React, { useState } from 'react';
import axios from 'axios';

const UserRegistration = () => {
  const [username, setUsername] = useState('');

  const handleRegistration = async () => {
    try {
      const response = await axios.get(
        `https://localhost:3001/register?username=${username}`
      );
      console.log(response.data);
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div>
      <div className="register-box">
        <div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />
        </div>

        <div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter email"
          />
        </div>
        <button className="btn-reg" onClick={handleRegistration}>
          Register
        </button>
      </div>
    </div>
  );
};

export default UserRegistration;
