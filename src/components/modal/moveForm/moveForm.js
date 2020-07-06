import React from 'react';
import './moveForm.scss';
import AppContext from '../../../appContext';
import BookmarksApiService from '../../../services/bookmarks-api-service';

export default class MoveForm extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
    this.setState({
    });
  }

  // what are you moving? a bookmark or a folder?
  // where are you moving it? a folder or a page?

  // if bookmark moving to folder
  //   - list possible folders, select folder, add to folder, remove original
  // if bookmark moving to a page
  //   - list possible pages, select page, add to page, remove original
  // if folder moving to a page


  handleSelect(value, key) {
    this.setState({[key]: value})
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.context.moveObject.is_folder) {
      this.editFolder();
    } else {
      this.editBookmark();
    }
  }

  movePage(e) {

  }

  moveFolder(e) {
    // find the folder, get the order within the folder, add the bookmark, remove this bookmark
    let folder = this.context.pageBookmarks.filter(bookmark => bookmark.is_folder)[0];
    let bookmarksInFolder = this.context.pageBookmarks.filter(bookmark => bookmark.folder_name === folder.name);
    let bookmarkOrder = bookmarksInFolder.length + 1;

    BookmarksApiService.addBookmark(this.props.bookmark.page_id, this.props.bookmark.name, this.props.bookmark.url, this.props.bookmark.base_url, bookmarkOrder, folder.name)
    .then(result => {
      this.context.closeModal();
      BookmarksApiService.deleteBookmark(this.props.bookmark.id)
        .then(result => {
          this.context.loadUserData();
        });
    });
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
    return (
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <h3>Move to</h3>
        <div>
          <label className="radio-select">
            <input type="radio" name="move-select"></input>
            <span className="radio-icon"><span></span></span>
            <span className="label">Search Engines</span>
          </label>
          <label className="radio-select">
            <input type="radio" name="move-select"></input>
            <span className="radio-icon"><span></span></span>
            <span className="label">Another Folder</span>
          </label>
          <label className="radio-select">
            <input type="radio" name="move-select"></input>
            <span className="radio-icon"><span></span></span>
            <span className="label">One more folder</span>
          </label>
        </div>
        <div>
          <button type="submit">Move</button>
          <button className="secondary" onClick={this.context.closeModal}>Cancel</button>
        </div>
      </form>
    );
  }
}
