import React from 'react';
import './sidebar.scss';

import SidebarButtons from './sidebarButtons/sidebarButtons';
import Drawer from './drawer/drawer';
import Notes from './notes/notes';
import Settings from './settings/settings';

export default function Sidebar() {
  return (
    <section className="sidebar-container">
      <SidebarButtons />
      <div className="sidebar">

      </div>
    </section>
  );
}
