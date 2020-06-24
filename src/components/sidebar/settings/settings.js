import React from 'react';
import './settings.scss';

export default function Settings() {
  return (
    <>
      <h2><i className="fas fa-cog"></i> Settings</h2>
      <h4>Organization</h4>
      <label>Enable pages</label>
      <small>Separate bookmarks onto multiple screens</small>
      <label>Enable folders</label>
      <small>Group multiple bookmarks into a single folder</small>
      <h4>Appearance</h4>
      <h6>Icons</h6>
      <label>Size</label>
      <label>Shape</label>
      <label>Per Row</label>
      <label>Alignment</label>
      <h4>Advanced</h4>
      <label>Enable groups</label>
      <small>Grouped bookmarks will stick together</small>
      <label>Enable hiding bookmarks</label>
      <small>Show and hide bookmarks</small>
    </>
  );
}
