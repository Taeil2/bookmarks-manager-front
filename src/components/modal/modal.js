import React from 'react';
import './modal.scss';
import AppContext from '../../appContext';

import AddForm from './addForm/addForm';
import EditForm from './editForm/editForm';
import MoveForm from './moveForm/moveForm';
import FolderContents from './folderContents/folderContents';

export default class Modal extends React.Component {
  static contextType = AppContext;

  handleClick = (e) => {
    if (e.target.classList.contains('modal-container')) {
      this.context.closeModal();
    }
  }

  render() {
    let modalComponent;
    switch(this.context.modalComponent) {
      case 'AddForm':
        modalComponent = <AddForm />;
        break;
      case 'EditForm':
        modalComponent = <EditForm />;
        break;
      case 'MoveForm':
        modalComponent = <MoveForm />;
        break;
      case 'FolderContents':
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
