import React from 'react';
import './drawer.scss';

import Bookmarks from '../../bookmarks/bookmarks';

export default function Drawer() {
  return (
    <>
      <h2><i className="fas fa-th-large"></i> Drawer</h2>
      <Bookmarks parent="drawer" />
    </>
  );
}
