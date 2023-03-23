import React, { Component, FormEvent } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import './style.css';

interface State {
  username: string;
  password: string;
  loginError: string;
}

interface Props extends RouteComponentProps {
  authToken: string;
  onAuthTokenChange: (token: string) => void;
}

class Login extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loginError: '',
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
      this.props.onAuthTokenChange('');
    }
  }

  componentDidMount() {
    const token = localStorage.getItem('authToken');
    if (token !== null) {
      this.props.onAuthTokenChange(token);
    }
  }

  handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    const loginData = {
      'username': this.state.username,
      'password': this.state.password,
    };
    const response = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(loginData),
    });
    if (!response.ok) {
      if (response.status === 401) {
        this.setState({ loginError: 'Hibás név vagy jelszó' });
      } else {
        this.setState({ loginError: 'Szerver hiba' });
      }
      return;
    }
    const responseBody = await response.json();
    localStorage.setItem('authToken', responseBody.token);
    this.setState({
      username: '',
      password: '',
      loginError: '',
      
    })
    this.props.onAuthTokenChange(responseBody.token);
  }

  handleUpload = () => {
    this.props.history.push('/SignUp');
  };

  render() {
    const { authToken } = this.props;
    const { username, password, loginError } = this.state;
    const loggedIn = authToken !== '';

    if (loggedIn) {

      return <button className="logoutbutton" onClick={this.handleLogout}>Kijelentkezés</button>
    }
    return (
      <div className='wrapper'>
        <div className='form-wrapper'>
        <h2>Bejelentkezés</h2>
          <form onSubmit={this.handleLogin}>
            <div className='username'>
            <label htmlFor="username">
              Felhasználónév:</label>
              <input   type="text" value={username} onChange={(e) => this.setState({ username: e.target.value })} />
            
            </div>
            
            <div className='password'>
            <label htmlFor="password">
              Jelszó:</label>
              <input type="password" value={password} onChange={(e) => this.setState({ password: e.target.value })} />
            
            </div>
            
            <p>{loginError}</p>
            <div className="submit">
              <button>Bejelentkezés</button>
            </div>
            <label>Még nincs fiókod?</label>
            <div className='submit' onClick={this.handleUpload}>
              <button>Regisztráció</button>
            </div>
            <div className="fish">
        <div className="koiCoil"></div>
        <div className="koiCoil"></div>
        <div className="koiCoil"></div>
        <div className="koiCoil"></div>
        <div className="koiCoil"></div>
        <div className="koiCoil"></div>
        <div className="koiCoil"></div>
        <div className="koiCoil"></div>
        <div className="koiCoil"></div>
        <div className="koiCoil"></div>
        <div className="koiCoil"></div>
        <div className="koiCoil"></div>
        <div className="koiCoil"></div>
        <div className="koiCoil"></div>
        <div className="koiCoil"></div>
    </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
