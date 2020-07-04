import React from 'react';
import './editForm.scss';
import AppContext from '../../../appContext';
import BookmarksApiService from '../../../services/bookmarks-api-service';

export default class EditForm extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      url: ''
    }
  }

  componentDidMount() {
    this.setState({
      name: this.context.editObject.name,
      url: this.context.editObject.url
    });
  }

  handleChange(value, key) {
    this.setState({[key]: value})
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.context.editObject.is_folder) {
      this.editFolder();
    } else {
      this.editBookmark();
    }
  }

  editFolder() {
    // Edit the folder
    BookmarksApiService.editBookmark(this.context.editObject.id, this.context.editObject.page_id, this.state.name, null, null, this.context.editObject.bookmark_order, null, this.context.editObject.group_name, this.context.editObject.hidden)
      .then(result => {
        this.context.closeModal();
        if (result.page_id === this.context.activePage) { // editing in page
          // let newPageBookmarks = this.context.pageBookmarks;
          // newPageBookmarks[bookmarkOrder - 1] = result;
          // this.context.changeContext({pageBookmarks: newPageBookmarks});
        } else { // editing in drawer
          // let newDrawerBookmarks = this.context.drawerBookmarks;
          // newDrawerBookmarks[bookmarkOrder - 1] = result;
          // this.context.changeContext({drawerBookmarks: newDrawerBookmarks});
        }
      });
  }

  // editBookmark(id, page_id, name, url, base_url, bookmark_order, folder_name, group_name, hidden) {

  editBookmark() {
    let normalizedUrl = this.normalizeUrl(this.state.url);

    // get favicons
    fetch(`https://besticon-favicon-finder.herokuapp.com/allicons.json?url=${normalizedUrl}`)
      .then(res => res.json())
      .then(data => console.log(data));

    // add the bookmark
    BookmarksApiService.editBookmark(this.context.editObject.id, this.context.editObject.page_id, this.state.name, normalizedUrl, this.getBaseUrl(normalizedUrl), this.context.editObject.bookmark_order, this.context.editObject.folder_name, this.context.editObject.group_name, this.context.editObject.hidden)
      .then(result => {
        this.context.closeModal();
        console.log(result);
        // add it to the page
        if (result.page_id === this.context.activePage) { // adding to page
          // let newPageBookmarks = this.context.pageBookmarks;
          // newPageBookmarks[bookmarkOrder - 1] = result;
          // this.context.changeContext({pageBookmarks: newPageBookmarks});
        } else { // adding to drawer
          // let newDrawerBookmarks = this.context.drawerBookmarks;
          // newDrawerBookmarks[bookmarkOrder - 1] = result;
          // this.context.changeContext({drawerBookmarks: newDrawerBookmarks});
        }
      });
  }

  changeContext = (contextUpdate) => {
    let newContext = {...this.state, ...contextUpdate}

    this.setState(newContext);
  }

  normalizeUrl = (url) => {
    if (url.indexOf('http://') === -1 && url.indexOf('https://') === -1){
      return 'https://' + url;
    }
    return url;
  };

  getBaseUrl = (url) => {
    var pathArray = url.split( '/' );
    var protocol = pathArray[0];
    var host = pathArray[2];
    var baseUrl = protocol + '//' + host;
    return baseUrl;
  }

  render() {
    console.log('edit object', this.context.editObject);

    let formTitle;
    let urlHidden;
    let submitText;

    if (this.context.editObject.is_folder) {
      formTitle = 'Rename folder';
      urlHidden = 'hidden';
      submitText = 'Rename';
    } else {
      formTitle = 'Edit site';
      submitText = 'Edit';
    }

    return (
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <h3>{formTitle}</h3>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" value={this.state.name} onChange={e => this.handleChange(e.target.value, 'name')}></input>
        </div>
        <div className={urlHidden}>
          <label htmlFor="url">Url</label>
          <input type="text" id="url" value={this.state.url} onChange={e => this.handleChange(e.target.value, 'url')}></input>
        </div>
        <div>
          <button type="submit">{submitText}</button>
          <button className="secondary" onClick={this.context.closeModal}>Cancel</button>
        </div>
        <div id="results"></div>
      </form>
    );
  }
}
