import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import Cart from '../pages/Cart';
import store from '../redux/configureStore';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

it('Login renders the UI as expected', () => {
  const tree = renderer.create(
    <Provider store={store}>
      <Cart />
    </Provider>,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
