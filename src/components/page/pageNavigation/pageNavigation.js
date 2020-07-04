import React from 'react';
import './pageNavigation.scss';
import { NavLink } from 'react-router-dom';
import AppContext from '../../../appContext';
import PagesApiService from '../../../services/pages-api-service';

export default class PageNavigation extends React.Component {
  static contextType = AppContext;

  handleAddPage = () => {
    let pageName = 'Page ' + this.context.pages.length;
    let order = this.context.pages.length;
    PagesApiService.createPage(pageName, order)
      .then(result => {
        let newPages = this.context.pages;
        newPages.push(result);
        this.context.changeContext({newPages});
      })
    // this.context.pages.length
  }

  render() {
    let pageLinks = [];
    for (let i = 0; i < this.context.pages.length; i++) {
      if (this.context.pages[i].is_drawer) {
        // ignore
      } else if (i === 0) {
        pageLinks.push(<NavLink exact to='/' className="btn" pageid={this.context.pages[i].id} key={i}>{this.context.pages[i].name}</NavLink>);
      } else {
        pageLinks.push(<NavLink to={'/page/' + this.context.pages[i].id} className="btn" pageid={this.context.pages[i].id} key={i}>{this.context.pages[i].name}</NavLink>);
      }
    }

    return (
      <div className="btn-group-line">
        {pageLinks}
        <button onClick={this.handleAddPage}><i className="fas fa-plus"></i></button>
      </div>
    );
  }
}
