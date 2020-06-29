import React from 'react';
import './notes.scss';
import AppContext from '../../../appContext';

import Quill from 'quill';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
// import 'quill/dist/quill.bubble.css';

export default class Notes extends React.Component {
  static contextType = AppContext;

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
  }

  componentWillUnmount() {
    document.getElementsByClassName('ql-toolbar')[0].remove();
  }

  handleKeyPress = (e) => {
    let content = e.target.children;
    this.context.setNote(content);

    // console.log('hi');
    // console.log('note', this.context.note);
  }

  render() {
    let noteContent = '';
    // console.log(this.context.note);
    if (this.context.note !== null) {
      // noteContent = Array.prototype.slice.call(this.context.note);
      let htmlArray = [...this.context.note];
      noteContent += htmlArray.map(el => el.outerHTML);
    }
    console.log(noteContent);

    return (
      <>
        <header>
          <h2><i className="fas fa-book"></i> Notes</h2>
          <button className="close-sidebar icon-btn" onClick={(e) => this.context.closeSidebar(e)}><i className="fas fa-times"></i></button>
        </header>
        <div id="quill-editor" onKeyPress={this.handleKeyPress}></div>
      </>
    );
  }
}
