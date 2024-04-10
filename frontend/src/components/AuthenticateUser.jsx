import React, { useState } from 'react';
import axios from 'axios';

const AuthenticateUser = ({ userId }) => {
  const [username, setUsername] = useState('');

  const authenticateUser = async () => {
    try {
      const response = await axios.get(
        `/authenticate/${userId}?username=${username}`
      );
      console.log(response.data);
    } catch (error) {
      console.error('Error authenticating user:', error);
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
      <button onClick={authenticateUser}>Authenticate</button>
    </div>
  );
};

export default AuthenticateUser;
