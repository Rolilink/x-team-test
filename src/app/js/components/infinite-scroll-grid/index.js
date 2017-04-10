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
import { maybeFetchFaces, showNextFaces } from '../../actions';

class InfiniteScrollGrid extends Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    faces: PropTypes.array.isRequired,
    showNextFaces: PropTypes.func.isRequired,
    maybeFetchFaces: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.fetchAndMaybeShowFaces();
    this.setupScrollHandler();
  }

  componentWillUnmount() {
    this.removeScrollHandler();
  }

  setupScrollHandler() {
    this.lastVerticalScroll = this.verticalScroll;
    window.addEventListener('scroll', this.handleScroll.bind(this));
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

  get isBottomOfTheDocument() {
    return this.verticalScroll + 200 > this.documentHeight
  }

  onScrollDown() {
    this.fetchAndMaybeShowFaces();
  }

  fetchAndMaybeShowFaces() {
    this.props.maybeFetchFaces().then(() => {
        this.props.showNextFaces();
    });
  }

  onEndOfDocument() {
    this.fetchAndMaybeShowFaces();
  }

  maybeShowNextFaces() {
    if (this.props.visibleFaces.length > this.props.faces.length) {
      this.props.showNextFaces();
    }
  }

  handleScroll() {
    if (this.verticalScroll - this.lastVerticalScroll > 0) {
      this.onScrollDown();
    }

    // when we are 100px short of the end of the document trigger onEndOfDocument
    if (this.isBottomOfTheDocument) {
      this.onEndOfDocument();
    }
    this.lastVerticalScroll = this.verticalScroll;
  }

  get gridItems() {
    const rows = [];
    let facesCount = 0;

    _.each(this.props.faces, (face) => {
      if (_.includes(this.props.visibleFaces, face.id)) {
        rows.push(<FaceRow {...face} key={`face-row-${face.id}`} />);
        facesCount++;
      }

      if (facesCount === 20) {
        rows.push(<AdRow />);
        facesCount = 0;
      }
    });

    if (this.props.isFetching) {
      rows.push(<LoadingRow />);
      return rows;
    }

    if (this.props.fetchedAllFaces) {
      rows.push(<EndRow />);
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
  const { faces, isFetching, visibleFaces, fetchedAllFaces } = state.faces;

  return {
    faces,
    visibleFaces,
    isFetching,
    fetchedAllFaces,
  };
};
const mapDispatchToProps = {
  maybeFetchFaces, showNextFaces,
};

export default connect(mapStatesToProps, mapDispatchToProps)(InfiniteScrollGrid);
