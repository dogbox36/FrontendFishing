import React, { Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect, RouteProps } from 'react-router-dom';

import SignUp from './components/SignUpForm';
import Login from './components/Login';
import ProfilePage from './components/ProfilePage';
import CalendarPage from './components/pages/CalendarPage';
import BlogPage from './components/pages/BlogPage';
import CatchdiaryPage from './components/pages/CatchdiaryPage';
import ImagesPage from './components/pages/ImagesPage';
import ContactPage from './components/pages/ContactPage';
import MainPage from './components/pages/MainPage';
import GyikPage from './components/pages/GyikPage';


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
      : <Redirect to='/main' />
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
              <PrivateRoute path="/calendar" component={CalendarPage} loggedIn={loggedIn} onLogout={this.handleLogout} />
              <PrivateRoute path="/blog" component={BlogPage} loggedIn={loggedIn} onLogout={this.handleLogout} />
              <PrivateRoute path="/catchdiary" component={CatchdiaryPage} loggedIn={loggedIn} onLogout={this.handleLogout} />
              <PrivateRoute path="/contact" component={ContactPage} loggedIn={loggedIn} onLogout={this.handleLogout} />
              <PrivateRoute path="/gyik" component={GyikPage} loggedIn={loggedIn} onLogout={this.handleLogout} />
              <PrivateRoute path="/images" component={ImagesPage} loggedIn={loggedIn} onLogout={this.handleLogout} />
              <Route path='/'>
                <Login
                  authToken={authToken}
                  onAuthTokenChange={(token) => this.setState({ authToken: token })}
                />
                {loggedIn ? (
                  <MainPage
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
