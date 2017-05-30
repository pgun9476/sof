/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Home.css';

class Home extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <div id="vizContainer" style={{width: 1300, height: 450, display: 'block', overflow: 'hidden'}}></div>

        <div id="dataTable"></div>
      </div>
    );
  }
}

export default withStyles(s)(Home);
