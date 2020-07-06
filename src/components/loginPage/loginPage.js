import React from 'react';
import './loginPage.scss';
import validator from 'email-validator';

import Features from './features/features';
import Login from './login/login';
import Register from'./register/register';
import TokenService from '../../services/token-service'
import AuthApiService from '../../services/auth-api-service'

export default class LoginPage extends React.Component {
  // static defaultProps = {
  //   onLoginSuccess: () => {},
  //   onRegistrationSuccess: () => {}
  // }

  constructor(props) {
    super(props);
    this.state = {
      loginRegisterComponent: 'Login',
      email: '',
      password: '',
      repeatPassword: '',
      error: null,
      registerSuccess: false,
      registerFailure: false,
      loginFailure: false,
      hasUpper: false,
      hasLower: false,
      hasNumber: false,
      hasSpecial: false,
    }
  }

  updateComponent = (e, componentName) => {
    e.preventDefault();
    this.setState({loginRegisterComponent: componentName});
  }

  handleChange = (value, key) => {
    this.setState({[key]: value})
    if (key === 'password') {
      if (/[A-Z]/.test(value)) {
        this.setState({hasUpper: true});
      } else {
        this.setState({hasUpper: false});
      }
      if (/[a-z]/.test(value)) {
        this.setState({hasLower: true});
      } else {
        this.setState({hasLower: false});
      }
      if (/\d/.test(value)) {
        this.setState({hasNumber: true});
      } else {
        this.setState({hasNumber: false});
      }
      if (/\W/.test(value)) {
        this.setState({hasSpecial: true});
      } else {
        this.setState({hasSpecial: false});
      }
    }
  }

  handleLogin = (e) => {
    e.preventDefault();

    this.setState({
      loginFailure: false,
      error: null
    });

    AuthApiService.postLogin({
      email: this.state.email,
      password: this.state.password
    })
    .then(res => {
      this.setState({
        email: '',
        password: ''
      });
      TokenService.saveAuthToken(res.authToken)
      // this.props.onLoginSuccess()
      window.location.reload(false);
    })
    .catch(res => {
      this.setState({
        loginFailure: true,
        error: res.error
      })
    })
  }

  handleRegister = (e) => {
    e.preventDefault();
    this.setState({
        registerFailure: false,
        error: null
      });

    // check
    if (this.state.email === '' || this.state.password === '' || this.state.repeatPassword === '') {
      this.setState({
        registerFailure: true,
        error: 'All fields are required' }
      );
      return; // stop registration
    }
    if (!validator.validate(this.state.email)) {
      this.setState({
        registerFailure: true,
        error: 'Email is not valid'
      });
      return; // stop registration
    }
    if (this.state.password !== this.state.repeatPassword) {
      this.setState({
        registerFailure: true,
        error: 'Passwords do not match'
      });
      return; // stop registration
    }

    AuthApiService.postUser({
      email: this.state.email,
      password: this.state.password,
    })
      .then(user => {
        this.setState({
          email: '',
          password: '',
          repeatPassword: ''
        });
        // this.props.onRegistrationSuccess()
        this.setState({
          loginRegisterComponent: 'Login',
          registerSuccess: true,
          registerFailure: false,
          loginFailure: false
        });
      })
      .catch(res => {
        this.setState({
          registerFailure: true,
          error: res.error
        })
      })
  }

  render() {
    let loginRegisterComponent;
    switch(this.state.loginRegisterComponent) {
      case 'Login':
        loginRegisterComponent = <Login vars={this.state} updateComponent={this.updateComponent} handleChange={this.handleChange} handleLogin={this.handleLogin} />;
        break;
      case 'Register':
        loginRegisterComponent = <Register vars={this.state} updateComponent={this.updateComponent} handleChange={this.handleChange} handleRegister={this.handleRegister} />;
        break;
      default:
        break;
    }

    return (
      <main className="login-page">
        <div className="wrapper">
          <section className="features">
            <Features />
          </section>
          <section className="login">
            {loginRegisterComponent}
          </section>
        </div>
      </main>
    );
  }
}
