import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class App extends Component {
  static propTypes = {}

  render() {
    return (
      <div className="container">
        <header>
            <h1 className="text-center">Discount Ascii Warehouse</h1>
            <p className="text-center">Here you're sure to find a bargain on some of the finest ascii available to purchase. Be sure to peruse our selection of ascii faces in an exciting range of sizes and prices.</p>
            <p className="text-center">But first, a word from our sponsors:</p>
            <img className="ad center-block img-thumbnail" src="/ad/?r=653" />
        </header>
        <table className="table">
          <thead>
            <tr>
              <th>Face</th>
              <th>Size</th>
              <th>Cost</th>
              <th>Date Added</th>
            </tr>
          </thead>
          <tbody>
            <tr className="face-row">
              <td className="face-field" style={{fontSize: '20px'}}>( ︶︿︶)</td>
              <td className="size-field">20px</td>
              <td className="cost-field">$2.32</td>
              <td className="date-field">3 days ago</td>
            </tr>
            <tr className="face-row">
              <td className="face-field" style={{fontSize: '20px'}}>( ︶︿︶)</td>
              <td className="size-field">20px</td>
              <td className="cost-field">$2.32</td>
              <td className="date-field">3 days ago</td>
            </tr>
            <tr className="ad-row">
              <td colSpan="4"><img className="ad center-block img-thumbnail" src="/ad/?r=653" /></td>
            </tr>
            <tr className="face-row">
              <td className="face-field" style={{fontSize: '30px'}}>( ﾟヮﾟ)</td>
              <td className="size-field">30px</td>
              <td className="cost-field">$2.32</td>
              <td className="date-field">3 days ago</td>
            </tr>
            <tr className="loading-row">
              <td colSpan="4" className="text-center">loading...</td>
            </tr>
            <tr className="end-row">
              <td colSpan="4" className="text-center">~ end of catalogue ~</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStatesToProps = () => ({});
const mapDispatchToProps = {};

export default connect(mapStatesToProps, mapDispatchToProps)(App);
