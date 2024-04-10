import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const AuthenticateUser = ({ userId }) => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const authenticateUser = async () => {
    axios
      .get(`/authenticate/${userId}?username=${username}`)
      .then((response) => {
        navigate('/finalize-registration');
        console.log('ooyy');
        console.log('tshshu', response.data);
      })
      .catch((error) => {
        console.error('Error authenticating user:', error);
      });
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
