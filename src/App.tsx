<<<<<<< HEAD
import { Fragment, useState } from 'react';
import React from 'react';
import './App.css';
import { Route, Router, Switch, useHistory } from 'react-router';
import { createBrowserHistory } from 'history';

import SignUp from './components/SignUpForm';
import Login from './components/Login';
import Main from './components/Main';
import ProfileData from './ProfileData';
import ProfilePage from './components/ProfilePage';


interface State {
  authToken: string;
}

class App extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      authToken: '',
    }
  }

  render() {
    const { authToken } = this.state;
    const loggedIn = authToken !== '';

    return (
      <div>
        <Fragment>
          <Router history={createBrowserHistory()}>
            <Switch>
              <Route path='/SignUp'>
                <SignUp />
              </Route>
              <Route path='/Main'>
                <Main />
              </Route>
              <Route path='/'>
              <Login
        authToken={authToken}
        onAuthTokenChange={(token) => this.setState({ authToken: token })}
      />
      {
        loggedIn ?
          <ProfilePage authToken={authToken} /> :
          <p>Please log in</p>
      }
              </Route>
            </Switch>
          </Router>
        </Fragment>
      </div>
    );
  }
=======
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
>>>>>>> a13ee1be53fa383ec33a4e113f1f4538d9c88cc2
}
export default App;