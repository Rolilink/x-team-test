import React, { PureComponent, PropTypes } from 'react';


export default class Ad extends PureComponent {
  static propTypes = {
    id: PropTypes.number.isRequired,
  }

  get adSrc() {
    return `/ad/?r=${this.props.id}`;
  }

  render() {
    return (
      <img alt="ad" className="ad center-block img-thumbnail" src={this.adSrc} />
    );
  }
}
