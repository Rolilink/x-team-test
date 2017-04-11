/*
 *  GridContainer Component
 *  A simple table body that wraps the table rows rendered by the grid.
 */

import React, { PureComponent } from 'react';

export default class GridContainer extends PureComponent {
  render() {
    return (
      <tbody>
        {this.props.children}
      </tbody>
    );
  }
}
