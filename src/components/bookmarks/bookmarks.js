import React from 'react';
import './bookmarks.scss';
import Muuri from 'muuri';

import Bookmark from './bookmark/bookmark';

export default class Bookmarks extends React.Component {

  componentDidMount() {
    var grid = new Muuri('.bookmarks', {
      dragEnabled: true
    });

    // document.getElementsByClassName('add')[0].classList.remove('muuri-item');
  }

  render() {
    return (
      <section className="bookmarks">
        <Bookmark />
        <Bookmark />
        <div className="group">
          <Bookmark />
          <Bookmark />
          <Bookmark />
        </div>
        <Bookmark />
        <Bookmark />
        <Bookmark />
        <Bookmark />
        <Bookmark />
        <Bookmark />
        <Bookmark />
        <Bookmark />
        <a href="./add" className="bookmark add">
          <div className="bookmark-image"><i className="fas fa-plus"></i></div>
          <p>Add Bookmark</p>
        </a>
      </section>
    );
  }
}
