import React from 'react';
import './searchBar.scss';

export default function SearchBar() {
  return (
    <form action="https://www.google.com/search" className="search-form" method="get" name="search-form">
      <input autoComplete="off" className="google-search" name="q" placeholder="Google Search" type="text" />
      <button type="submit"><i className="fas fa-search"></i></button>
    </form>
  );
}
