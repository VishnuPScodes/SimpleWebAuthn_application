import React, { useState } from 'react';
import axios from 'axios';

const FinalizeRegistration = ({ userId }) => {
  const [credential, setCredential] = useState('');

  const finalizeRegistration = async () => {
    try {
      const response = await axios.post(`/authn/register`, { credential });
      alert('Registered');
      console.log(response.data);
    } catch (error) {
      console.error('Error finalizing registration:', error);
      alert('something went wrong');
    }
  };

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <input
        type="text"
        value={credential}
        onChange={(e) => setCredential(e.target.value)}
        placeholder="Enter credential"
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
        onClick={finalizeRegistration}
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
        Finalize Registration
      </button>
    </div>
  );
};

export default FinalizeRegistration;
