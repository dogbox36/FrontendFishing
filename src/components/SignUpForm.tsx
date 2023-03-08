import React from "react";
import { RouteComponentProps, withRouter} from "react-router";
import './style.css';
import './Alert.css';


const Regex = RegExp(/^\s?[A-Z0–9]+[A-Z0–9._+-]{0,}@[A-Z0–9._+-]+\.[A -Z0–9]{2,4}\s?$/i);
interface SignUpProps extends RouteComponentProps {
    name?: any;
    value?: any;
    alert: AlertProps ;
 }
 interface SignUpState {
   username: string;
   email: string;
   password: string;
   phone: string;
   errors: {
      username: string;
      email: string;
      password: string;
      phone: string;
   };
   alert: AlertState;
}

 interface AlertProps {
   type: 'success' | 'error';
   message: string;
 }

 interface AlertState {
   type: 'success' | 'error';
   message: string;
   show: boolean;
   }

export class SignUp extends React.Component<SignUpProps, SignUpState>{


   timeoutId: ReturnType<typeof setTimeout> | undefined;

   handleClose = () => {
      this.setState({ alert: { ...this.state.alert, show: false } });
    };
     
    handleUpload = async () => {
      const { username, password, email, phone } = this.state;
    
      const loginData = {
        username: username,
        password: password,
        email: email,
        phone: phone,
      };
    
      let response = await fetch('http://localhost:3000/auth/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
    
      let responseData = await response.json();
    
      if (response.ok && responseData.message === 'Registration successful') {
        this.setState({
          username: '',
          password: '',
          email: '',
          phone: '',
          alert: {
            type: 'success',
            message: 'Sikeres regisztráció!',
            show: true,
          },
        });
        this.timeoutId = setTimeout(() => {
          this.setState({ alert: { ...this.state.alert, show: false } });
          window.location.href = '/login'; // Redirect to login page
        }, 5000);
      } else if (response.status === 400) {
        this.setState({
          alert: {
            type: 'error',
            message: responseData.message,
            show: true,
          },
        });
      } else {
        this.setState({
          alert: {
            type: 'error',
            message: 'Hiba történt a regisztráció során.',
            show: true,
          },
        });
      }
    };
    

    handleChange = (event: any) => {
      console.log('handle change');

      event.preventDefault();
      const { name, value } = event.target;
      console.log(value);

      let errors = this.state.errors;
      switch (name) {
          case 'username':
              errors.username = value.length < 5 ? 'A felhasználónévnek minimum 5 karakter hosszúnak kell lennie!' : '';
              break;
          case 'email':
              errors.email = Regex.test(value) ? '' : 'Email cím nem érvényes!';
              break;
          case 'password':
              errors.password = value.length < 8 ? 'A jelszónak minimum 8 karakterből kell állnia!' : '';
              break;
          default:
              break;
      }

      this.setState(Object.assign(this.state, { errors, [name]: value }));

      console.log(this.state);
  }
  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
   event.preventDefault();
 
   let validity = true;
   Object.values(this.state.errors).forEach((val) => {
     if (val.length > 0) {
       validity = false;
     }
   });
 
   if (validity) {
     console.log("Registering can be done");
     this.setState({ 
       alert: { type: "success", message: "Sikeres Regisztráció!", show: true } 
     });
     this.timeoutId = setTimeout(() => {
       this.props.history.push("/");
     }, 5000);
   } else {
     console.log("You cannot be registered!!!");
     this.setState({ 
       alert: { type: "error", message: "Nem sikerült regisztrálni!", show: true } 
     });
   }
 };
 
 constructor(props: SignUpProps) {
   super(props);
   const initialState: SignUpState = {
      username: '',
      email: '',
      password: '',
      phone: '',
      errors: {
         username: '',
         email: '',
         password: '',
         phone: '',
      },
      alert: { type: 'success', message: '', show: false },
   };
   this.state = initialState;
   this.handleChange = this.handleChange.bind(this);
}



    handleLogin = () => {
        this.props.history.push('/');
    };


    render() {
      const { alert } = this.state;
      const { errors } = this.state;
      return (
        <div className="wrapper">
          <div className="form-wrapper">
            <h2>Regisztráció</h2>
            <form onSubmit={this.handleSubmit} noValidate>
              <div className="username">
                <label htmlFor="username">Felhasználónév</label>
                <input type="text" name="username" onChange={this.handleChange} />
                {errors.username.length > 0 && (
                  <span style={{ color: "red" }}>{errors.username}</span>
                )}
              </div>
              <div className="email">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" onChange={this.handleChange} />
                {errors.email.length > 0 && (
                  <span style={{ color: "red" }}>{errors.email}</span>
                )}
              </div>
              <div className="password">
                <label htmlFor="password">Jelszó</label>
                <input type="password" name="password" onChange={this.handleChange} />
                {errors.password.length > 0 && (
                  <span style={{ color: "red" }}>{errors.password}</span>
                )}
              </div>
              <div className="phone">
                <label htmlFor="phone">Telefonszám</label>
                <input type="number" placeholder="+36" name="phone" onChange={this.handleChange} />
                {errors.phone.length > 0 && (
                  <span style={{ color: "red" }}>{errors.phone}</span>
                )}
              </div>
              <div className="submit" onClick={this.handleUpload}>
                <button>Regisztráció</button>
              </div>
              <div className="submit" onClick={this.handleLogin}>
                <button>Vissza a Bejelentkezéshez</button>
              </div>
              {alert.show && (
                <div className={`alert ${alert.type}`}>
                  <span className="closebtn" onClick={this.handleClose}>&times;</span>
                  {alert.message}
                </div>
              )}
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
    export default withRouter(SignUp);