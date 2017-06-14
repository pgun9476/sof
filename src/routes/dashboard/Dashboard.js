/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Dashboard.css';

class Dashboard extends React.Component {
  static propTypes = {
    news: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      content: PropTypes.string,
    })).isRequired,
  };

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <div className="row">
            <div id="vizContainer" style={{ width: 1300, height: 450, display: 'block', overflow: 'hidden' }} />
          </div>
          <div className="row">
            <button type="button" id="displaySelected" className="btn btn-default" style={{ display: 'none' }} >
              View Selected
            </button>
            <button id="exportTo360" className="btn btn-default" style={{ display: 'none' }} >
              Export to 360
            </button>
            <button id="sendAnEmail" className="btn btn-default" style={{ display: 'none' }} >
              Email
            </button>
          </div>
          <div className="row">
            <div id="dataTable" />
          </div>
          <div id="selectedContactsModal" title="Selected Contacts">
            <div id="selectedContactsTable" />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Dashboard);
