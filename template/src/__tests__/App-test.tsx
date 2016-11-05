jest.mock('react-dom'); // To prevent issue of duplicate env. injection

import * as React from 'react';
import App from '../components/App';

let renderer =require('react-test-renderer'); //no typings available.

describe('App', () => {
  it('renders a welcome view', () => {
    
    const instance = renderer.create(<App />);
    const tree = instance.toJSON();
    expect(tree)["toMatchSnapshot"]();   
    
  });
});

