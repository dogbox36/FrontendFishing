import React from "react";
import { RouteComponentProps, withRouter} from "react-router";
import './style.css';
const Regex = RegExp(/^\s?[A-Z0–9]+[A-Z0–9._+-]{0,}@[A-Z0–9._+-]+\.[A -Z0–9]{2,4}\s?$/i);
interface SignUpProps extends RouteComponentProps {
    name?: any;
    value?: any;
 }
 interface SignUpState {
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

export class SignUp extends React.Component<SignUpProps, SignUpState>{


     
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
        const { username, value } = event.target;
        let errors = this.state.errors;
        switch (username) {
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
      this.setState(Object.assign(this.state, { errors,[username]: value }));
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

      constructor(props: SignUpProps) {
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


    handleLogin = () => {
        this.props.history.push('/');
    };


    render() {
        const {errors} = this.state
        return (
          <div className='wrapper'>
            <div className='form-wrapper'>
               <h2>Regisztráció</h2>
               <form onSubmit={this.handleSubmit} noValidate >
                  <div className='username'>
                     <label htmlFor="username">Teljes Név</label>
                     <input type='text' name='username' onChange={this.handleChange}/>
                     {errors.username.length > 0 &&  <span style={{color: "red"}}>{errors.username}</span>}
                  </div>
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
                  <div className='phone'>
                     <label htmlFor="phone">Telefonszám</label>
                     <input type='number' placeholder="+36" name='phone' onChange={this.handleChange}/>
                     {errors.phone.length > 0 &&  <span style={{color: "red"}}>{errors.phone}</span>}
                  </div>
                  <div className='submit' onClick={this.handleUpload}>
                     <button>Regisztráció</button>
                  </div>
                  <div className='submit' onClick={this.handleLogin}>
                      <button>Vissza a Bejelentkezéshez</button>
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

export default withRouter(SignUp);
