import React from 'react';
// import './register.scss';

export default class Register extends React.Component {

  render() {
    return (
      <div className="registration-box">
        <h4>Login</h4>
        <form onSubmit={(e) => this.props.handleRegister(e)}>
          <label htmlFor="email">Email</label>
          <input type="text" id="email" value={this.props.vars.email} onChange={e => this.props.handleChange(e.target.value, 'email')} />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={this.props.vars.password}  onChange={e => this.props.handleChange(e.target.value, 'password')} />
          <ul className="requirements">
            <li><i className="fas fa-check-circle"></i> upper case</li>
            <li><i className="fas fa-check-circle"></i> lower case</li>
            <li><i className="fas fa-check-circle"></i> number</li>
            <li><i className="fas fa-check-circle"></i> special character</li>
          </ul>
          <label htmlFor="repeat-password">Password</label>
          <input type="password" id="repeat-password" value={this.props.vars.repeatPassword}  onChange={e => this.props.handleChange(e.target.value, 'repeatPassword')} />
          <button type="submit">Register</button>
        </form>
        <p>Need an account? <a href="/" onClick={(e) => this.props.updateComponent(e, 'Login')}>Login</a></p>
      </div>
    );
  }
}
