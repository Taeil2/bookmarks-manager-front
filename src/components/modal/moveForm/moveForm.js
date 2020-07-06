import React from 'react';
import './moveForm.scss';
import AppContext from '../../../appContext';
import BookmarksApiService from '../../../services/bookmarks-api-service';
import BookmarkImagesApiService from '../../../services/bookmark-images-api-service';

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

  handleSelect(value, key) {
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
        this.context.loadUserData();
      });
  }

  editBookmark() {
    let normalizedUrl = this.normalizeUrl(this.state.url);
    let baseUrl = this.getBaseUrl(normalizedUrl);

    // add the bookmark
    BookmarksApiService.editBookmark(this.context.editObject.id, this.context.editObject.page_id, this.state.name, normalizedUrl, this.getBaseUrl(normalizedUrl), this.context.editObject.bookmark_order, this.context.editObject.folder_name, this.context.editObject.group_name, this.context.editObject.hidden)
      .then(result => {
        this.context.closeModal();
        this.context.loadUserData();
      });

    // if the base url changed, get and add the new favicon
    if (baseUrl !== this.context.editObject.base_url) {
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
              console.log(result);
              this.context.loadUserData();
            })
          });
        }
      })
    }
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
    // pages
    // folders
    // drawer

    console.log()

    return (
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <h3>Move</h3>
        <div>

        </div>
        <div>
          <button type="submit">Move</button>
          <button className="secondary" onClick={this.context.closeModal}>Cancel</button>
        </div>
      </form>
    );
  }
}
