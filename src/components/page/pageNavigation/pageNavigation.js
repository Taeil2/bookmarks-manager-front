import React from 'react';
import './pageNavigation.scss';

export default function PageNavigation() {
  return (
    <div className="btn-group-line">
      <button className="active">Page 1</button>
      <button>Page 2</button>
      <button>Page 3</button>
      <button><i className="fas fa-plus"></i></button>
    </div>
  );
}
