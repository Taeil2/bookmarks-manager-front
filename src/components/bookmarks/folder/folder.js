import React from 'react';
import './folder.scss';
import AppContext from '../../../appContext';
import BookmarksApiService from '../../../services/bookmarks-api-service';

import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

export default class Folder extends React.Component {
  static contextType = AppContext;

  handleFolderClick = (e) => {
    if (!this.context.dragging) {
      if (this.props.parent === 'page-bookmarks') {
        let folderBookmarks = this.context.pageBookmarks.filter(bookmark => bookmark.folder_name === this.props.folder.name);
        this.context.changeContext({ folderBookmarks: folderBookmarks });
      } else {
        let folderBookmarks = this.context.drawerBookmarks.filter(bookmark => bookmark.folder_name === this.props.folder.name);
        this.context.changeContext({ folderBookmarks: folderBookmarks });
      }
      this.context.showModal('FolderContents');
    }
  }

  handleRename = (e) => {
    this.context.changeContext({editObject: this.props.folder});
    this.context.showModal('EditForm');
  }

  handleMoveToDrawer = (e) => {

  }

  handleMoveToPage = (e) => {

  }

  handleHide = (e) => {
    let folder = this.props.folder;
    BookmarksApiService.editBookmark(folder.id, folder.page_id, folder.name, folder.url, folder.base_url, folder.bookmark_order, folder.folder_name, folder.group_name, !folder.hidden)
      .then(result => {
        this.context.loadUserData();
      });
  }

  handleGroup = (e) => {

  }

  handleRemove = (e) => {
    BookmarksApiService.deleteBookmark(this.props.folder.id)
      .then(result => {
        this.context.loadUserData();
      });
  }

  render() {
    let contextTrigger = null;

    const toggleMenu = e => {
      if(contextTrigger) {
        contextTrigger.handleContextClick(e);
      }
    }

    let hideOption;
    let groupOption;
    if (this.context.settings.enable_hiding === true) {
      hideOption = <MenuItem data={{foo: 'bar'}} onClick={this.handleHide} className="hide-btn">Hide</MenuItem>;
    }
    if (this.context.settings.enable_groups === true) {
      groupOption = <MenuItem data={{foo: 'bar'}} onClick={this.handleGroup} classNAme="group-btn">Group</MenuItem>
    }

    return (
      <>
        <div className={'draggable hidden-' + this.props.folder.hidden}>
          <ContextMenuTrigger id={'folder-' + this.props.folder.id} ref={(c) => contextTrigger = c}>
            <div className="bookmark folder"  onClick={(e) => this.handleFolderClick(e) }>
              <div className="bookmark-image">
                <div className="placeholder"></div>
              </div>
              <p>{this.props.folder.name}</p>
              <div className="context-menu-icon" onClick={toggleMenu}><i className="fas fa-ellipsis-v"></i></div>
            </div>
          </ContextMenuTrigger>
        </div>
        <ContextMenu id={'folder-' + this.props.folder.id}>
          <MenuItem data={{foo: 'bar'}} onClick={this.handleRename}>Rename</MenuItem>
          <MenuItem data={{foo: 'bar'}} onClick={this.handleMove}>Move</MenuItem>
          {hideOption}
          {groupOption}
          <MenuItem data={{foo: 'bar'}} onClick={this.handleRemove}>Remove</MenuItem>
        </ContextMenu>
      </>
    );
  }
}
