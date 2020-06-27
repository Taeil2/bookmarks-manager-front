import React from 'react';
import './settings.scss';
import AppContext from '../../../appContext';

export default class Settings extends React.Component {
  static contextType = AppContext;

  render() {
    return (
      <>
        <header>
          <h2><i className="fas fa-cog"></i> Settings</h2>
          <button className="close-sidebar icon-btn" onClick={(e) => this.context.closeSidebar(e)}><i className="fas fa-times"></i></button>
        </header>
        <div className="settings-container">
          <div className="setting-group">
            <h3>Organization</h3>
            <div className="setting">
              <label>Enable pages</label>
              <label className="switch">
                <input type="checkbox" />
                <span className="slider round"></span>
              </label>
              <small className="light">Separate bookmarks onto multiple screens</small>
            </div>
            <div className="setting">
              <label>Enable folders</label>
              <label className="switch">
                <input type="checkbox" />
                <span className="slider round"></span>
              </label>
              <small className="light">Group multiple bookmarks into a single folder</small>
            </div>
          </div>
          <div className="setting-group">
            <h3>Appearance</h3>
            <h4>Icons</h4>
            <div className="setting">
              <label>Size</label>
              <div>
                <div className="btn-group">
                  <button>small</button>
                  <button className="active">medium</button>
                  <button>large</button>
                </div>
              </div>
            </div>
            <div className="setting">
              <label>Shape</label>
              <div>
                <div className="btn-group">
                  <button>square</button>
                  <button className="active">rounded</button>
                  <button>circle</button>
                </div>
              </div>
            </div>
            <div className="setting">
              <label>Per Row</label>
              <div>
                <div className="btn-group">
                  <button>4</button>
                  <button className="active">5</button>
                  <button>6</button>
                  <button>7</button>
                  <button>8</button>
                </div>
              </div>
            </div>
            <div className="setting">
              <label>Alignment</label>
              <div>
                <div className="btn-group">
                  <button>left</button>
                  <button className="active">center</button>
                  <button>right</button>
                </div>
              </div>
            </div>
          </div>
          <div className="setting-group">
            <h3>Advanced</h3>
            <div className="setting">
              <label>Enable groups</label>
              <label className="switch">
                <input type="checkbox" />
                <span className="slider round"></span>
              </label>
              <small className="light">Grouped bookmarks will stick together</small>
            </div>
            <div className="setting">
              <label>Enable hiding bookmarks</label>
              <label className="switch">
                <input type="checkbox" />
                <span className="slider round"></span>
              </label>
              <small className="light">Show and hide bookmarks</small>
            </div>
          </div>
        </div>
      </>
    );
  }
}
