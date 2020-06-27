import React from 'react';
import './sidebarButtons.scss';
import AppContext from '../../../appContext';

export default class SidebarButtons extends React.Component {
  static contextType = AppContext;

  render() {
    return (
      <div className="buttons-container">
        <button className="icon-btn" onClick={(e) => this.context.showSidebar('Drawer')}><i className="fas fa-th-large"></i></button>
        <button className="icon-btn" onClick={(e) => this.context.showSidebar('Notes')}><i className="fas fa-book"></i></button>
        {/* Notes alternative -  fa-file-alt */}
        <button className="icon-btn" onClick={(e) => this.context.showSidebar('Settings')}><i className="fas fa-cog"></i></button>
      </div>
    );
  }
}
