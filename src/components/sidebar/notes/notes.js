import React from 'react';
import './notes.scss';
import AppContext from '../../../appContext';
import UsersService from '../../../services/users-api-service'

import Quill from 'quill';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
// import 'quill/dist/quill.bubble.css';
import showdown from 'showdown';

export default class Notes extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props)
    this.state = {
      converter: null
    }
  }

  componentDidMount() {
    let quill = new Quill('#quill-editor', {
      modules: {
        toolbar: [
          [ {'header': 1}, { 'header': 2}],
          ['bold', 'italic', 'underline'], // 'strike'
          [{'list': 'ordered'}, {'list': 'bullet'}, {'list': 'check'} ],
          ['link', 'image', 'video'], // 'blockquote', 'code-block'
        ]
      },
      placeholder: 'Write here',
      theme: 'snow',
      // theme: 'bubble',
    });

    var showdownConverter = new showdown.Converter();
    this.setState({converter: showdownConverter});
  }



  componentWillUnmount() {
    document.getElementsByClassName('ql-toolbar')[0].remove();
  }

  handleKeyPress = (e) => {
    let content = e.target.children;

    let markdown = '';
    for (let tag of content) {
      let tagHtml = tag.outerHTML;
      let tagMarkdown = this.state.converter.makeMarkdown(tagHtml);
      markdown += tagMarkdown;
    }
    this.context.changeContext({note: markdown});
    console.log(markdown);
    // UsersService.updateUser({note: markdown});
  }

  render() {
    let noteHtml;
    if (this.context.note !== null) {
      noteHtml = this.state.converter.makeHtml(this.context.note);
    }
    // console.log(noteHtml);

    return (
      <>
        <header>
          <h2><i className="fas fa-book"></i> Notes</h2>
          <button className="close-sidebar icon-btn" onClick={(e) => this.context.closeSidebar(e)}><i className="fas fa-times"></i></button>
        </header>
        <div id="quill-editor" onKeyPress={this.handleKeyPress}>

        </div>
      </>
    );
  }
}
