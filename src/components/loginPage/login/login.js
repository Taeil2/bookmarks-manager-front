import React from 'react';
// import './login.scss';

export default class Login extends React.Component {
  render() {
    let registerSuccess;
    if (this.props.registerSuccess) {
      registerSuccess = <div className="register-success">Registration complete! Login now.</div>
    }

    return (
      <div className="login-box">
        {registerSuccess}
        <h4>Login</h4>
        <form onSubmit={(e) => this.props.handleLogin(e)}>
          <label htmlFor="email">Email</label>
          <input type="text" id="email" value={this.props.vars.email} onChange={e => this.props.handleChange(e.target.value, 'email')} />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={this.props.vars.password}  onChange={e => this.props.handleChange(e.target.value, 'password')} />
          {/* <div><a href="/" className="forgot-password-button"><small>Forgot password?</small></a></div> */}
          <button type="submit">Login</button>
        </form>
        <p>Have an account? <a href="/" onClick={(e) => this.props.updateComponent(e, 'Register')}>Register</a></p>
      </div>
    );
  }
}
