import React, { PureComponent, PropTypes } from 'react';


export default class AdRow extends PureComponent {
  static propTypes = {
    id: PropTypes.number.isRequired,
  }

  get key() {
    return `face-row-${this.props.id}`;
  }

  get adSrc() {
    return `/ad/?r=${this.props.id}`;
  }

  render() {
    return (
      <tr className="ad-row" key={this.key}>
        <td colSpan="4"><img alt="ad" className="ad center-block img-thumbnail" src={this.adSrc} /></td>
      </tr>
    );
  }
}
