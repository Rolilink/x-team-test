/*
 *  App Component
 *  The Root component it renders the Header, Sorting Select and the Grid
 */

import React, { PureComponent } from 'react';
import Header from './header';
import InfiniteScrollGrid from './infinite-scroll-grid';
import SortSelect from './sortSelect';

export default class App extends PureComponent {
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
