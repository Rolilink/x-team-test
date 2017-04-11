/*
 *  LoadingRow Component
 *  A simple row component that is shown when loading records.
 */

import React from 'react';


export default class LoadingRow extends React.PureComponent {
  render() {
    return (
      <tr className="loading-row">
        <td colSpan="4" className="text-center">loading...</td>
      </tr>
    );
  }
}
