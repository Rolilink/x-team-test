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
