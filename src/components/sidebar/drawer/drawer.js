import React from 'react';
import './drawer.scss';
import AppContext from '../../../appContext';

import Bookmarks from '../../bookmarks/bookmarks';

export default class Drawer extends React.Component {
  static contextType = AppContext;

  render() {
    return (
      <>
        <header>
          <h2><i className="fas fa-th-large"></i> Drawer</h2>
          <button className="icon-btn drawer-add" onClick={(e) => this.context.showModal('AddForm')}><i className="fas fa-plus"></i></button>
          <button className="close-sidebar icon-btn" onClick={(e) => this.context.closeSidebar(e)}><i className="fas fa-times"></i></button>
        </header>
        <Bookmarks parent="drawer" />
      </>
    );
  }
}
