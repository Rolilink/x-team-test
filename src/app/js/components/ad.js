import React, { PureComponent, PropTypes } from 'react';


export default class Ad extends PureComponent {
  get adSrc() {
    return '/ad/?r=653';
  }

  render() {
    return (
      <img alt="ad" className="ad center-block img-thumbnail" src={this.adSrc} />
    );
  }
}
