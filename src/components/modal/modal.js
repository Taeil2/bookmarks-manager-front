import React from 'react';
import './modal.scss';
import AppContext from '../../appContext';

import AddForm from './addForm/addForm';
import FolderContents from './folderContents/folderContents';

export default class Modal extends React.Component {
  static contextType = AppContext;

  handleClick = (e) => {
    if (e.target.classList.contains('modal-container')) {
      this.context.closeModal(e);
    }
  }

  render() {
    let modalComponent;
    switch(this.context.modalComponent) {
      case 'AddForm':
        modalComponent = <AddForm />;
        break;
      case 'AddForm':
        modalComponent = <FolderContents />;
        break;
      default:
        break;
    }

    return (
      <div className="modal-container" onClick={(e) => this.handleClick(e)}>
        <div className="modal">
          {modalComponent}
        </div>
      </div>
    );
  }
}
