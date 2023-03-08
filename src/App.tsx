import { Fragment, useState } from 'react';
import React from 'react';
import './App.css';
import { Route, Router, Switch, useHistory } from 'react-router';
import { createBrowserHistory } from 'history';

import SignUp from './components/SignUpForm';
import Login from './components/Login';
import Main from './components/Main';
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
              <SignUp alert={{ type: 'success', message: '' }} />

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
          <p></p>
      }
              </Route>
            </Switch>
          </Router>
        </Fragment>
      </div>
    );
  }
}

export default App;
