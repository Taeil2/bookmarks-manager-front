import React from 'react';
import './sidebar.scss';
import AppContext from '../../appContext';

import SidebarButtons from './sidebarButtons/sidebarButtons';
import Drawer from './drawer/drawer';
import Notes from './notes/notes';
import Settings from './settings/settings';

export default class Sidebar extends React.Component {
  static contextType = AppContext;

  render() {
    let sidebarComponent;
    switch(this.context.sidebarComponent) {
      case 'Drawer':
        sidebarComponent = <Drawer />;
        break;
      case 'Notes':
        sidebarComponent = <Notes />;
        break;
      case 'Settings':
        sidebarComponent = <Settings />;
        break;
      default:
        break;
    }

    return (
      <section className={'sidebar-container show-' + this.context.sidebarShown}>
        <SidebarButtons />
        <div className="sidebar">
          {sidebarComponent}
        </div>
      </section>
    );
  }
}
