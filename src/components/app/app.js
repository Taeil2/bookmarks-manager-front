import React from 'react';
import './app.scss';
import BookmarksContext from '../../context';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Page from '../page/page';
import Login from '../login/login';
import Modal from '../modal/modal';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }

  // functions for the context
  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  };

  render() {
    const contextValue = {
      bookmarks: [],
      showModal: false,
      toggleModal: this.toggleModal
    }

    return (
      <>
        <BookmarksContext.Provider value={this.contextValue}>
          <Router>
            <Route path="/" exact component={Page} />
            <Route path="/login" component={Login} />
            <Route path="/page/:pageId" component={Page} />
          </Router>
          {this.state.showModal && <Modal />}
        </BookmarksContext.Provider>
      </>
    );
  }
}
