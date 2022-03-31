import React, { PureComponent } from 'react';
import OneCartItemMini from './CartItemMini';
import styles from './overlay.module.css';

export class Overlay extends PureComponent {
  render() {
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
      <div className={overlay}>
        <div className={card}>
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

export default Overlay;
