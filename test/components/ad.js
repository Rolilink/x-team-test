/* global expect */
import { shallow } from 'enzyme';
import React from 'react';
import Ad from '../../src/app/js/components/ad';

const props = {
  id: 232,
};

describe('<Ad/>', () => {
  const wrapper = shallow(<Ad {...props} />);

  it('should render an ad image', () => {
    expect(wrapper).to.have.tagName('img');
    expect(wrapper).to.have.prop('src', '/ad/?r=232');
  });
});
