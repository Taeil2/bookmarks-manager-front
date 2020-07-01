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
      registerSuccess: false
    }
  }

  updateComponent = (e, componentName) => {
    e.preventDefault();
    this.setState({loginRegisterComponent: componentName});
  }

  handleChange = (value, key) => {
    this.setState({[key]: value})
  }

  handleLogin = (e) => {
    e.preventDefault();

    this.setState({ error: null })

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
      console.log('login success');
      window.location.reload(false);
    })
    .catch(res => {
      this.setState({ error: res.error })
    })
  }

  handleRegister = (e) => {
    e.preventDefault();
    this.setState({ error: null })

    // check
    if (this.state.email === '' || this.state.password === '' || this.state.repeatPassword === '') {
      console.log('fill all fields')
    }
    if (!validator.validate(this.state.email)) {
      console.log('not a valid email');
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
        console.log('registration success');
        this.setState({
          loginRegisterComponent: 'Login',
          registerSuccess: true
        });
      })
      .catch(res => {
        this.setState({ error: res.error })
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
