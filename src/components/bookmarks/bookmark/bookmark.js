import React from 'react';
import './bookmark.scss';
import AppContext from '../../../appContext';

import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

export default class Bookmark extends React.Component {
  static contextType = AppContext;

  handleBookmarkClick = (e) => {
    if (!this.context.dragging) {
      console.log('show bookmark');
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

    let hideOption;
    let groupOption;
    if (this.context.settings.enable_hiding === true) {
      hideOption = <MenuItem data={{foo: 'bar'}} onClick={this.handleMenuClick} className="hide-btn">Hide</MenuItem>;
    }
    if (this.context.settings.enable_groups === true) {
      groupOption = <MenuItem data={{foo: 'bar'}} onClick={this.handleMenuClick} classNAme="group-btn">Group</MenuItem>
    }

    return (
      <>
        <div className="draggable">
          <ContextMenuTrigger id={this.props.parent + '-' + this.props.number} ref={(c) => contextTrigger = c}>
            <div className="bookmark" onClick={(e) => this.handleBookmarkClick(e) }>
              <div className="bookmark-image">
                <img src="https://www.google.com/images/branding/product_ios/3x/gsa_ios_60dp.png" alt="Google"></img>
              </div>
              <p>Bookmark testing long name</p>
              <div className="context-menu-icon" onClick={toggleMenu}><i className="fas fa-ellipsis-v"></i></div>
            </div>
          </ContextMenuTrigger>
        </div>
        <ContextMenu id={this.props.parent + '-' + this.props.number}>
          <MenuItem data={{foo: 'bar'}} onClick={this.handleMenuClick}>Edit</MenuItem>
          <MenuItem data={{foo: 'bar'}} onClick={this.handleMenuClick}>Move</MenuItem>
          {hideOption}
          {groupOption}
          <MenuItem data={{foo: 'bar'}} onClick={this.handleMenuClick}>Remove</MenuItem>
        </ContextMenu>
      </>
    );
  }
}
