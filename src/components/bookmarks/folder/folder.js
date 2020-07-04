import React from 'react';
import './folder.scss';
import AppContext from '../../../appContext';

import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

export default class Folder extends React.Component {
  static contextType = AppContext;

  handleFolderClick = (e) => {
    if (!this.context.dragging) {
      this.context.showModal('FolderContents');
    }
  }

  handleRename = (e) => {
    this.context.changeContext({editObject: this.props.folder});
    this.context.showModal('EditForm');
  }

  handleMove = (e) => {

  }

  handleHide = (e) => {

  }

  handleGroup = (e) => {

  }

  handleRemove = (e) => {

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
        <div className="draggable hidden-false">
          <ContextMenuTrigger id={'folder-' + this.props.folder.id} ref={(c) => contextTrigger = c}>
            <div className="bookmark folder"  onClick={(e) => this.handleFolderClick(e) }>
              <div className="bookmark-image">
                {/* <img src="https://www.google.com/images/branding/product_ios/3x/gsa_ios_60dp.png"></img> */}
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
