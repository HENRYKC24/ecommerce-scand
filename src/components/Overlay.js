import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import OneCartItemMini from './CartItemMini';
import styles from './overlay.module.css';

export class Overlay extends PureComponent {
  render() {
    const { removeOverlay } = this.props;
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

    const { cart, activeCurrency } = this.props;

    const total = cart.reduce((total, item) => total + (item.prices.filter(
      (price) => price.currency.symbol === activeCurrency,
    )[0].amount * item.quantity), 0);

    return (
      <div role="button" tabIndex={0} onClick={removeOverlay} onKeyDown={removeOverlay} className={overlay}>
        <div role="button" tabIndex={0} onClick={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()} className={card}>
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
            {cart.map((each) => <OneCartItemMini key={Math.random()} data={each} />)}
          </ul>
          <div className={totalContainer}>
            <span><strong>Total</strong></span>
            <span>
              <strong>
                {activeCurrency}
                {' '}
                { total.toFixed(2) }
              </strong>
            </span>
          </div>
          <div className={buttonsContainer}>
            <NavLink onClick={removeOverlay} className={viewBagLink} exact="true" to="/cart">
              <button className={viewBag} type="button">
                View Bag
              </button>
            </NavLink>
            <button type="button" className={checkOut}>Check Out</button>
          </div>
        </div>
      </div>
    );
  }
}

Overlay.propTypes = {
  removeOverlay: PropTypes.func.isRequired,
  cart: PropTypes.instanceOf(Array).isRequired,
  activeCurrency: PropTypes.string.isRequired,
};

function mapStateToProps({ state }) {
  return state;
}

export default connect(mapStateToProps)(Overlay);
