import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import state from './products/products';

const productsState = combineReducers({ state });

const store = createStore(productsState, applyMiddleware(thunk));

export default store;
