import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class App extends React.PureComponent {
  static propTypes = {}

  render() {
    return (
      <div>
        Hello World
      </div>
    );
  }
}

const mapStatesToProps = () => ({});
const mapDispatchToProps = {};

export default connect(mapStatesToProps, mapDispatchToProps)(App);
