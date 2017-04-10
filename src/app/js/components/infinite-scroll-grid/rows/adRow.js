import React, { PureComponent, PropTypes } from 'react';
import Ad from '../../ad';

export default class AdRow extends PureComponent {
  static propTypes = {
    id: PropTypes.number.isRequired,
  }

  get key() {
    return `face-row-${this.props.id}`;
  }

  render() {
    return (
      <tr className="ad-row" key={this.key}>
        <td colSpan="4"><Ad id={this.props.id} /></td>
      </tr>
    );
  }
}
