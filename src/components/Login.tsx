<<<<<<< HEAD
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

  handleLogout = () => {
    localStorage.removeItem('authToken');
    this.props.onAuthTokenChange('');
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

    const response = await fetch('http://localhost:3000/api/users', {
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
      return <button onClick={this.handleLogout}>Logout</button>
    }
    return (
      <div className='wrapper'>
        <div className='form-wrapper'>
        <h2>Bejelentkezés</h2>
          <form onSubmit={this.handleLogin}>
            <div className='username'>
            <label htmlFor="username">
              Username:</label>
              <input   type="text" value={username} onChange={(e) => this.setState({ username: e.target.value })} />
            
            </div>
            
            <div className='password'>
            <label htmlFor="password">
              Password:</label>
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
=======
import React, { Component } from 'react';
import './style.css';
import {SignUp} from './SignUpForm';
import { withRouter, RouteComponentProps } from 'react-router-dom';
const Regex = RegExp(/^\s?[A-Z0–9]+[A-Z0–9._+-]{0,}@[A-Z0–9._+-]+\.[A -Z0–9]{2,4}\s?$/i);
interface LoginProps extends RouteComponentProps  {
    name?: any;
    value?: any;
 }
 interface LoginState{
    username : string,
    email : string,
    password : string,
    phone : string,
    errors : {
       username :  string,
       email : string,
       password : string,
       phone : string,
    }
 }
class Login extends React.Component<LoginProps, LoginState>{

 
    async deleteuser(id: number) {
     await fetch('http://localhost:3000/api/users/' + id, {
         method: 'DELETE',
         
     })
    }
     
    handleUpload = async () => {
     const { username, password, email,phone} = this.state;
    
  
      const adat = {
        username: username,
        password: password,
        email: email,
        phone: phone,
      };
  
      let response = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(adat),
      });
  
      this.setState({ 
         username: '',
         password: '',
         email: '',
         phone: '',
      })
  
    };

    
    handleChange = (event : any) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;
        switch (name) {
          case 'username':
             errors.username = value.length < 5 ? 'A felhasználónévnek minimum 5 karakter hosszúnak kell lennie!': '';
             break;
          case 'email':
             errors.email = Regex.test(value)? '': 'Email cím nem érvényes!';
             break;
          case 'password':
             errors.password = value.length < 8 ? 'A jelszónak minimum 8 karakterből kell állnia!': '';
             break;
          default:
            break;
        }
      this.setState(Object.assign(this.state, { errors,[name]: value }));
      console.log(this.state.errors);
      }
      handleSubmit = (event : any) => {
        event.preventDefault();
        let validity = true;
        Object.values(this.state.errors).forEach(
          (val) => val.length > 0 && (validity = false)
        );
        if(validity == true){
           console.log("Registering can be done");
        }else{
           console.log("You cannot be registered!!!")
        }
     }
     
  

      constructor(props: LoginProps) {
        super(props);
        const initialState = {
           username : '',
           email : '',
           password : '',
           phone : '',
           errors : {
             username : '',
             email : '',
             password : '',
             phone : ''
           } 
         }
         this.state = initialState;
         this.handleChange = this.handleChange.bind(this);
         
   }

   handleSignUp = () => {
    this.props.history.push("/SignUp");
  };
   


    render() {
        const {errors} = this.state
        return (
          <div className='wrapper'>
            <div className='form-wrapper'>
               <h2>Bejelentkezés</h2>
               <form onSubmit={this.handleSubmit} noValidate >
                  <div className='email'>
                     <label htmlFor="email">Email</label>
                     <input type='email' name='email' onChange={this.handleChange}/>
                     {errors.email.length > 0 &&  <span style={{color: "red"}}>{errors.email}</span>}
                  </div>
                  <div className='password'>
                     <label htmlFor="password">Jelszó</label>
                     <input type='password' name='password' onChange={this.handleChange}/>
                     {errors.password.length > 0 &&  <span style={{color: "red"}}>{errors.password}</span>}
                  </div>             
                  <div className='submit' onClick={this.handleUpload}>
                     <button>Bejelentkezés</button>
                  </div>
                  <div>
                  <button onClick={this.handleSignUp}>Go to Sign Up page</button>
    </div>
                  <div className="fish">
>>>>>>> a13ee1be53fa383ec33a4e113f1f4538d9c88cc2
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
<<<<<<< HEAD
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
=======
   
    
             </form>
         </div>
      </div>
      
     );
    }
}
export default withRouter(Login);
>>>>>>> a13ee1be53fa383ec33a4e113f1f4538d9c88cc2
