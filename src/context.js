import React from 'react';

const BookmarksContext = React.createContext({
  bookmarks: [],

  showModal: false,

  toggleModal: () => {  },
  addBookmark: () => {},
  deleteBookmark: () => {},
});

export default BookmarksContext;
