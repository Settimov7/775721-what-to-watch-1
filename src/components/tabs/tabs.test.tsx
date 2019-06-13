import * as React from 'react';
import * as renderer from 'react-test-renderer';

import {Tabs} from './tabs';

const MockComponent = () => <div />;

it(`Tabs correctly renders`, () => {
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
    onChange: jest.fn(),
  };

  const tabs = renderer.create(
      <Tabs {...props}/>
  ).toJSON();

  expect(tabs).toMatchSnapshot();
});
