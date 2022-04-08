import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import OneCartItemMini from './CartItemMini';
import CartCheckout from './Checkout';
import styles from './overlay.module.css';
import formatFigure from '../utils/formatFigure';

export class Overlay extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      checkout: false,
    };
  }

  render() {
    const {
      overlay,
      card,
      cartList,
      top,
      totalContainer,
      buttonsContainer,
      viewBagLink,
      viewBag,
      checkOut,
    } = styles;

    const {
      cart, activeCurrency, removeOverlay, setState,
    } = this.props;
    const { checkout } = this.state;

    let total = 0;
    if (cart[0]) {
      total = cart.reduce(
        (total, item) => total
          + item.prices.filter(
            (price) => price.currency.symbol === activeCurrency,
          )[0].amount
            * item.quantity,
        0,
      );
    }

    return (
      <div
        role="button"
        tabIndex={0}
        onClick={removeOverlay}
        onKeyDown={removeOverlay}
        className={overlay}
      >
        <div
          role="button"
          tabIndex={0}
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
          className={card}
        >
          <div className={top}>
            <span>
              <strong>My Bag:</strong>
              {' '}
            </span>
            <span>
              {cart.length}
              {' '}
              item
              {cart.length > 1 ? 's' : ''}
            </span>
          </div>
          <ul className={cartList}>
            {cart.reverse().map((each) => (
              <OneCartItemMini key={Math.random()} data={each} />
            ))}
          </ul>
          <div className={totalContainer}>
            <span>
              <strong>Total</strong>
            </span>
            <span>
              <strong>
                {activeCurrency}
                {' '}
                {formatFigure(total)}
              </strong>
            </span>
          </div>
          <div className={buttonsContainer}>
            <NavLink
              onClick={removeOverlay}
              className={viewBagLink}
              exact="true"
              to="/cart"
            >
              <button className={viewBag} type="button">
                View Bag
              </button>
            </NavLink>
            <button
              onClick={() => {
                if (cart.length > 0) {
                  setState();
                  this.setState({ checkout: true });
                  if (localStorage.getItem('data')) {
                    const data = JSON.parse(localStorage.getItem('data'));
                    const updatedData = {
                      ...data,
                      cart: [],
                    };
                    localStorage.setItem('data', JSON.stringify(updatedData));
                  }
                }
              }}
              type="button"
              className={checkOut}
            >
              Check Out
            </button>
          </div>
        </div>

        {checkout && (
          <CartCheckout />
        )}
      </div>
    );
  }
}

Overlay.propTypes = {
  removeOverlay: PropTypes.func.isRequired,
  setState: PropTypes.func.isRequired,
  cart: PropTypes.instanceOf(Array).isRequired,
  activeCurrency: PropTypes.string.isRequired,
};

function mapStateToProps({ state }) {
  return state;
}

export default connect(mapStateToProps)(Overlay);
