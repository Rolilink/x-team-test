import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux'

class App extends Component {
  render() {
    return(
      <div>
        Hello World
      </div>
    )
  }
}

App.propTypes = {

}

const mapStatesToProps = (state) => ({})
const mapDispatchToProps = {}

export default connect(mapStatesToProps, mapDispatchToProps)(App)
