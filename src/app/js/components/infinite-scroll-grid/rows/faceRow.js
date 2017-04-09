import React, { Component, PropTypes } from 'react';
import moment from 'moment';

export default class FaceRow extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    date: React.PropTypes.instanceOf(Date).isRequired,
  }

  get key() {
    return `face-row-${this.props.id}`;
  }

  get fontSize() {
    return `${this.props.size}px`;
  }

  get priceInDollars() {
    return `$${Number(this.props.price / 100).toFixed(2)}`;
  }

  get formattedDate() {
    const now = moment();
    const date = moment(this.props.date);
    const difference = now.diff(date, 'hour')

    if (now.diff(date, 'days') >= 7) {
      return date.format('MMMM Do YYYY');
    }

    return date.fromNow();
  }

  render() {
    return (
      <tr className="face-row" key={this.key}>
        <td className="face-field" style={{ fontSize: this.fontSize }}>{this.props.text}</td>
        <td className="size-field">{this.fontSize}</td>
        <td className="price-field">{this.priceInDollars}</td>
        <td className="date-field">{this.formattedDate}</td>
      </tr>
    );
  }
}
