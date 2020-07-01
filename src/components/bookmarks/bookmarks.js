import React from 'react';
import './bookmarks.scss';
import Muuri from 'muuri';
import AppContext from '../../appContext';

import Bookmark from './bookmark/bookmark';
import Folder from './folder/folder';

export default class Bookmarks extends React.Component {
  static contextType = AppContext;

  componentDidMount() {
    let muuriClass = '.' + this.props.parent;
    let newMuuri = new Muuri(muuriClass, {
      items: '.draggable',
      dragEnabled: true,
      dragStartPredicate: {
        distance: 10,
        delay: 0
      },
      layout: {
        // alignRight: true
      },
      dragSort: this.getAllGrids,
    });

    // Set drag start and end events to disable other click events while dragging
    newMuuri.on('dragInit', (item, event) => {
      this.context.changeContext({dragging: true});
    });

    newMuuri.on('dragReleaseEnd', (item, event) => {
      this.context.changeContext({dragging: false});
    });

    if (this.props.parent === 'page-bookmarks') {
      this.context.changeContext({pageMuuri: newMuuri});
    }
    if (this.props.parent === 'drawer') {
      this.context.setDrawerMuuri(newMuuri);
      // not sure why this is breaking
      // this.context.changeContext({drawerMuuri: newMuuri});
    }
  }

  getAllGrids = () => {
    return [this.context.drawerMuuri, this.context.pageMuuri];
  }

  componentDidUpdate() {
    // Triggering a resize causes Muuri to refresh its layout
    window.dispatchEvent(new Event('resize'));
  }

  handleAddClick = (e) => {
    if (!this.context.dragging) {
      this.context.showModal('AddForm');
    }
  }

  render() {
    let bookmarks = [];
    for (let i = 0; i < 16; i++) {
      bookmarks.push(<Bookmark key={i} parent={this.props.parent} number={i} />);
    }

    return (
      <>
        <section className={'bookmarks ' + this.props.parent + ' ' + this.context.settings.icon_size + ' ' + this.context.settings.icon_shape + ' per-row-' + this.context.settings.icons_per_row}>
          {/* <div className="group">
            <Bookmark />
            <Bookmark />
            <Bookmark />
          </div> */}
          {bookmarks}
          <Folder parent={this.props.parent} number={1} />
          <button className="bookmark add draggable hidden-false" onClick={(e) => this.handleAddClick(e)}>
            <div className="bookmark-image icon-btn"><i className="fas fa-plus"></i></div>
            <p>Add</p>
          </button>
        </section>
      </>
    );
  }
}
