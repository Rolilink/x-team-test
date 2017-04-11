import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from './header';
import InfiniteScrollGrid from './infinite-scroll-grid';
import SortSelect from './sortSelect';

class App extends Component {
  static propTypes = {}

  render() {
    return (
      <div className="container">
        <Header />
        <SortSelect />
        <InfiniteScrollGrid />
      </div>
    );
  }
}

const mapStatesToProps = () => ({});
const mapDispatchToProps = {};

export default connect(mapStatesToProps, mapDispatchToProps)(App);
