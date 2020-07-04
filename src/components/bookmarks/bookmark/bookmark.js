import React from 'react';
import './bookmark.scss';
import AppContext from '../../../appContext';

import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

export default class Bookmark extends React.Component {
  static contextType = AppContext;

  handleBookmarkClick = (e) => {
    if (!this.context.dragging) {
      let bookmarkDiv;
      if (e.target.classList.contains('bookmark')) {
        bookmarkDiv = e.target;
      } else {
        bookmarkDiv = e.target.closest('.bookmark');
      }
      let href = bookmarkDiv.getAttribute('href');
      window.location.href = href;
    }
  }

  handleEdit = (e) => {
    this.context.changeContext({editObject: this.props.bookmark});
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

    // console.log('bookmark props', this.props);

    return (
      <>
        <div className={'draggable hidden-' + this.props.bookmark.hidden}>
          <ContextMenuTrigger id={'item-' + this.props.bookmark.id} ref={(c) => contextTrigger = c}>
            <div className="bookmark" onClick={(e) => this.handleBookmarkClick(e) } href={this.props.bookmark.url}>
              <div className="bookmark-image">
                <img src="https://www.google.com/images/branding/product_ios/3x/gsa_ios_60dp.png" alt="Google"></img>
              </div>
              <p>{this.props.bookmark.name}</p>
              <div className="context-menu-icon" onClick={toggleMenu}><i className="fas fa-ellipsis-v"></i></div>
            </div>
          </ContextMenuTrigger>
        </div>
        <ContextMenu id={'item-' + this.props.bookmark.id}>
          <MenuItem data={{foo: 'bar'}} onClick={this.handleEdit}>Edit</MenuItem>
          <MenuItem data={{foo: 'bar'}} onClick={this.handleMove}>Move</MenuItem>
          {hideOption}
          {groupOption}
          <MenuItem data={{foo: 'bar'}} onClick={this.handleRemove}>Remove</MenuItem>
        </ContextMenu>
      </>
    );
  }
}
