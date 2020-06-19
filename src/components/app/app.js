import React from 'react';
import './app.scss';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Page from '../page/page';
import Login from '../login/login';

export default function App() {
  return (
    <Router>
      <Route path="/" exact component={Page} />
      <Route path="/login" component={Login} />
      <Route path="/page/:pageId" component={Page} />
    </Router>
  );
}
