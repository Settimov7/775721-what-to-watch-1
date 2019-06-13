import * as React from 'react';
import {shallow} from 'enzyme';

import {withActiveItem} from "./with-active-item";

const MockComponent = () => <div />;
const WrappedMockComponent = withActiveItem(MockComponent);
const WrappedMockComponentWithDefaultActiveItem = withActiveItem(MockComponent, `defaultActiveItem`);

it(`Should have correctly default active item without params`, () => {
  const props = {
    activeItem: `item`,
    onChange: jest.fn(),
  };
  const wrappedComponent = shallow(<WrappedMockComponent {...props}/>);

  expect(wrappedComponent.state().activeItem).toEqual(`item`);
});

it(`Should have correctly default active item from params`, () => {
  const props = {
    onChange: jest.fn(),
  };
  const wrappedComponent = shallow(<WrappedMockComponentWithDefaultActiveItem {...props}/>);

  expect(wrappedComponent.state().activeItem).toEqual(`defaultActiveItem`);
});

it(`Should change active item correctly`, () => {
  const props = {
    activeItem: `item`,
    onChange: jest.fn(),
  };
  const wrappedComponent = shallow(<WrappedMockComponent {...props}/>);

  wrappedComponent.instance()._setActiveItem(`newActiveItem`);
  wrappedComponent.update();

  expect(wrappedComponent.state().activeItem).toEqual(`newActiveItem`);
});
