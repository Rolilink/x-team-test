/*
 *  SortSelect Component
 *  Smart component responsible for switching the sort state of the app it calls
 *  changeSort when the select changes to dispatch a change in the sort field
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { changeSort } from '../actions';

class SortSelect extends Component {
  static propTypes = {
    changeSort: PropTypes.func.isRequired,
  }

  changeSort(e) {
    this.props.changeSort(e.target.value);
  }

  render() {
    return (
      <div className="form-group" style={{ paddingTop: '20px' }}>
        <label htmlFor="sort-select">Sort By:</label>
        <select name="sort-select" id="sort-select" className="form-control" onChange={(e) => { this.changeSort(e); }}>
          <option selected="id">ID</option>
          <option value="size">Size</option>
          <option value="price">Price</option>
        </select>
      </div>
    );
  }
}

const mapStatesToProps = state => ({ field: state.sort.field, isFetching: state.faces.isFetching });

const mapDispatchToProps = {
  changeSort,
};

export default connect(mapStatesToProps, mapDispatchToProps)(SortSelect);
