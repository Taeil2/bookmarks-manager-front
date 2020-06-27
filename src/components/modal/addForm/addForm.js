import React from 'react';
import './addForm.scss';
import AppContext from '../../../appContext';

export default class AddForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      url: ''
    }
  }

  static contextType = AppContext;

  handleChange(value, key) {
    this.setState({[key]: value})
  }

  handleSubmit(e) {
    e.preventDefault();

    let normalizedUrl = this.normalizeUrl(this.state.url);

    fetch(`https://besticon-favicon-finder.herokuapp.com/allicons.json?url=${normalizedUrl}`)
      .then(res => res.json())
      .then(data => console.log(data));
  }

  normalizeUrl = (url) => {
    if (url.indexOf('http://') === -1 || url.indexOf('https://') === -1){
      return 'https://' + url;
    }
  };

  getBaseUrl = (url) => {
    var pathArray = url.split( '/' );
    var protocol = pathArray[0];
    var host = pathArray[2];
    var baseUrl = protocol + '//' + host;
    return baseUrl;
  }

  render() {
    return (
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <h3>Add site</h3>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" value={this.state.name} onChange={e => this.handleChange(e.target.value, 'name')}></input>
        <label htmlFor="url">Url</label>
        <input type="text" id="url" onChange={e => this.handleChange(e.target.value, 'url')}></input>
        <div>
          <button type="submit">Add</button>
          <button className="secondary" onClick={this.context.closeModal}>Cancel</button>
        </div>
        <div id="results"></div>
      </form>
    );
  }
}
