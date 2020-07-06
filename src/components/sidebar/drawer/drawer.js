import React from 'react';
import './drawer.scss';
import AppContext from '../../../appContext';

import Bookmarks from '../../bookmarks/bookmarks';

export default class Drawer extends React.Component {
  static contextType = AppContext;

  handleClick() {
    let drawer = this.context.pages.filter((page) => page.is_drawer === true)[0];
    this.context.changeContext({addOrigin: drawer.id});
    this.context.showModal('AddForm');
  }

  render() {
    let id = null;
    let drawer = this.context.pages.filter((page) => page.is_drawer === true)[0];
    if (drawer) {
      id = drawer.id;
    }

    return (
      <>
        <header>
          <h2><i className="fas fa-th-large"></i> Drawer</h2>
          <button className="icon-btn drawer-add" onClick={(e) => this.handleClick()}><i className="fas fa-plus"></i> Add</button>
          <button className="close-sidebar icon-btn" onClick={(e) => this.context.closeSidebar(e)}><i className="fas fa-times"></i></button>
        </header>
        <Bookmarks parent="drawer" />
      </>
    );
  }
}
