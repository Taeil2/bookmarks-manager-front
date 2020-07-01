import React from 'react';
import './folder.scss';
import AppContext from '../../../appContext';

import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

export default class Folder extends React.Component {
  static contextType = AppContext;

  handleFolderClick = (e) => {
    if (!this.context.dragging) {
      this.context.showModal('FolderContents')
    }
  }

  handleMenuClick(e, data) {
    console.log(data.foo);
  }

  render() {
    let contextTrigger = null;

    const toggleMenu = e => {
      if(contextTrigger) {
        contextTrigger.handleContextClick(e);
      }
    }

    return (
      <>
        <div className="draggable hidden-false">
          <ContextMenuTrigger id={'folder-' + this.props.parent + '-' + this.props.number} ref={(c) => contextTrigger = c}>
            <div className="bookmark folder"  onClick={(e) => this.handleFolderClick(e) }>
              <div className="bookmark-image">
                {/* <img src="https://www.google.com/images/branding/product_ios/3x/gsa_ios_60dp.png"></img> */}
              </div>
              <p>Folder</p>
              <div className="context-menu-icon" onClick={toggleMenu}><i className="fas fa-ellipsis-v"></i></div>
            </div>
          </ContextMenuTrigger>
        </div>
        <ContextMenu id={'folder-' + this.props.parent + '-' + this.props.number}>
          <MenuItem data={{foo: 'bar'}} onClick={this.handleMenuClick}>Rename</MenuItem>
          <MenuItem data={{foo: 'bar'}} onClick={this.handleMenuClick}>Move</MenuItem>
          {/* <MenuItem data={{foo: 'bar'}} onClick={this.handleMenuClick}>Hide</MenuItem> */}
          <MenuItem data={{foo: 'bar'}} onClick={this.handleMenuClick}>Remove</MenuItem>
        </ContextMenu>
      </>
    );
  }
}
