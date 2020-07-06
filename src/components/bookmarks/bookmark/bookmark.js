import React from 'react';
import './bookmark.scss';
import AppContext from '../../../appContext';
import BookmarksApiService from '../../../services/bookmarks-api-service';
import BookmarkImagesApiService from '../../../services/bookmark-images-api-service';

import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

export default class Bookmark extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {
      faviconUrl: ''
    }
  }

  handleBookmarkClick = (e) => {
    let muuriDiv = e.target.closest('.muuri-item');
    if (muuriDiv.classList.contains('muuri-item-releasing')) { // do nothing if dragging and releasing
      // do nothing
    } else { // go to link if clicking without dragging
      let href = muuriDiv.querySelector('.bookmark').getAttribute('href');
      window.location.href = href;
    }
  }

  handleEdit = (e) => {
    this.context.changeContext({editObject: this.props.bookmark});
    this.context.showModal('EditForm');
  }

  handleMoveToDrawer = (e) => {
    // create bookmark in drawer
    let bookmarkOrder;
    let drawerId;
    let drawerBookmarks = this.context.drawerBookmarks.filter(bookmark => bookmark.folder_name === '');
    bookmarkOrder = drawerBookmarks.length + 1;

    drawerId = this.context.pages.filter(page => page.is_drawer)[0].id;

    BookmarksApiService.addBookmark(drawerId, this.props.bookmark.name, this.props.bookmark.url, this.props.bookmark.base_url, bookmarkOrder)
      .then(result => {
        this.handleRemove() // remove this bookmark
        this.context.loadUserData();
      });
  }

  handleMoveToPage = (origin) => {
    // if on the page
    if (origin === 'page') {
      if (this.context.pages.length === 3) { // if there is only one page, move to that page (1 page is this page, 1 page is the drawer, 3rd page is the only page it can be moved to)
        let bookmarkOrder;
        let pageId;
        let pageBookmarks = this.context.pageBookmarks.filter(bookmark => bookmark.folder_name === '');
        bookmarkOrder = pageBookmarks.length + 1;

        pageId = this.context.activePage;

        BookmarksApiService.addBookmark(pageId, this.props.bookmark.name, this.props.bookmark.url, this.props.bookmark.base_url, bookmarkOrder)
          .then(result => {
            this.handleRemove() // remove this bookmark
            this.context.loadUserData();
          });
      } else { // if there is more than one page, select the page

      }
    }

    // if on the drawer
    if (origin === 'drawer') {
      if (this.context.pages.length === 2 || !this.context.settings.enable_pages) { // if there is only one page, move to that page (1 page is the drawer, 1 page is the only page it can be moved to)
        let bookmarkOrder;
        let pageId;
        let pageBookmarks = this.context.pageBookmarks.filter(bookmark => bookmark.folder_name === '');
        bookmarkOrder = pageBookmarks.length + 1;

        pageId = this.context.activePage;

        BookmarksApiService.addBookmark(pageId, this.props.bookmark.name, this.props.bookmark.url, this.props.bookmark.base_url, bookmarkOrder)
          .then(result => {
            this.handleRemove() // remove this bookmark
            this.context.loadUserData();
          });
      } else { // if there are multiple pages, select the page

      }
    }
  }

  handleMoveToFolder = (origin) => {
    // for page
    if (origin === 'page' && this.context.pageBookmarks.filter(bookmark => bookmark.is_folder).length === 1) { // if there is one folder, move it to that folder
      // find the folder, get the order within the folder, add the bookmark, remove this bookmark
      let folder = this.context.pageBookmarks.filter(bookmark => bookmark.is_folder)[0];
      let bookmarksInFolder = this.context.pageBookmarks.filter(bookmark => bookmark.folder_name === folder.name);
      let bookmarkOrder = bookmarksInFolder.length + 1;

      BookmarksApiService.addBookmark(this.props.bookmark.page_id, this.props.bookmark.name, this.props.bookmark.url, this.props.bookmark.base_url, bookmarkOrder, folder.name)
      .then(result => {
        this.handleRemove() // remove this bookmark
        this.context.loadUserData();
      });
    } else { // show a list of folders

    }

    // for drawer
    if (origin === 'drawer' && this.context.drawerBookmarks.filter(bookmark => bookmark.is_folder).length === 1) { // if there is one folder, move it to that folder
      // find the folder, get the order within the folder, add the bookmark, remove this bookmark
      let folder = this.context.drawerBookmarks.filter(bookmark => bookmark.is_folder)[0];
      let bookmarksInFolder = this.context.drawerBookmarks.filter(bookmark => bookmark.folder_name === folder.name);
      let bookmarkOrder = bookmarksInFolder.length + 1;

      BookmarksApiService.addBookmark(this.props.bookmark.page_id, this.props.bookmark.name, this.props.bookmark.url, this.props.bookmark.base_url, bookmarkOrder, folder.name)
      .then(result => {
        this.handleRemove() // remove this bookmark
        this.context.loadUserData();
      });
    } else { // show a list of folders

    }
  }

  handleMoveOutOfFolder = (origin) => {
    let bookmarkOrder;
    let pageId;
    let bookmarks;

    if (origin === 'page'){ // if it's a folder on the page, move it to the page
      bookmarks = this.context.pageBookmarks.filter(bookmark => bookmark.folder_name === '');
      pageId = this.context.activePage;
    } else { // if it's a folder on the drawer, move it to the drawer
      bookmarks = this.context.drawerBookmarks.filter(bookmark => bookmark.folder_name === '');
      pageId = this.context.pages.filter(page => page.is_drawer)[0].id;
    }
    bookmarkOrder = bookmarks.length + 1;

    BookmarksApiService.addBookmark(pageId, this.props.bookmark.name, this.props.bookmark.url, this.props.bookmark.base_url, bookmarkOrder)
      .then(result => {
        // remove this bookmark
        this.handleRemove()
        // remove bookmark from folder context
        let newFolderBookmarks = this.context.folderBookmarks;
        newFolderBookmarks.filter(bookmark => bookmark.id !== this.props.bookmark.id);
        this.context.changeContext({
          folderBookmarks: newFolderBookmarks
        });
        // refresh data
        this.context.loadUserData();
      });
  }

  handleHide = (e) => {
    let bookmark = this.props.bookmark;
    BookmarksApiService.editBookmark(bookmark.id, bookmark.page_id, bookmark.name, bookmark.url, bookmark.base_url, bookmark.bookmark_order, bookmark.folder_name, bookmark.group_name, !bookmark.hidden)
      .then(result => {
        this.context.loadUserData();
      });
  }

  handleGroup = (e) => {
    // not implemented
  }

  handleRemove = (e) => {
    BookmarksApiService.deleteBookmark(this.props.bookmark.id)
      .then(result => {
        this.context.loadUserData();
      });
  }

  findAndSetFavicon = () => {
    BookmarkImagesApiService.getBookmarkImagesByUrl(this.props.bookmark.base_url)
      .then(result => {
        if (result.length) {
          // get images under a certain size
          let favicons = result.filter((image) => image.bytes < 500000)
          // get largest image under that size
          if (favicons.length) {
            const favicon = favicons.reduce(function(prev, current) {
              return (prev.width > current.width) ? prev : current
              }) //returns object
              this.setState({faviconUrl: favicon.image_url});
          }
        }
      })
  }

  componentDidMount() {
    this.findAndSetFavicon();
  }

  componentDidUpdate() {
    // this.findAndSetFavicon();
  }

  render() {
    console.log(this.props.bookmark);

    let contextTrigger = null;

    const toggleMenu = e => {
      if(contextTrigger) {
        contextTrigger.handleContextClick(e);
      }
    }

    let moveToDrawerOption;
    let moveToPageOption;
    let moveToFolderOption;
    let moveOutOfFolderOption;
    let hideOption;
    let groupOption;
    // any page bookmark can be moved to the drawer
    if (this.props.parent === 'page-bookmarks') {
      moveToDrawerOption = <MenuItem onClick={this.handleMoveToDrawer}>Move to drawer</MenuItem>;
    }
    // any drawer bookmark can be moved to the page
    if (this.props.parent === 'drawer') {
      moveToPageOption = <MenuItem onClick={(e) => this.handleMoveToPage('drawer')}>Move to page</MenuItem>;
    }
    // any page bookmark can be moved to another page (or itself if its in a folder)
    if (this.props.parent === 'page-bookmarks' && this.context.settings.enable_pages && this.context.pages.length > 2) {
      moveToPageOption = <MenuItem onClick={(e) => this.handleMoveToPage('page')}>Move to page</MenuItem>;
    }
    // if the page or drawer has a folder and it's already not in a folder, it can be moved into a folder
    if (this.props.bookmark.folder_name === '') {
      if (this.props.parent === 'page-bookmarks' && this.context.pageBookmarks.filter(bookmark => bookmark.is_folder).length) {
        moveToFolderOption = <MenuItem onClick={(e) => this.handleMoveToFolder('page')}>Move to folder</MenuItem>;
      }
      if (this.props.parent === 'drawer' && this.context.drawerBookmarks.filter(bookmark => bookmark.is_folder).length) {
        moveToFolderOption = <MenuItem onClick={(e) => this.handleMoveToFolder('drawer')}>Move to folder</MenuItem>;
      }
    } else { // if the bookmark is in a folder, it can be moved out of the folder
      moveOutOfFolderOption = <MenuItem onClick={(e) => this.handleMoveOutOfFolder('page')}>Move out of folder</MenuItem>;
    }

    if (this.context.settings.enable_hiding === true) {
      if (!this.props.bookmark.hidden) {
        hideOption = <MenuItem onClick={this.handleHide} className="hide-btn">Hide</MenuItem>;
      } else {
        hideOption = <MenuItem onClick={this.handleHide} className="hide-btn">Unhide</MenuItem>;
      }

    }
    if (this.context.settings.enable_groups === true) {
      groupOption = <MenuItem onClick={this.handleGroup} classNAme="group-btn">Group</MenuItem>
    }

    let faviconHtml;
    if (this.state.faviconUrl !== '') {
      faviconHtml = <img src={this.state.faviconUrl} alt={this.props.bookmark.name}></img>;
    } else {
    faviconHtml = <div className="placeholder"><span>{this.props.bookmark.name[0] + this.props.bookmark.name[1]}</span></div>;
    }

    return (
      <>
        <div className={'draggable hidden-' + this.props.bookmark.hidden}>
          <ContextMenuTrigger id={'item-' + this.props.bookmark.id} ref={(c) => contextTrigger = c}>
            <div className="bookmark" onClick={(e) => this.handleBookmarkClick(e) } href={this.props.bookmark.url}>
              <div className="bookmark-image">
                {faviconHtml}
              </div>
              <p>{this.props.bookmark.name}</p>
              <div className="context-menu-icon" onClick={toggleMenu}><i className="fas fa-ellipsis-v"></i></div>
            </div>
          </ContextMenuTrigger>
        </div>
        <ContextMenu id={'item-' + this.props.bookmark.id}>
          <MenuItem onClick={this.handleEdit}>Edit</MenuItem>
          {moveToPageOption}
          {moveToDrawerOption}
          {moveToFolderOption}
          {moveOutOfFolderOption}
          {hideOption}
          {groupOption}
          <MenuItem onClick={this.handleRemove}>Remove</MenuItem>
        </ContextMenu>
      </>
    );
  }
}
