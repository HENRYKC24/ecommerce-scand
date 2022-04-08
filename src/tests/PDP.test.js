import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from '../redux/configureStore';
import Details from '../pages/Details';

describe('Details unit test', () => {
  test('details is rendered in the DOM', () => {
    render(
      <Provider store={store}>
        <Router>
          <Details />
        </Router>
      </Provider>,
    );
    expect(screen.queryByTestId('details')).toBeDefined();
  });
});
