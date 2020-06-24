import React from 'react';
import './page.scss';
import AppContext from '../../appContext';

import SearchBar from './searchBar/searchBar';
import PageNavigation from './pageNavigation/pageNavigation';
import Bookmarks from '../bookmarks/bookmarks';
import Sidebar from '../sidebar/sidebar';

export default class Page extends React.Component {
  static contextType = AppContext;

  render() {
    return (
      <main className="page">
        <div className="wrapper">
          <SearchBar />
          <div className="page-buttons">
            <PageNavigation />
          </div>
          <Bookmarks parent="page-bookmarks" />
        </div>
        <Sidebar />

      </main>
    );
  }

}
