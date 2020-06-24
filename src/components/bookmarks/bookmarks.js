import React from 'react';
import './bookmarks.scss';
import Muuri from 'muuri';
import AppContext from '../../appContext';

import Bookmark from './bookmark/bookmark';

export default class Bookmarks extends React.Component {
  constructor(props) {
    super(props);
  }

  static contextType = AppContext;

  componentDidMount() {
    let parentName = this.props.parent;
    let muuriClass = '.' + parentName;
    let muuriGrids = {};

    muuriGrids[parentName] = new Muuri(muuriClass, {
      dragEnabled: true,
      dragContainer: document.body,
      dragSort: function() {
        return [muuriGrids['page-bookmarks'], muuriGrids['drawer']]
      }
    });
  }

  render() {
    return (
      <section className={'bookmarks ' + this.props.parent}>
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
        <button className="bookmark add" onClick={(e) => this.context.showModal('AddForm')}>
          <div className="bookmark-image icon-btn"><i className="fas fa-plus"></i></div>
          <p>Add Bookmark</p>
        </button>
      </section>
    );
  }
}
