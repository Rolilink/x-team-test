/*
 *  GridContainer Component
 *  A simple table body that wraps the table rows rendered by the grid.
 */

import React, { Component } from 'react';

export default class GridContainer extends Component {
  render() {
    return (
      <tbody>
        {this.props.children}
      </tbody>
    );
  }
}
