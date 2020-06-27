import React from 'react';
import './loginPage.scss';

import Features from './features/features';
import Login from './login/login';
import Register from'./register/register';

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginRegisterComponent: 'Login',
      email: '',
      password: '',
      repeatPassword: '',
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

    console.log(this.state.email);
    console.log(this.state.password);
    console.log(this.state.repeatPassword);
  }

  handleRegister = (e) => {
    e.preventDefault();

    console.log(this.state.email);
    console.log(this.state.password);
    console.log(this.state.repeatPassword);
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
