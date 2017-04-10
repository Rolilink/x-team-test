/* global expect */
import { shallow } from 'enzyme';
import React from 'react';
import AdRow from '../../../../src/app/js/components/infinite-scroll-grid/rows/adRow';

const props = {
  id: 232,
};

describe('<AdRow/>', () => {
  const wrapper = shallow(<AdRow {...props} />);

  it('should render a table row', () => {
    expect(wrapper).to.have.tagName('tr');
  });

  it('should have a class ad-row', () => {
    expect(wrapper).to.have.className('ad-row');
  });
});
