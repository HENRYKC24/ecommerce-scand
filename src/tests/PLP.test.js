import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from '../redux/configureStore';
import Category from '../pages/Category';

describe('Homepage unit test', () => {
  test('homepage is rendered in the DOM', () => {
    render(
      <Provider store={store}>
        <Router>
          <Category />
        </Router>
      </Provider>,
    );
    expect(screen.queryByTestId('homepage')).toBeDefined();
  });
});
