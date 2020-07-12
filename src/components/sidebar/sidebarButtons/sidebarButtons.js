import React from 'react';
import './sidebarButtons.scss';
import AppContext from '../../../appContext';

export default class SidebarButtons extends React.Component {
  static contextType = AppContext;

  setActive = (e) => {
    e.preventDefault();
    let sidebarButtons = document.querySelectorAll('.buttons-container .icon-btn');
    sidebarButtons.forEach(sidebarButton => {
      sidebarButton.classList.remove('active');
    });
    e.currentTarget.classList.add('active');
  }

  render() {
    return (
      <div className="buttons-container">
        <button className="icon-btn bookmarks-btn active" id="bookmarks-btn" onClick={(e) => { this.context.closeSidebar(e); this.setActive(e); }}><i className="fas fa-bookmark"></i></button>
        <button className="icon-btn" onClick={(e) => { this.context.showSidebar('Drawer'); this.setActive(e); }}><i className="fas fa-th-large"></i></button>
        <button className="icon-btn" onClick={(e) => { this.context.showSidebar('Notes'); this.setActive(e); }}><i className="fas fa-book"></i></button>
        {/* Notes alternative -  fa-file-alt */}
        <button className="icon-btn" onClick={(e) => { this.context.showSidebar('Settings'); this.setActive(e); }}><i className="fas fa-cog"></i></button>
      </div>
    );
  }
}
