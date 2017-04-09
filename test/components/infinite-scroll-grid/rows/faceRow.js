/* global expect */
import { shallow } from 'enzyme';
import React from 'react';
import moment from 'moment';
import FaceRow from '../../../../src/app/js/components/infinite-scroll-grid/rows/faceRow';

const props = {
  id: '1',
  text: '( ︶︿︶)',
  size: 20,
  date: moment().subtract(2, 'days').toDate(),
  price: 100,
};

describe('<FaceRow/>', () => {
  const wrapper = shallow(<FaceRow {...props} />);

  it('should render a table row', () => {
    expect(wrapper).to.have.tagName('tr');
  });

  it('should have a class face-row', () => {
    expect(wrapper).to.have.className('face-row');
  });

  it('should render a face field with font-size = size', () => {
    expect(wrapper.find('.face-field')).to.have.text(props.text);
    expect(wrapper.find('.face-field')).to.have.style('font-size', '20px');
  });

  it('should render a size field on pixels', () => {
    expect(wrapper.find('.size-field')).to.have.text('20px');
  });

  it('should render a formatted price field on dollars', () => {
    expect(wrapper.find('.price-field')).to.have.text('$1.00');
  });

  it('should render days ago when date is less than a week', () => {
    expect(wrapper.find('.date-field')).to.have.text('2 days ago');
  });

  it('should render full date when date is equal or more than a week', () => {
    const weekProps = { ...props, date: moment().subtract(7, 'days').toDate() };
    const weekWrapper = shallow(<FaceRow {...weekProps} />);
    expect(weekWrapper.find('.date-field')).to.have.text(moment().subtract(7, 'days').format('MMMM Do YYYY'));
  });
});
