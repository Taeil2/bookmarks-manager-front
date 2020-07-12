import React from 'react';
import './addForm.scss';
import AppContext from '../../../appContext';
import BookmarksApiService from '../../../services/bookmarks-api-service';
import BookmarkImagesApiService from '../../../services/bookmark-images-api-service';

export default class AddForm extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {
      formType: 'site',
      name: '',
      url: ''
    }
  }

  handleFormType(typeName) {
    this.setState({formType: typeName});
  }

  handleChange(value, key) {
    this.setState({[key]: value})
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.state.formType === 'site') {
      this.addBookmark();
    }
    if (this.state.formType === 'folder') {
      this.addFolder();
    }
  }

  addFolder() {
    let pageOrDrawer;
    if (this.context.addOrigin === this.context.activePage) { // adding to page
      pageOrDrawer = 'page';
    } else { // adding to drawer
      pageOrDrawer = 'drawer';
    }

    // find the order
    let bookmarkOrder;
    if (pageOrDrawer === 'page') { // adding to page
      let screenBookmarks = this.context.pageBookmarks.filter(bookmark => bookmark.folder_name === '');
      bookmarkOrder = screenBookmarks.length + 1;
    } else { // adding to drawer
      let drawerBookmarks = this.context.drawerBookmarks.filter(bookmark => bookmark.folder_name === '');
      bookmarkOrder = drawerBookmarks.length + 1;
    }

    // Add the folder
    BookmarksApiService.addBookmark(this.context.addOrigin, this.state.name, null, null, bookmarkOrder, null, null, true)
      .then(result => {
        this.context.closeModal();
        this.context.loadUserData();
      });
  }

  addBookmark() {
    let pageOrDrawer;
    if (this.context.addOrigin === this.context.activePage) { // adding to page
      pageOrDrawer = 'page';
    } else { // adding to drawer
      pageOrDrawer = 'drawer';
    }

    let normalizedUrl = this.normalizeUrl(this.state.url);
    let baseUrl = this.getBaseUrl(normalizedUrl);

    // find the order
    let bookmarkOrder;
    if (pageOrDrawer === 'page') { // adding to page
      let screenBookmarks = this.context.pageBookmarks.filter(bookmark => bookmark.folder_name === '');
      bookmarkOrder = screenBookmarks.length + 1;
    } else { // adding to drawer
      let drawerBookmarks = this.context.drawerBookmarks.filter(bookmark => bookmark.folder_name === '');
      bookmarkOrder = drawerBookmarks.length + 1;
    }

    // add the bookmark
    BookmarksApiService.addBookmark(this.context.addOrigin, this.state.name, normalizedUrl, baseUrl, bookmarkOrder)
      .then(result => {
        this.context.closeModal();
        this.context.loadUserData();
      });

    // check if favicon exists
    BookmarkImagesApiService.getBookmarkImagesByUrl(baseUrl)
      .then(result => {
        if (result.length) {
          // if it already has images, do nothing
        } else {
          // get favicons and add them to database
          fetch(`https://besticon-favicon-finder.herokuapp.com/allicons.json?url=${baseUrl}`)
          .then(res => res.json())
          .then(data => {
            BookmarkImagesApiService.insertBookmarkImages(data)
            .then(result => {
              this.context.loadUserData();
            })
          });
        }
      })
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
    // var protocol = pathArray[0];
    var host = pathArray[2];
    // var baseUrl = protocol + '//' + host;
    return host;
  }

  render() {
    let siteActive;
    let folderActive;
    let urlHidden;
    if (this.state.formType === 'site') {
      siteActive = 'active';
    }
    if (this.state.formType === 'folder') {
      folderActive = 'active';
      urlHidden = 'hidden';
    }

    let headerHtml;
    if (this.context.settings.enable_folders) {
      headerHtml =
      <div className="btn-group-line">
        <button type="button" className={siteActive} onClick={(e) => this.handleFormType('site')}>Add site</button>
        <button type="button" className={folderActive} onClick={(e) => this.handleFormType('folder')}>Add folder</button>
      </div>;
    } else {
      headerHtml = <h3>Add site</h3>
    }

    return (
      <form onSubmit={(e) => this.handleSubmit(e)} autocomplete="off">
        {headerHtml}
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" value={this.state.name} onChange={e => this.handleChange(e.target.value, 'name')}></input>
        </div>
        <div className={urlHidden}>
          <label htmlFor="url">Url</label>
          <input type="text" id="url" value={this.state.url} onChange={e => this.handleChange(e.target.value, 'url')}></input>
        </div>
        <div>
          <button type="submit">Add</button>
          <button className="secondary" onClick={this.context.closeModal}>Cancel</button>
        </div>
        <div id="results"></div>
      </form>
    );
  }
}
