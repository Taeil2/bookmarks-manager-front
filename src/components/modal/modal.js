import React from 'react';
import './modal.scss';

import AddForm from './addForm/addForm';

export default class Modal extends React.Component {

  render() {
    return (
      <div className="modal">
        <AddForm />
      </div>
    );
  }
}
