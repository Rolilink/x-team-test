import React, { PureComponent } from 'react';


export default class EndRow extends PureComponent {
  render() {
    return (
      <tr className="end-row">
        <td colSpan="4" className="text-center">~ end of catalogue ~</td>
      </tr>
    );
  }
}
