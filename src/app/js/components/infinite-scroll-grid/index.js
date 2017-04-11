/*
 *  InfiniteScrollGrid Component
 *  An infinite table that fetches records as it scrolls, it shows a batch of records
 *  and when reaching the end of the batch it shows the next one until reaching the
 *  end of the records catalogue.
 *
 *  It prefetches records when it cans to get a performance boost, and shows a LoadingRow
 *  when all the pre-fetched records are shown and the app is fetching records from the server.
 *
 *  It shows an AdRow with a random Ad every 20 FaceRows, when reaching the end it shows an EndRow
 *  at the end of the list.
 */

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
    showNextFaces: PropTypes.func.isRequired,
    maybeFetchFaces: PropTypes.func.isRequired,
    fetchedAllFaces: PropTypes.bool.isRequired,
    faces: PropTypes.arrayOf(Object).isRequired,
    visibleFaces: PropTypes.arrayOf(Object).isRequired,
  }

  componentWillMount() {
    this.fetchAndMaybeShowFaces();
    this.setupScrollHandler();
  }

  componentWillUnmount() {
    this.removeScrollHandler();
  }

  // When scrolling down fetch faces and maybe show a next batch of faces in the list
  onScrollDown() {
    this.fetchAndMaybeShowFaces();
  }

  // Triggered when scrolling to the bottom of the document
  onDocumentBottom() {
    // show next batch of faces if not fetch new faces and maybe show the next batch
    if (!this.allFacesVisible) {
      this.props.showNextFaces();
    } else {
      this.fetchAndMaybeShowFaces();
    }
  }

  // Initializes the vertical scroll in the current scroll position and triggers
  // handleScroll method when the user scrolls.
  setupScrollHandler() {
    this.lastVerticalScroll = this.verticalScroll;
    window.addEventListener('scroll', this.handleScroll.bind(this));
  }

  // Removes the event listener when unmounting the component
  removeScrollHandler() {
    window.removeEventListener('scroll', this.handleScroll.bind(this));
  }

  // Gets the document height
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

  // Gets the current scroll position of the user
  get verticalScroll() {
    return window.scrollY + window.innerHeight;
  }

  // Is scroll position at the bottom of the document?
  get isScrollAtDocumentBottom() {
    return this.verticalScroll + 100 > this.documentHeight;
  }

  // All the batches of faces are been shown in the list?
  get allFacesVisible() {
    const { visibleFaces, faces } = this.props;
    return visibleFaces.length === faces.length;
  }

  // Fetches faces from the server and maybe shows next batch of faces
  fetchAndMaybeShowFaces() {
    this.props.maybeFetchFaces().then(() => {
      this.maybeShowNextFaces();
    });
  }

  // if there are pending batches of faces to show on the list and we scrolled
  // to the bottom of the list show the next batch of faces.
  maybeShowNextFaces() {
    if (!this.allFacesVisible && this.isScrollAtDocumentBottom) {
      this.props.showNextFaces();
    }
  }

  // App triggers this function any time the user scrolls
  handleScroll() {
    // first check if the user is scrolling down
    if (this.verticalScroll - this.lastVerticalScroll > 0) {
      this.onScrollDown();
    }

    // if the user is scrolling to the document bottom trigger on documentBottom
    if (this.isScrollAtDocumentBottom) {
      this.onDocumentBottom();
    }

    // save current scroll position as old one to check if user is scrolling down
    // on the next scroll event
    this.lastVerticalScroll = this.verticalScroll;
  }

  // returns the items that are going to be shown in the grid, every 20 faces
  // it shows an ad, at the end of the rows it appends a loading, and end of catalogue
  // if needed
  get gridItems() {
    const { faces, visibleFaces, isFetching, fetchedAllFaces } = this.props;
    const rows = [];
    let facesCount = 0;

    _.each(faces, (face) => {
      // If the faces is included in the batch of faces that should be shown in
      // the list append a FaceRow into the array
      if (_.includes(visibleFaces, face.id)) {
        rows.push(<FaceRow {...face} key={`face-row-${face.id}`} />);
        facesCount += 1;
      }

      // Every 20 Faces we should show an Ad
      if (facesCount === 20) {
        rows.push(<AdRow />);
        facesCount = 0;
      }
    });

    // When fetching show a loading message at the end of the list
    if (isFetching) {
      rows.push(<LoadingRow />);
      return rows;
    }

    // When all the records are fetched from the server show an end of catalogue message
    if (fetchedAllFaces) {
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
