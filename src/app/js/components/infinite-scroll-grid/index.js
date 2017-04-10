import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import GridContainer from './gridContainer';
import GridHeader from './GridHeader';
import FaceRow from './rows/faceRow';
import

class InfiniteScrollGrid extends Component {
  static propTypes = {}
  
  get gridItems() {
    return;
  }

  render() {
    return (
      <table className="table">
        <GridHeader />
        <GridContainer>
          {this.gridItems}
        </GridContainer>
      </table>
    );
  }
}

const mapStatesToProps = (state) => ({});
const mapDispatchToProps = {};

export default connect(mapStatesToProps, mapDispatchToProps)(InfiniteScrollGrid);
