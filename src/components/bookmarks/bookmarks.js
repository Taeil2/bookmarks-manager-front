import React from 'react';
import './bookmarks.scss';
import AppContext from '../../appContext';
import {MuuriComponent} from 'muuri-react';

import Bookmark from './bookmark/bookmark';
import Folder from './folder/folder';

export default class Bookmarks extends React.Component {
  static contextType = AppContext;

  constructor(props){
    super(props);
    this.muuriOptions = {
      dragEnabled: true,
      dragStartPredicate: {
        distance: 10,
        delay: 0
      }
      // dragStartPredicate: function(item, e) {
      //   if (item._element.classList.contains('draggable')) {
      //     return true;
      //   }
      // },
      // dragContainer: document.body,
    }
  }

  componentDidUpdate() {
    // Triggering a resize causes Muuri to refresh its layout
    window.dispatchEvent(new Event('resize'));
  }

  handleAddClick = (e) => {
    if (!this.context.dragging) {
      this.context.changeContext({addOrigin: this.context.activePage});
      this.context.showModal('AddForm');
    }
  }

  render() {
    let bookmarks = [];

    // hidden filters
    if (this.context.hidden) {
      this.muuriOptions.filter = function(a, b) {
        return b.getElement().classList.contains('hidden-false');
      };
    } else {
      this.muuriOptions.filter = function(a, b) {
        return b.getElement().classList.contains('muuri-item');
      };
    }

    // get the right bookmarks for the right parent
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
          bookmarks.push(<Bookmark bookmark={screenBookmarks[i]} parent={this.props.parent} key={i} />);
        } else {
          bookmarks.push(<Folder folder={screenBookmarks[i]} parent={this.props.parent} key={i} />)
        }
      }
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
    }
    if (this.props.parent === 'folder-contents') {
      // get bookmarks for the page (not in a folder)
      let folderBookmarks = this.context.folderBookmarks;
      folderBookmarks.sort((a, b) => {
        if (a.bookmark_order < b.bookmark_order) { return -1; }
        if (b.bookmark_order > a.bookmark_order) { return 1; }
        return 0;
      })
      for (let i = 0; i < folderBookmarks.length; i++) {
        // everything in a folder is a bookmark (no folders allowed)
        bookmarks.push(<Bookmark bookmark={folderBookmarks[i]} parent={this.props.parent} number={this.context.activePage} key={i} />);
      }
    }

    return (
      <>
        <section className={'bookmarks ' + this.props.parent + ' ' + this.context.settings.icon_size + ' ' + this.context.settings.icon_shape + ' per-row-' + this.context.settings.icons_per_row + ' qty-' + bookmarks.length + ' important'}>
          <MuuriComponent {...this.muuriOptions}>
            {bookmarks}
            <button className="bookmark add hidden-false" onClick={(e) => this.handleAddClick(e)}>
              <div className="bookmark-image icon-btn"><i className="fas fa-plus"></i></div>
              <p>Add</p>
            </button>
          </MuuriComponent>
        </section>
      </>
    );
  }
}
