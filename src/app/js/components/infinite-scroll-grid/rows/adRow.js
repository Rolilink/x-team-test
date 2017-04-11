import React, { PureComponent, PropTypes } from 'react';
import Ad from '../../ad';

export default class AdRow extends PureComponent {
  render() {
    return (
      <tr className="ad-row">
        <td colSpan="4"><Ad /></td>
      </tr>
    );
  }
}
