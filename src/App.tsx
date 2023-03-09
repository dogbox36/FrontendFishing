import React, { Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect, RouteProps } from 'react-router-dom';

import SignUp from './components/SignUpForm';
import Login from './components/Login';
import Main from './components/Main';
import ProfilePage from './components/ProfilePage';
import CalendarPage from './components/pages/CalendarPage';

interface State {
  authToken: string;
}

interface PrivateRouteProps extends RouteProps {
  component: React.ComponentType<any>;
  loggedIn: boolean;
  onLogout: () => void;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, loggedIn, onLogout, ...rest }) => (
  <Route {...rest} render={(props) => (
    loggedIn
      ? <Component {...props} onLogout={onLogout} />
      : <Redirect to='/' />
  )} />
);

class App extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      authToken: '',
    }
  }

  handleLogout = async () => {
    const token = localStorage.getItem('authToken');
    if (token === null) return;
  
    const response = await fetch('http://localhost:3000/auth/logout', {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (response.ok) {
      localStorage.removeItem('authToken');
      this.setState({ authToken: '' });
    }
  }

  render() {
    const { authToken } = this.state;
    const loggedIn = authToken !== '';

    return (
      <div>
        <Fragment>
          <Router>
            <Switch>
              <Route path='/SignUp'>
                <SignUp alert={{ type: 'success', message: '' }} />
              </Route>
              <Route path='/Main'>
                <Main />
              </Route>
              <PrivateRoute path="/calendar" component={CalendarPage} loggedIn={loggedIn} onLogout={this.handleLogout} />
              <Route path='/'>
                <Login
                  authToken={authToken}
                  onAuthTokenChange={(token) => this.setState({ authToken: token })}
                />
                {loggedIn ? (
                  <ProfilePage
                    authToken={authToken}
                    onLogout={this.handleLogout}
                  />
                ) : (
                  <p></p>
                )}
              </Route>
            </Switch>
          </Router>
        </Fragment>
      </div>
    );
  }
}

export default App;
