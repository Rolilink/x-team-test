/*
 *  GridHeader Component
 *  Just renders the header of the grid
 */

import React, { PureComponent } from 'react';

export default class GridHeader extends PureComponent {
  render() {
    return (
      <thead>
        <tr>
          <th>Face</th>
          <th>Size</th>
          <th>Cost</th>
          <th>Date Added</th>
        </tr>
      </thead>
    );
  }
}
