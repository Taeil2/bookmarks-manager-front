import React from 'react';
import './modal.scss';
import AppContext from '../../appContext';
import AddForm from './addForm/addForm';

export default class Modal extends React.Component {
  static contextType = AppContext;

  render() {
    let modalComponent;
    switch(this.context.modalComponent) {
      case 'AddForm':
        modalComponent = <AddForm />;
        break;
      default:
        break;
    }

    return (
      <div className="modal-container">
        <div className="modal">
          {modalComponent}
        </div>
      </div>
    );
  }
}
