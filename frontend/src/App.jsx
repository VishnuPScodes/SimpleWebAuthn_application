import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import UserRegistration from './components/UserRegistration';
// import FinalizeRegistration from './components/FinalizeRegistration';
import AuthenticateUser from './components/AuthenticateUser';
import FinalizeRegistration from './components/FinalizeRegistration';
import UserRegistration from './components/UserRegistration';
//  import AuthenticateUser from './components/AuthenticateUser';
import './app.css';
const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<UserRegistration />} />
          <Route
            path="/finalize-registration"
            element={<FinalizeRegistration />}
          />
          <Route path="/authenticate/:userId" element={<AuthenticateUser />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
