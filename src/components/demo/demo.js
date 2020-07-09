import React from 'react';

import TokenService from '../../services/token-service'
import AuthApiService from '../../services/auth-api-service'

export default class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loginFailure: false,
    }
  }

  handleLogin = (e) => {
    e.preventDefault();

    AuthApiService.postLogin({
      email: 'demo@demo.com',
      password: 'Demo123!'
    })
    .then(res => {
      TokenService.saveAuthToken(res.authToken)
      window.location.reload(false);
    })
    .catch(res => {
      this.setState({
        error: res.error
      })
    })
  }

  render() {
    this.handleLogin();

    return (
      <>
        {this.state.error !== null &&
          <p>Login failed: {this.state.error}</p>
        }
      </>
    );
  }
}
