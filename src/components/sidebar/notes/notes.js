import React from 'react';
import './notes.scss';

import Quill from 'quill';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
// import 'quill/dist/quill.bubble.css';

export default class Notes extends React.Component {
  componentDidMount() {
    let quill = new Quill('#quill-editor', {
      modules: {
        toolbar: [
          [ {'header': 1}, { 'header': 2}],
          ['bold', 'italic', 'underline', 'strike'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'list': 'check'} ],
          ['link', 'image', 'video', 'blockquote', 'code-block'],
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

  render() {
    return (
      <>
        <h2><i className="fas fa-book"></i> Notes</h2>
        <div id="quill-editor"></div>
      </>
    );
  }
}
