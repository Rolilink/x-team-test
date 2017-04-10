import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import GridContainer from './gridContainer';
import GridHeader from './gridHeader';
import FaceRow from './rows/faceRow';
import { maybeFetchFaces } from '../../actions'

class InfiniteScrollGrid extends Component {
  static propTypes = {
    faces: PropTypes.array.isRequired,
    maybeFetchFaces: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.maybeFetchFaces();
  }

  get rows() {
    const { ads, faces, facesQtyBeforeEachAd } = this.props;
    let rows = [];
    let facesCount = 0;
    let facesAdded = 0;
    let adsCount = 0;

    while(facesAdded <= faces.length){
      rows.push({ type: 'ad', ads[adsCount] });
      facesAdded++;
      facesCount++;

      if (facesCount === facesQtyBeforeEachAd) {
        facesCount = 0;
        rows.push({ type: 'ad', ads[adsCount] });
        adsCount++;
      }
    }
  }

  getRows(rows) {

  }

  get gridItems() {
    return this.getRows(this.rows);
  }

  getFaceRow() {
    return _.map(this.props.faces, face => <FaceRow {...face} key={`row-face-${face.id}`} />);
  }

  getAdsRow() {

  }

  getLoadingRow() {

  }

  getEndRow() {

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
  const { visibleFaces, data } = state.faces;
  const faces = _.filter(data, face => _.includes(visibleFaces, face.id));
  return {
    faces,
  };
};
const mapDispatchToProps = {
  maybeFetchFaces,
};

export default connect(mapStatesToProps, mapDispatchToProps)(InfiniteScrollGrid);
