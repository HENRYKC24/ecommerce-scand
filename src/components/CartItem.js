import React, { Component } from 'react';
import styles from './cartItem.module.css';

export class CartItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: 1,
    };
    this.moreItems = this.moreItems.bind(this);
    this.lessItems = this.lessItems.bind(this);
  }

  moreItems() {
    const { items } = this.state;
    this.setState({
      items: items + 1,
    });
  }

  lessItems() {
    const { items } = this.state;
    if (items === 1) return;
    this.setState({
      items: items - 1,
    });
  }

  render() {
    const {
      cartItem,
      left,
      name,
      status,
      prize,
      sizeList,
      sizeItem,
      right,
      buttonsContainer,
      button,
      itemCount,
      image,
    } = styles;

    const { items } = this.state;
    return (
      <li className={cartItem}>
        <div className={left}>
          <p className={name}>Apollo</p>
          <p className={status}>Running short</p>
          <p className={prize}>$ 50.00</p>
          <ul className={sizeList}>
            <li className={sizeItem}>XL</li>
            <li className={sizeItem}>S</li>
            <li className={sizeItem}>M</li>
            <li className={sizeItem}>L</li>
          </ul>
        </div>
        <div className={right}>
          <div className={buttonsContainer}>
            <button onClick={this.moreItems} className={button} type="button">+</button>
            <p className={itemCount}>{items}</p>
            <button onClick={this.lessItems} className={button} type="button">-</button>
          </div>
          <img className={image} src="https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016108/product-image/2409L_61_b.jpg" alt="Cart item" />
        </div>
      </li>
    );
  }
}

export default CartItem;
