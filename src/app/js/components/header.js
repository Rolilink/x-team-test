/*
 *  Header Component
 *  Renders the app header with the site title, description and an ad.
 */
import React, { PureComponent } from 'react';
import Ad from './ad';

export default class Header extends PureComponent {
  render() {
    return (
      <header>
        <h1 className="text-center">Discount Ascii Warehouse</h1>
        <p className="text-center">Here you're sure to find a bargain on some of the finest ascii available to purchase. Be sure to peruse our selection of ascii faces in an exciting range of sizes and prices.</p>
        <p className="text-center">But first, a word from our sponsors:</p>
        <Ad id={653} />
      </header>
    );
  }
}
