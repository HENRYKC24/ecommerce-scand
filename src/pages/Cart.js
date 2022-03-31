import React, { PureComponent } from 'react';
// import { useQuery } from 'react-query';
import OneCartItem from '../components/CartItem';
import styles from './cart.module.css';

class Cart extends PureComponent {
  render() {
    const {
      cartContainer,
      cartHeading,
      cartList,
    } = styles;

    return (
      <section className={cartContainer}>
        <p className={cartHeading}>Cart</p>
        <ul className={cartList}>
          <OneCartItem />
          <OneCartItem />
          <OneCartItem />
          <OneCartItem />
          <OneCartItem />
          <OneCartItem />
        </ul>
      </section>
    );
  }
}

export default Cart;
