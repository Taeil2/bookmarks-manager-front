import React from 'react';
import './bookmarks.scss';
import Muuri from 'muuri';
import AppContext from '../../appContext';

import Bookmark from './bookmark/bookmark';
import Folder from './folder/folder';

export default class Bookmarks extends React.Component {
  static contextType = AppContext;

  componentDidUpdate() {
    console.log('componentdidupdate');

    // Triggering a resize causes Muuri to refresh its layout
    window.dispatchEvent(new Event('resize'));

    // init the muuri
    if (!this.context.pageBookmarksLoaded) {
      if (this.context.pageBookmarks.length > 0) {
        this.initMuuri();
        this.context.changeContext({pageBookmarksLoaded: true})
      }
    }

    // init the muuri
    if (!this.context.drawerBookmarksLoaded) {
      if (this.context.drawerBookmarks.length > 0) {
        this.initMuuri();
        this.context.changeContext({drawerBookmarksLoaded: true})
      }
    }
  }

  initMuuri = () => {
    let muuriClass = `.${this.props.parent}-${this.props.id}`;
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

  handleAddClick = (e) => {
    if (!this.context.dragging) {
      this.context.changeContext({addOrigin: this.context.activePage});
      this.context.showModal('AddForm');
    }
  }

  render() {
    let bookmarks = [];

    if (this.props.parent === 'page-bookmarks') {
      // get bookmarks for the page (not in a folder)
      let screenBookmarks = this.context.pageBookmarks.filter(bookmark => bookmark.folder_name === '');
      screenBookmarks.sort((a, b) => {
        if (a.bookmark_order < b.bookmark_order) { return -1; }
        if (b.bookmark_order > a.bookmark_order) { return 1; }
        return 0;
      })
      for (let i = 0; i < screenBookmarks.length; i++) {
        if (!screenBookmarks[i].is_folder) {
          bookmarks.push(<Bookmark bookmark={screenBookmarks[i]} parent={this.props.parent} number={this.context.activePage} key={i} />);
        } else {
          bookmarks.push(<Folder folder={screenBookmarks[i]} parent={this.props.parent} number={this.context.activePage} key={i} />)
        }
      }

      // get bookmarks for each folder

    }
    if (this.props.parent === 'drawer') {
      // get bookmarks for the page (not in a folder)
      let drawerBookmarks = this.context.drawerBookmarks.filter(bookmark => bookmark.folder_name === '')
      drawerBookmarks.sort((a, b) => {
        if (a.bookmark_order < b.bookmark_order) { return -1; }
        if (b.bookmark_order > a.bookmark_order) { return 1; }
        return 0;
      })
      for (let i = 0; i < drawerBookmarks.length; i++) {
        if (!drawerBookmarks[i].is_folder) {
          bookmarks.push(<Bookmark bookmark={drawerBookmarks[i]} parent={this.props.parent} number={this.context.activePage} key={i} />);
        } else {
          bookmarks.push(<Folder folder={drawerBookmarks[i]} parent={this.props.parent} number={this.context.activePage} key={i} />)
        }
      }

      // get bookmarks for each folder


    }

    return (
      <>
        <section className={'bookmarks ' + this.props.parent + ' ' + this.props.parent + '-' + this.props.id + ' ' + this.context.settings.icon_size + ' ' + this.context.settings.icon_shape + ' per-row-' + this.context.settings.icons_per_row}>
          {bookmarks}
          <button className="bookmark add draggable hidden-false" onClick={(e) => this.handleAddClick(e)}>
            <div className="bookmark-image icon-btn"><i className="fas fa-plus"></i></div>
            <p>Add</p>
          </button>
        </section>
      </>
    );
  }
}
