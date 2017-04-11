/*
 *  FaceRow Component
 *  A row component that shows a face, price as dollars, the size as pixels and
 *  when it was added to the catalogue
 */

import React, { PureComponent, PropTypes } from 'react';
import moment from 'moment';

export default class FaceRow extends PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    face: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    date: React.PropTypes.string.isRequired,
  }

  get key() {
    return `face-row-${this.props.id}`;
  }

  get fontSize() {
    return `${this.props.size}px`;
  }

  // Show price as dollars
  get priceInDollars() {
    return `$${Number(this.props.price / 100).toFixed(2)}`;
  }

  // Format Date as 'x days ago' if it was added to the catalogue less than a week ago
  get formattedDate() {
    const now = moment();
    const date = moment(this.props.date);

    if (now.diff(date, 'days') >= 7) {
      return date.format('MMMM Do YYYY');
    }

    return date.fromNow();
  }

  render() {
    return (
      <tr className="face-row" key={this.key}>
        <td className="face-field" style={{ fontSize: this.fontSize }}>{this.props.face}</td>
        <td className="size-field">{this.fontSize}</td>
        <td className="price-field">{this.priceInDollars}</td>
        <td className="date-field">{this.formattedDate}</td>
      </tr>
    );
  }
}
