import React from 'react';
import './page.scss';

import SearchBar from './searchBar/searchBar';
import PageNavigation from './pageNavigation/pageNavigation';
import Bookmarks from '../bookmarks/bookmarks';

function Page() {
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

export default Page;
