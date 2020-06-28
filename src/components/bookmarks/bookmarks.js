import React from 'react';
import './bookmarks.scss';
import Muuri from 'muuri';
import AppContext from '../../appContext';

import Bookmark from './bookmark/bookmark';
import Folder from './folder/folder';

export default class Bookmarks extends React.Component {
  static contextType = AppContext;

  componentDidMount() {
    let parentName = this.props.parent;
    let muuriClass = '.' + parentName;
    let muuriGrids = {};

    muuriGrids[parentName] = new Muuri(muuriClass, {
      items: '.draggable',
      dragEnabled: true,
      dragStartPredicate: {
        distance: 10,
        delay: 0
      },
      /*
      dragSort: function() {
        return [muuriGrids['page-bookmarks'], muuriGrids['drawer']]
      }
      */
    });

    muuriGrids[parentName].on('dragReleaseEnd', (item, event) => {
      console.log('dragReleaseEnd');
      console.log(item);
      console.log(event);
    });
  }

  render() {
    let bookmarks = [];
    for (let i = 0; i < 16; i++) {
      bookmarks.push(<Bookmark key={i} parent={this.props.parent} number={i} />);
    }

    return (
      <>
        <section className={'bookmarks ' + this.props.parent + ' ' + this.context.settings.icon_size + ' ' + this.context.settings.icon_shape + ' per-row-' + this.context.settings.per_row}>
          {/* <div className="group">
            <Bookmark />
            <Bookmark />
            <Bookmark />
          </div> */}
          {bookmarks}
          <Folder parent={this.props.parent} number={1} />
          <button className="bookmark add draggable" onClick={(e) => this.context.showModal('AddForm')}>
            <div className="bookmark-image icon-btn"><i className="fas fa-plus"></i></div>
            <p>Add Bookmark</p>
          </button>
        </section>
      </>
    );
  }
}
