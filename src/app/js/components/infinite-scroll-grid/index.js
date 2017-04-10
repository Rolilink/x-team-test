/* global $*/
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import GridContainer from './gridContainer';
import GridHeader from './gridHeader';
import FaceRow from './rows/faceRow';
import AdRow from './rows/adRow';
import EndRow from './rows/endRow';
import LoadingRow from './rows/loadingRow';
import { maybeFetchFaces } from '../../actions';

class InfiniteScrollGrid extends Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    faces: PropTypes.array.isRequired,
    maybeFetchFaces: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.maybeFetchFaces();
    this.setupScrollHandler();
  }

  componentWillUnmount() {
    this.removeScrollHandler();
  }

  setupScrollHandler() {
    this.lastVerticalScroll = this.verticalScroll;
    this.scrollListener = window.addEventListener('scroll', this.handleScroll.bind(this));
  }

  removeScrollHandler() {

  }

  get documentHeight() {
    const { documentElement, body } = document;
    return Math.max(
      body.scrollHeight,
      body.offsetHeight,
      documentElement.clientHeight,
      documentElement.scrollHeight,
      documentElement.offsetHeight,
    );
  }

  get verticalScroll() {
    return window.scrollY + window.innerHeight;
  }

  onScrollDown() {
    this.props.maybeFetchFaces();
  }

  onEndOfDocument() {
    console.log('end of document');
  }

  handleScroll() {
    const documentHeight = this.documentHeight;
    const verticalScroll = this.verticalScroll;

    if (this.verticalScroll - this.lastVerticalScroll > 0) {
      this.onScrollDown();
    }

    // when we are 100px short of the end of the document trigger onEndOfDocument
    if (verticalScroll + 100 > documentHeight) {
      this.onEndOfDocument();
    }
    this.lastVerticalScroll = verticalScroll;
  }

  get gridItems() {
    const rows = [];
    let facesCount = 0;

    _.each(this.props.faces, (face) => {
      rows.push(<FaceRow {...face} key={`face-row-${face.id}`}/>);
      facesCount++;

      if (facesCount === 20) {
        rows.push(<AdRow />);
        facesCount = 0;
      }
    });

    if (this.props.isFetching) {
      rows.push(<LoadingRow />);
    }

    if (this.props.allFacesFetched) {
      row.push(<EndRow />);
    }

    return rows;
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

const mapStatesToProps = (state) => {
  const { faces, isFetching } = state.faces;

  return {
    faces,
    isFetching,
  };
};
const mapDispatchToProps = {
  maybeFetchFaces,
};

export default connect(mapStatesToProps, mapDispatchToProps)(InfiniteScrollGrid);
