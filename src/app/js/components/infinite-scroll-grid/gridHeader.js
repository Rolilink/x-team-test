import React, { Component, PropTypes } from 'react';


export default class GridHeader extends React.PureComponent {
  static propTypes = {}

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
