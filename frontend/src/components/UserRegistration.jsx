import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  startAuthentication,
  startRegistration,
} from '@simplewebauthn/browser';

const UserRegistration = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const handleRegistration = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4001/authn/register?username=${username}`
      );
      console.log(response.data);
      // const data = await startRegistration(await response.data.json());

      navigate('/finalize-registration');
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter username vishnu..."
        style={{
          padding: '10px',
          margin: '10px',
          borderRadius: '5px',
          border: '1px solid #ccc',
          width: '300px',
          fontSize: '16px',
        }}
      />
      <button
        className="btn-reg"
        onClick={handleRegistration}
        style={{
          padding: '10px 20px',
          margin: '10px',
          borderRadius: '5px',
          border: 'none',
          backgroundColor: '#007bff',
          color: '#fff',
          fontSize: '16px',
          cursor: 'pointer',
        }}
      >
        Register
      </button>
    </div>
  );
};

export default UserRegistration;
