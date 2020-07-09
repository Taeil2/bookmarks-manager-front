import React from 'react';
import './searchBar.scss';
import AppContext from '../../../appContext';

export default class SearchBar extends React.Component {
  static contextType = AppContext;

  render() {
    return (
      <form action="https://www.google.com/search" className={'search-form ' + this.context.settings.icon_shape} method="get" name="search-form">
        <input autoComplete="off" className="google-search" name="q" placeholder="Google Search" type="text" />
        <button type="submit"><i className="fas fa-search"></i></button>
      </form>
    );
  }
}
