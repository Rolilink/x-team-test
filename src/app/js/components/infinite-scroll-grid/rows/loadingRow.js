/*
 *  LoadingRow Component
 *  A simple row component that is shown when loading records.
 */

import React, { PureComponent } from 'react';


export default class LoadingRow extends PureComponent {
  render() {
    return (
      <tr className="loading-row">
        <td colSpan="4" className="text-center">loading...</td>
      </tr>
    );
  }
}
