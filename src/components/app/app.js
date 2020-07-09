import React from 'react';
import './app.scss';
import { BrowserRouter as Router } from 'react-router-dom';

import PrivateRoute from '../utils/privateRoute';
import PublicRoute from '../utils/publicRoute';
import Page from '../page/page';
import LoginPage from '../loginPage/loginPage';
import Demo from '../demo/demo';

export default class App extends React.Component {
  render() {
    return (
      <>
        <Router>
          <PublicRoute path={'/'} component={LoginPage} />
          <PrivateRoute path={'/'} exact component={Page} />
          {/* <PrivateRoute path={'/page/:pageId'} render={(routeProps) => <Page routeProps={routeProps} /> } /> */}
          <PrivateRoute path={'/page/:pageId'} exact component={Page} testprops="testing" />
          <PublicRoute path={'/demo'} component={Demo} />
        </Router>
      </>
    );
  }
}
