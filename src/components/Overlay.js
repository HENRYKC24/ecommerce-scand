import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
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
      viewBag,
      checkOut,
    } = styles;
    return (
      <div role="button" tabIndex={0} onClick={removeOverlay} onKeyDown={removeOverlay} className={overlay}>
        <div role="button" tabIndex={0} onClick={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()} className={card}>
          <div className={top}>
            <span>
              <strong>My Bag:</strong>
              {' '}
            </span>
            <span>2 items</span>
          </div>
          <ul className={cartList}>
            <OneCartItemMini />
            <OneCartItemMini />
            <OneCartItemMini />
            <OneCartItemMini />
            <OneCartItemMini />
            <OneCartItemMini />
          </ul>
          <div className={totalContainer}>
            <span><strong>Total</strong></span>
            <span><strong>$ 200.00</strong></span>
          </div>
          <div className={buttonsContainer}>
            <button type="button" className={viewBag}>View Bag</button>
            <button type="button" className={checkOut}>Check Out</button>
          </div>
        </div>
      </div>
    );
  }
}

Overlay.defaultProps = {
  removeOverlay: () => {},
};

Overlay.propTypes = {
  removeOverlay: PropTypes.func,
};

export default Overlay;
