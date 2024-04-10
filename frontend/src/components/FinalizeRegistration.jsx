import React, { useState } from 'react';
import axios from 'axios';

const FinalizeRegistration = ({ userId }) => {
  const [credential, setCredential] = useState('');

  const finalizeRegistration = async () => {
    try {
      const response = await axios.get(`/register/${userId}`, { credential });
      console.log(response.data);
    } catch (error) {
      console.error('Error finalizing registration:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={credential}
        onChange={(e) => setCredential(e.target.value)}
        placeholder="Enter credential"
      />
      <button onClick={finalizeRegistration}>Finalize Registration</button>
    </div>
  );
};

export default FinalizeRegistration;
