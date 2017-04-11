/*
 *  Ad Component
 *  Smart component responsible for generating and showing random ads calling generateAd
 *  the returned id is not the same as the last Ad mounted.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { generateAd } from '../actions';

class Ad extends Component {
  static propTypes = {
    generateAd: PropTypes.func.isRequired,
  }

  componentWillMount() {
    // It generates the ad when mounted and assigns it ass an object attribute
    // this way it generates independent ad components that doesn't depend on
    // its parents, so we can drop them on Header or an AdRow.
    this.id = this.props.generateAd();
  }

  get adSrc() {
    return `/ad/?r=${this.id}`;
  }

  render() {
    return (
      <img alt="ad" className="ad center-block img-thumbnail" src={this.adSrc} />
    );
  }
}

const mapStatesToProps = state => ({ ad: state.ads.lastAd });

const mapDispatchToProps = {
  generateAd,
};

export default connect(mapStatesToProps, mapDispatchToProps)(Ad);
