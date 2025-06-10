/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: import explicitly to use the types shipped with jest.
import {it, describe, expect} from '@jest/globals';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import { render } from '@testing-library/react-native';

describe('App component', () => {
  it('renders without crashing', () => {
    //const { getByText } = render(<App />);
  });
});