import React from 'react';
import './addForm.scss';

export default class AddForm extends React.Component {

  render() {
    return (
      <form>
        <h2>Add site</h2>
        <label>Name</label>
        <input type="text" />
        <label>URL</label>
        <input type="text" />
        <div>
          <button type="submit">Add</button>
          <button className="secondary">Cancel</button>
        </div>
      </form>
    );
  }
}
