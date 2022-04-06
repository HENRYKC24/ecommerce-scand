import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeFromCart, updateProductQuantity } from '../redux/products/products';
import styles from './cartItemMini.module.css';
import formatFigure from '../utils/formatFigure';

export class CartItemMini extends PureComponent {
  updateQuantity = (id, type) => {
    const { cart, dispatch } = this.props;
    const currentProduct = cart.filter((each) => each.id === id)[0];
    const { quantity } = currentProduct;
    if (type === 'add') {
      dispatch(updateProductQuantity({ id, quantity: quantity + 1 }));
    } else {
      if (quantity === 1) return;
      dispatch(updateProductQuantity({ id, quantity: quantity - 1 }));
    }
  };

  render() {
    const {
      cartItem,
      left,
      nameStyle,
      status,
      prize,
      sizeList,
      sizeItem,
      right,
      buttonsContainer,
      button,
      itemCount,
      imageStyle,
      removeBtn,
    } = styles;

    const {
      data: {
        name, brand, prices, choices, image, id,
      },
      activeCurrency,
      cart,
    } = this.props;

    const currentProduct = cart.filter((each) => each.id === id)[0];
    const { quantity } = currentProduct;
    return (
      <li className={cartItem}>
        <div className={left}>
          <p className={nameStyle}>{name}</p>
          <p className={status}>{brand}</p>
          <p className={prize}>
            {activeCurrency}
            {' '}
            {
              formatFigure(
                prices.filter(
                  (price) => price.currency.symbol === activeCurrency,
                )[0].amount,
              )
            }
          </p>
          <ul className={sizeList}>
            {choices.map((choice) => {
              const { value, type } = choice;
              const notSwart = type !== 'swatch';
              return (
                <li
                  style={{ backgroundColor: notSwart ? '' : value }}
                  key={Math.random()}
                  className={sizeItem}
                >
                  {notSwart ? value : ''}
                </li>
              );
            })}
          </ul>
          <button
            onClick={() => {
              const { dispatch } = this.props;
              dispatch(removeFromCart(currentProduct.id));
            }}
            className={removeBtn}
            type="button"
          >
            Remove

          </button>
        </div>
        <div className={right}>
          <div className={buttonsContainer}>
            <button
              onClick={() => this.updateQuantity(id, 'add')}
              className={button}
              type="button"
            >
              +
            </button>
            <p className={itemCount}>{quantity}</p>
            <button
              onClick={() => this.updateQuantity(id, 'subtract')}
              className={button}
              type="button"
            >
              -
            </button>
          </div>
          <img className={imageStyle} src={image} alt="Cart item" />
        </div>
      </li>
    );
  }
}

CartItemMini.propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  cart: PropTypes.instanceOf(Array).isRequired,
  activeCurrency: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps({ state }) {
  return state;
}

export default connect(mapStateToProps)(CartItemMini);
