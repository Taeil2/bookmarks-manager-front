import React from 'react';
import './app.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import AppContext from '../../appContext';

import PrivateRoute from '../utils/privateRoute';
import PublicRoute from '../utils/publicRoute';
import Page from '../page/page';
import LoginPage from '../loginPage/loginPage';
import Modal from '../modal/modal';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: [],
      activePage: null,
      pageBookmarks: [],
      drawerBookmarks: [],
      modalShown: false,
      modalComponent: 'AddForm',
      addOrigin: null,
      sidebarShown: false,
      sidebarComponent: 'Drawer',
      settings: {
        enable_pages: true,
        enable_folders: false,
        enable_groups: false,
        enable_hiding: false,
        icon_size: 'medium',
        icon_shape: 'rounded',
        icons_per_row: 5,
        icon_alignment: 'left'
      },
      initialNote: null,
      note: null,
      pageMuuri: null,
      drawerMuuri: null,
      pageMuuriLoaded: false,
      drawerMuuriLoaded: false,
      expanded: false,
      dragging: false,
      editObject: null,
      editOrigin: null,
    };
  }

  // functions for the context
  showModal = (modalComponent) => {
    this.setState({
      modalShown: true,
      modalComponent: modalComponent
    });
  };

  closeModal = () => {
    // e.preventDefault();
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

  changeContext = (contextUpdate) => {
    let newContext = {...this.state, ...contextUpdate}

    this.setState(newContext);
  }

  changeSettings = (settingUpdate) => {
    let newSettings = {...this.state.settings, ...settingUpdate}

    this.setState({
      settings: newSettings
    });
  }

  setPageMuuri = (muuri) => {
    this.setState({
      pageMuuri: muuri
    })
  }

  setDrawerMuuri = (muuri) => {
    this.setState({
      drawerMuuri: muuri
    })
  }

  componentDidUpdate() {
    let pageId = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
    if (pageId === '' && this.state.pages.length) {
      pageId = this.state.pages[0].id;
    } else {
      pageId = Number(pageId);
    }
    if (pageId !== this.state.activePage) {
      this.setState({activePage: pageId});
    }
  }

  render() {
    let contextValue = this.state;
    contextValue.showModal = this.showModal;
    contextValue.closeModal = this.closeModal;
    contextValue.showSidebar = this.showSidebar;
    contextValue.closeSidebar = this.closeSidebar;
    contextValue.changeContext = this.changeContext;
    contextValue.changeSettings = this.changeSettings;
    contextValue.setPageMuuri = this.setPageMuuri;
    contextValue.setDrawerMuuri = this.setDrawerMuuri;

    console.log('context:', this.state);

    return (
      <>
        <AppContext.Provider value={contextValue}>
          <Router>
            <PublicRoute path={'/'} component={LoginPage} />
            <PrivateRoute path={'/'} exact component={Page} />
            {/* <PrivateRoute path={'/page/:pageId'} render={(routeProps) => <Page routeProps={routeProps} /> } /> */}
            <PrivateRoute path={'/page/:pageId'} exact component={Page} testprops="testing" />
          </Router>
          {this.state.modalShown && <Modal />}
        </AppContext.Provider>
      </>
    );
  }
}
