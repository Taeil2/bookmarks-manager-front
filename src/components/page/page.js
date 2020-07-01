import React from 'react';
import { Link } from 'react-router-dom';
import './page.scss';
import AppContext from '../../appContext';
import PagesApiService from '../../services/pages-api-service';
import UsersService from '../../services/users-api-service'

import SearchBar from './searchBar/searchBar';
import PageNavigation from './pageNavigation/pageNavigation';
import Bookmarks from '../bookmarks/bookmarks';
import Sidebar from '../sidebar/sidebar';
import TokenService from '../../services/token-service';


export default class Page extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props)
    this.state = {
      hidden: false
    }
  }

  loadUserData = () => {
    UsersService.getUserById()
      .then((result) => {
        console.log(result);
        this.context.changeSettings({
          initialNote: result.note,
          enable_pages: result.enable_pages,
          enable_folders: result.enable_folders,
          icon_size: result.icon_size,
          icon_shape: result.icon_shape,
          icons_per_row: result.icons_per_row,
          icon_alignment: result.icon_alignment,
          enable_groups: result.enable_groups,
          enable_hiding: result.enable_hiding
        });
      })

    PagesApiService.getPages()
      .then((result) => {
        this.context.changeContext({pages: result})
      })
  }

  handleLogoutClick = () => {
    TokenService.clearAuthToken();
  }

  toggleHidden = () => {
    if (this.state.hidden) {
      this.context.pageMuuri.filter('.draggable');
      this.setState({hidden: false});
    } else {
      this.context.pageMuuri.filter('.hidden-false');
      this.setState({hidden: true});
    }
  }

  componentDidMount() {
    this.loadUserData();
  }

  render() {
    let pageNavigation;
    let expandBtn;
    let toggleName;

    if (this.state.hidden === false) {
      toggleName = 'Expand';
    } else {
      toggleName = 'Collapse';
    }

    if (this.context.settings.enable_pages === true) {
      pageNavigation = <PageNavigation />
    }
    if (this.context.settings.enable_hiding === true) {
      expandBtn = <button className="secondary small toggle-hide" onClick={this.toggleHidden}>{toggleName}</button>
    }

    return (
      <main className="page">
        <Link to='/' onClick={this.handleLogoutClick} >Logout</Link>
        <div className="wrapper">
          <SearchBar />
          <div className="page-buttons">
            {pageNavigation}
            {expandBtn}
          </div>
          <Bookmarks parent="page-bookmarks" />
        </div>
        <Sidebar />
      </main>
    );
  }

}
