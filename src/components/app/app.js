import React from 'react';
import './app.scss';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AppContext from '../../appContext';

import Page from '../page/page';
import LoginPage from '../loginPage/loginPage';
import Modal from '../modal/modal';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookmarks: [],
      modalShown: false,
      modalComponent: 'AddForm',
      sidebarShown: false,
      sidebarComponent: 'Drawer',
      settings: {
        enable_pages: false,
        enable_folders: false,
        enable_groups: false,
        enable_hiding: false,
        icon_size: 'medium',
        icon_shape: 'rounded',
        per_row: 8
      },
      note: '',
    };
  }

  // functions for the context
  showModal = (modalComponent) => {
    this.setState({
      modalShown: true,
      modalComponent: modalComponent
    });
  };

  closeModal = (e) => {
    e.preventDefault();

    this.setState({
      modalShown: false
    })
  }

  showSidebar = (sidebarComponent) => {
    // toggle the sidebar if it's the same button
    if (sidebarComponent === this.state.sidebarComponent && document.getElementById('bookmarks-btn').offsetParent === null) {
      this.setState({
        sidebarShown: !this.state.sidebarShown
      });
    } else { // show the appropriate sidebar if it's a different button
      this.setState({
        sidebarShown: true,
        sidebarComponent: sidebarComponent
      });
    }
  }

  closeSidebar = (e) => {
    e.preventDefault();

    this.setState({
      sidebarShown: false
    })
  }

  render() {
    let contextValue = this.state;
    contextValue.showModal = this.showModal;
    contextValue.closeModal = this.closeModal;
    contextValue.showSidebar = this.showSidebar;
    contextValue.closeSidebar = this.closeSidebar;

    return (
      <>
        <AppContext.Provider value={contextValue}>
          <Router>
            <Route path="/" exact component={Page} />
            <Route path="/login" component={LoginPage} />
            <Route path="/page/:pageId" component={Page} />
          </Router>
          {this.state.modalShown && <Modal />}
        </AppContext.Provider>
      </>
    );
  }
}
