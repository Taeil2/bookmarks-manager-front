import React from 'react';
import './login.scss';

import Features from './features/features';

export default function Login() {
  return (
    <main className="login-page">
      <div className="wrapper">
        <section className="features">
          <Features />
        </section>
        <section className="login">
          <div className="login-box">
            <h4>Login</h4>
            <form>
              <label>Email</label>
              <input type="text" />
              <label>Password</label>
              <input type="password" />
              <a href="/" className="forgot-password-button"><small>Forgot password?</small></a>
              <a href="./bookmarks" className="btn">Login</a>
              <div><small>Note: Click Login to see the logged in page on this wireframe</small></div>
            </form>
            <p>Need an account? <a href="/">Register</a></p>
          </div>
        </section>
      </div>
    </main>
  );
}
