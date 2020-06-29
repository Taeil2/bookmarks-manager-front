import React from 'react';
import './folderContents.scss';
import AppContext from '../../../appContext';

import Bookmarks from '../../bookmarks/bookmarks';

export default class FolderContents extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      url: ''
    }
  }

  render() {
    return (
      <div className="folder-contents-container">
        <Bookmarks parent="folder-contents" />
        <button className="close-modal icon-btn" onClick={(e) => this.context.closeModal(e)}><i className="fas fa-times"></i></button>
      </div>
    );
  }
}
