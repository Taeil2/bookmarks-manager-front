import React from 'react';
// import './login.scss';

export default class Login extends React.Component {
  render() {
    return (
      <div className="login-box">
        <h4>Login</h4>
        <form onSubmit={(e) => this.props.handleLogin(e)}>
          <label htmlFor="email">Email</label>
          <input type="text" id="email" value={this.props.vars.email} onChange={e => this.props.handleChange(e.target.value, 'email')} />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={this.props.vars.password}  onChange={e => this.props.handleChange(e.target.value, 'password')} />
          {/* <div><a href="/" className="forgot-password-button"><small>Forgot password?</small></a></div> */}
          <button type="submit">Login</button>
          {this.props.vars.loginFailure &&
            <div className="failure">{this.props.vars.error}</div>
          }
          {this.props.vars.registerSuccess &&
            <div className="success">Registration complete! Login now.</div>
          }
        </form>
        <p>Need an account? <a href="/" onClick={(e) => this.props.updateComponent(e, 'Register')}>Register</a></p>
      </div>
    );
  }
}
