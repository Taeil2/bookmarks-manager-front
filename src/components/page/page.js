import React from 'react';
import './page.scss';
import BookmarksContext from '../../context';

import SearchBar from './searchBar/searchBar';
import PageNavigation from './pageNavigation/pageNavigation';
import Bookmarks from '../bookmarks/bookmarks';

export default class Page extends React.Component {

  static contextType = BookmarksContext;

  render() {
    console.log(this.context);

    return (
      <main className="page">
        <div className="wrapper">
          <SearchBar />
          <div className="page-buttons">
            <PageNavigation />
          </div>
          <Bookmarks />
        </div>
      </main>
    );
  }

}
