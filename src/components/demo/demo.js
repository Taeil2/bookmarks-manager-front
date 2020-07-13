import React from 'react';

import TokenService from '../../services/token-service'
import AuthApiService from '../../services/auth-api-service'

export default class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // error: null,
      loginFailure: false,
    }
  }

  handleLogin = (e) => {
    AuthApiService.postLogin({
      email: 'demo@demo.com',
      password: 'Demo123!'
    })
    .then(res => {
      TokenService.saveAuthToken(res.authToken)
      window.location.reload(false);
    })
    .catch(res => {
      console.log(res);
      alert('Login failed: ', res.error)
      // this.setState({
      //   error: res.error
      // })
    })
  }

  render() {
    this.handleLogin();

    return (
      <>
      </>
    );
  }
}
