import React from 'react';
import './settings.scss';
import AppContext from '../../../appContext';
import UserApiService from '../../../services/users-api-service';

export default class Settings extends React.Component {
  static contextType = AppContext;

  handleSettingChange = (setting, value) => {
    if (value === 'switch') {
      UserApiService.updateUser({[setting]: !this.context.settings[setting]})
      this.context.changeSettings({[setting]: !this.context.settings[setting]});
    } else {
      UserApiService.updateUser({[setting]: value});
      this.context.changeSettings({[setting]: value});
    }
  }

  render() {
    let enable_pages = false;
    let enable_folders = false;
    let icon_size_small;
    let icon_size_medium;
    let icon_size_large;
    let icon_shape_square;
    let icon_shape_rounded;
    let icon_shape_circle;
    let icons_per_row_4;
    let icons_per_row_5;
    let icons_per_row_6;
    let icons_per_row_7;
    let icons_per_row_8;
    // let icon_alignment_left;
    // let icon_alignment_center;
    // let icon_alignment_right;
    // let enable_groups = false;
    let enable_hiding = false;

    if (this.context.settings.enable_pages === true) {
      enable_pages = true;
    }
    if (this.context.settings.enable_folders === true) {
      enable_folders = true;
    }
    if (this.context.settings.icon_size === 'small') {
      icon_size_small = 'active';
    }
    if (this.context.settings.icon_size === 'medium') {
      icon_size_medium = 'active';
    }
    if (this.context.settings.icon_size === 'large') {
      icon_size_large = 'active';
    }
    if (this.context.settings.icon_shape === 'square') {
      icon_shape_square = 'active';
    }
    if (this.context.settings.icon_shape === 'rounded') {
      icon_shape_rounded = 'active';
    }
    if (this.context.settings.icon_shape === 'circle') {
      icon_shape_circle = 'active';
    }
    if (this.context.settings.icons_per_row === 4) {
      icons_per_row_4 = 'active';
    }
    if (this.context.settings.icons_per_row === 5) {
      icons_per_row_5 = 'active';
    }
    if (this.context.settings.icons_per_row === 6) {
      icons_per_row_6 = 'active';
    }
    if (this.context.settings.icons_per_row === 7) {
      icons_per_row_7 = 'active';
    }
    if (this.context.settings.icons_per_row === 8) {
      icons_per_row_8 = 'active';
    }
    // if (this.context.settings.icon_alignment === 'left') {
    //   icon_alignment_left = 'active';
    // }
    // if (this.context.settings.icon_alignment === 'center') {
    //   icon_alignment_center = 'active';
    // }
    // if (this.context.settings.icon_alignment === 'right') {
    //   icon_alignment_right = 'active';
    // }
    // if (this.context.settings.enable_groups === true) {
    //   enable_groups = true;
    // }
    if (this.context.settings.enable_hiding === true) {
      enable_hiding = true;
    }

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
                <input type="checkbox" checked={enable_pages} onChange={() => this.handleSettingChange('enable_pages', 'switch')} />
                <span className="slider round"></span>
              </label>
              <small className="light">Separate bookmarks onto multiple screens</small>
            </div>
            <div className="setting">
              <label>Enable folders</label>
              <label className="switch">
                <input type="checkbox" checked={enable_folders} onChange={() => this.handleSettingChange('enable_folders', 'switch')} />
                <span className="slider round"></span>
              </label>
              <small className="light">Group multiple bookmarks into a single folder</small>
            </div>
            <div className="setting">
              <label>Enable hiding bookmarks</label>
              <label className="switch">
                <input type="checkbox" checked={enable_hiding} onChange={() => this.handleSettingChange('enable_hiding', 'switch')} />
                <span className="slider round"></span>
              </label>
              <small className="light">Show and hide bookmarks</small>
            </div>
          </div>
          <div className="setting-group">
            <h3>Appearance</h3>
            <h4>Icons</h4>
            <div className="setting">
              <label>Size</label>
              <div>
                <div className="btn-group">
                  <button onClick={() => this.handleSettingChange('icon_size', 'small')} className={icon_size_small} >small</button>
                  <button onClick={() => this.handleSettingChange('icon_size', 'medium')}  className={icon_size_medium} >medium</button>
                  <button onClick={() => this.handleSettingChange('icon_size', 'large')} className={icon_size_large}>large</button>
                </div>
              </div>
            </div>
            <div className="setting">
              <label>Shape</label>
              <div>
                <div className="btn-group">
                  <button onClick={() => this.handleSettingChange('icon_shape', 'square')} className={icon_shape_square} >square</button>
                  <button onClick={() => this.handleSettingChange('icon_shape', 'rounded')} className={icon_shape_rounded} >rounded</button>
                  <button onClick={() => this.handleSettingChange('icon_shape', 'circle')} className={icon_shape_circle} >circle</button>
                </div>
              </div>
            </div>
            <div className="setting">
              <label>Per Row</label>
              <div>
                <div className="btn-group">
                  <button onClick={() => this.handleSettingChange('icons_per_row', 4)} className={icons_per_row_4}>4</button>
                  <button onClick={() => this.handleSettingChange('icons_per_row', 5)} className={icons_per_row_5}>5</button>
                  <button onClick={() => this.handleSettingChange('icons_per_row', 6)} className={icons_per_row_6}>6</button>
                  <button onClick={() => this.handleSettingChange('icons_per_row', 7)} className={icons_per_row_7}>7</button>
                  <button onClick={() => this.handleSettingChange('icons_per_row', 8)} className={icons_per_row_8}>8</button>
                </div>
              </div>
            </div>
            {/* <div className="setting">
              <label>Alignment</label>
              <div>
                <div className="btn-group">
                  <button onClick={() => this.context.changeSettings({icon_alignment: 'left'})} className={icon_alignment_left}>left</button>
                  <button onClick={() => this.context.changeSettings({icon_alignment: 'center'})} className={icon_alignment_center}>center</button>
                  <button onClick={() => this.context.changeSettings({icon_alignment: 'right'})} className={icon_alignment_right}>right</button>
                </div>
              </div>
            </div> */}
          </div>
          {/* <div className="setting-group">
            <h3>Advanced</h3>
            <div className="setting">
              <label>Enable groups</label>
              <label className="switch">
                <input type="checkbox" checked={enable_groups} onChange={() => this.context.changeSettings({enable_groups: !this.context.settings.enable_groups})} />
                <span className="slider round"></span>
              </label>
              <small className="light">Grouped bookmarks will stick together</small>
            </div>
            <div className="setting">
              <label>Enable hiding bookmarks</label>
              <label className="switch">
                <input type="checkbox" checked={enable_hiding} onChange={() => this.context.changeSettings({enable_hiding: !this.context.settings.enable_hiding})} />
                <span className="slider round"></span>
              </label>
              <small className="light">Show and hide bookmarks</small>
            </div>
          </div> */}
        </div>
      </>
    );
  }
}
