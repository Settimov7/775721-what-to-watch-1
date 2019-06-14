import * as React from 'react';
import {shallow} from 'enzyme';

import {Tabs} from './tabs';

const MockComponent = () => <div />;

it(`Tabs items correctly triggered click event`, () => {
  const onChange = jest.fn();
  const props = {
    tabs: [
      {
        title: `Tab 1`,
        component: <MockComponent />,
      },
      {
        title: `Tab 2`,
        component: <MockComponent />,
      },
      {
        title: `Tab 3`,
        component: <MockComponent />,
      },
    ],
    activeItem: 0,
    onChange,
  };

  const tabs = shallow(<Tabs {...props}/>);
  const navigationItems = tabs.find(`.movie-nav__link`);

  navigationItems.forEach((navigationItem) => navigationItem.simulate(`click`, {preventDefault() {}}));

  expect(onChange).toHaveBeenCalledTimes(props.tabs.length);
});
