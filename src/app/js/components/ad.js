import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { generateAd } from '../actions'

class Ad extends Component {
  componentWillMount() {
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

const mapStatesToProps = (state) => {
  return {
    ad: state.ads.lastAd,
  }
}

const mapDispatchToProps = {
  generateAd,
}

export default connect(mapStatesToProps, mapDispatchToProps)(Ad);
