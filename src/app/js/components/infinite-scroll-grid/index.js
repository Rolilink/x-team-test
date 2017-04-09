import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class InfiniteScrollGrid extends Component {
  static propTypes = {}

  render() {
    return (
      <div>
        InfiniteScrollGrid
      </div>
    );
  }
}

const mapStatesToProps = () => ({});
const mapDispatchToProps = {};

export default connect(mapStatesToProps, mapDispatchToProps)(InfiniteScrollGrid);
