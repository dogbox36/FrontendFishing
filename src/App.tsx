import React, { useState } from 'react';
import './App.css';
import { SignUp } from './components/SignUpForm';
import { Login } from './components/Login';
function App() {
  const [showLogin, setShowLogin] = useState(true);
  const handleToggle = () => {
    setShowLogin(!showLogin);
  }

  return (
    <div>
      <button onClick={handleToggle}>
        {showLogin ? 'Regisztráció' : 'Bejelentkezés'}
      </button>
      {showLogin ? <Login /> : <SignUp />}
    </div>
    
  );
}
export default App;