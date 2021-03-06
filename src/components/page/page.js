import React from 'react';
import { Link } from 'react-router-dom';
import './page.scss';
import AppContext from '../../appContext';

// import sightengine from 'sightengine'("{api_user}", "{api_secret}");

import SearchBar from './searchBar/searchBar';
import PageNavigation from './pageNavigation/pageNavigation';
import Bookmarks from '../bookmarks/bookmarks';
import Sidebar from '../sidebar/sidebar';
import Modal from '../modal/modal';
import TokenService from '../../services/token-service';

import PagesApiService from '../../services/pages-api-service';
import UsersService from '../../services/users-api-service'
import BookmarksApiService from '../../services/bookmarks-api-service';

export default class Page extends React.Component {
  /* ---- Context ---- */
  constructor(props) {
    super(props);
    this.state = {
      pages: [],
      activePage: null,
      pageBookmarks: [],
      drawerBookmarks: [],
      folderBookmarks: [],
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
        icon_alignment: 'left',
        random_background: false,
        unsplash_url: 'https://unsplash.com/photos/phIFdC6lA4E',
      },
      pageLoaded: false,
      initialNote: null,
      note: null,
      hidden: true,
      editObject: null,
      moveObject: null
    };

    this.photographer = '';
    this.photographerLink = '';
    this.backgroundUrl = '';
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

  loadUserData = () => {
    UsersService.getUserById()
      .then((result) => {
        // console.log(result);
        this.setState({
          settings: {
            enable_pages: result.enable_pages,
            enable_folders: result.enable_folders,
            icon_size: result.icon_size,
            icon_shape: result.icon_shape,
            icons_per_row: result.icons_per_row,
            icon_alignment: result.icon_alignment,
            enable_groups: result.enable_groups,
            enable_hiding: result.enable_hiding,
            random_background: result.random_background,
            unsplash_url: result.unsplash_url
          },
          initialNote: result.note,
        });
        this.getBackgroundImage();
      });

    PagesApiService.getPages()
      .then((result) => {
        this.setState({
          pages: result
        })
        this.getBookmarks();
      });
  }

  getBookmarks = () => {
    BookmarksApiService.getBookmarksByPage(this.state.activePage)
      .then(result => {
        this.setState({
          pageBookmarks: result,
          pageLoaded: true
        });
      });
    let drawer = this.state.pages.filter((page) => page.is_drawer === true)[0];
    BookmarksApiService.getBookmarksByPage(drawer.id)
      .then(result => this.setState({drawerBookmarks: result}));
  }

  /* ---- Page Functions ---- */
  handleLogoutClick = () => {
    TokenService.clearAuthToken();
  }

  toggleHidden = () => {
    this.setState({hidden: !this.state.hidden});
  }

  getBackgroundImage = () => {
    let unsplashApiUrl = '';
    if (this.state.settings.random_background) {
      unsplashApiUrl = 'https://api.unsplash.com/photos/random/?featured=true&orientation=landscape&client_id=CukhwVBuro-F3PuSK0t1q4IXLZCpDhtHc5uQVPRpFr4';
    } else {
      console.log('unsplash image', this.state.settings.unsplash_url)
      let parts = this.state.settings.unsplash_url.split('/');
      let photosFound = false;
      let photoId;
      // the part of the URL that matches the photo ID comes after "photos"
      parts.forEach(part => {
        if (part === 'photos') {
          photosFound = true;
        }
        if (photosFound) {
          photoId = part;
        }
      });

      // Gf_KqXHU-PY
      unsplashApiUrl = `https://api.unsplash.com/photos/${photoId}/?client_id=CukhwVBuro-F3PuSK0t1q4IXLZCpDhtHc5uQVPRpFr4`;
    }
    fetch(unsplashApiUrl)
      .then(response => response.json())
      .then(json => {
        if (!json.id) {
          this.useFallbackImage();
        } else {
          document.body.style.backgroundImage = `url('${json.urls.regular}')`;
          this.photographer = json.user.name;
          this.photographerUrl = json.user.links.html;
          this.backgroundImage = json.links.html;
        }
      });
  }

  useFallbackImage = () => {
    fetch('https://api.unsplash.com/photos/phIFdC6lA4E/?client_id=CukhwVBuro-F3PuSK0t1q4IXLZCpDhtHc5uQVPRpFr4')
        .then(response => response.json())
        .then(json => {
          document.body.style.backgroundImage = `url('${json.urls.regular}')`;
          this.photographer = json.user.name;
          this.photographerUrl = json.user.links.html;
          this.backgroundImage = json.links.html;
        });
  }

  checkImageProperties = (url) => {
    fetch(`https://api.sightengine.com/1.0/properties.json?api_user={1721093431}&api_secret={jVhfhwWGc5PkswXL33vd}&url=${url}`)
      .then(response => response.json())
      .then(json => console.log(json));
  }

  /* ---- Lifecycle Methods ---- */
  componentDidMount() {
    this.loadUserData();
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
    contextValue.loadUserData = this.loadUserData;
    contextValue.getBackgroundImage = this.getBackgroundImage;

    // console.log('context:', this.state);

    let pageNavigation;
    let expandBtn;
    let toggleName;

    if (this.state.hidden === false) {
      toggleName = 'Hide';
    } else {
      toggleName = 'Expand';
    }

    if (this.state.settings.enable_pages === true) {
      pageNavigation = <PageNavigation />
    }
    if (this.state.settings.enable_hiding === true) {
      expandBtn = <button className="secondary small toggle-hide" onClick={this.toggleHidden}>{toggleName}</button>
    }

    return (
      <AppContext.Provider value={contextValue}>
        <main className="page">
          <Link to='/' onClick={this.handleLogoutClick} className="logout-link" title="Logout"><i className="fas fa-sign-out-alt"></i> Log out</Link>
          <div className="unsplash-attribution">
            Photo&nbsp;
            {this.photographer !== '' &&
              <>by <a href={this.photographerUrl} target="_blank" rel="noopener noreferrer">{this.photographer}</a> <br /></>
            }
            on <a href={this.backgroundImage} target="_blank" rel="noopener noreferrer">Unsplash</a>
          </div>
          <div className="wrapper">
            <SearchBar />
            <div className="page-buttons">
              {pageNavigation}
              {expandBtn}
            </div>
            {this.state.pageLoaded &&
              <Bookmarks parent="page-bookmarks" />
            }
            {this.state.pageLoaded && this.state.pages[0].id === this.state.activePage &&
              <p className="intro">Welcome to your new homepage.<br />Start by adding sites here.</p>
            }
          </div>
          <Sidebar />
        </main>
        {this.state.modalShown && <Modal />}
      </AppContext.Provider>
    );
  }

}
