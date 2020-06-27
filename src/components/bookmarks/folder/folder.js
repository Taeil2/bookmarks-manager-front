import React from 'react';
import './folder.scss';

import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

export default class Folder extends React.Component {
  constructor(props) {
    super(props);
  }

  handleBookmarkClick = (e) => {
    console.log('clicked');
    console.log(e.target.classList);
    this.context.showModal('FolderContents')
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
      <div className="draggable">
        <ContextMenuTrigger id={this.props.parent + '-' + this.props.number} ref={(c) => contextTrigger = c}>
          <div className="bookmark folder" onClick={(e) => this.handleFolderClick(e) }>
            <div className="bookmark-image">
              {/* <img src="https://www.google.com/images/branding/product_ios/3x/gsa_ios_60dp.png"></img> */}
            </div>
            <p>Folder</p>
            <div className="context-menu-icon" onClick={toggleMenu}><i className="fas fa-ellipsis-v"></i></div>
            <ContextMenu id={this.props.parent + '-' + this.props.number}>
              <MenuItem data={{foo: 'bar'}} onClick={this.handleMenuClick}>
                Edit
              </MenuItem>
              <MenuItem data={{foo: 'bar'}} onClick={this.handleMenuClick}>
                Move
              </MenuItem>
              <MenuItem data={{foo: 'bar'}} onClick={this.handleMenuClick}>
                Remove
              </MenuItem>
            </ContextMenu>
          </div>
        </ContextMenuTrigger>
      </div>
    );
  }
}
