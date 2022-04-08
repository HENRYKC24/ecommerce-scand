import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './cartItem.module.css';
import { updateProductQuantity } from '../redux/products/products';
import formatFigure from '../utils/formatFigure';

export class CartItem extends Component {
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
      remove,
      itemCount,
      imageStyle,
      secondWord,
    } = styles;

    const {
      data: {
        name, brand, prices, choices, image, id,
      },
      activeCurrency,
      cart,
      removeThisItemFromCart,
      itemId,
    } = this.props;
    const currentProduct = cart.filter((each) => each.id === itemId)[0];

    let quant;
    if (currentProduct) {
      const { quantity } = currentProduct;
      quant = quantity;
    }

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
              removeThisItemFromCart();
            }}
            className={remove}
            type="button"
          >
            Remove
            <span className={secondWord}>
              {' '}
              Item
              {quant > 1 && 's'}
            </span>

          </button>
        </div>
        <div className={right}>
          <div className={buttonsContainer}>
            <button
              onClick={() => {
                const { id } = currentProduct;
                return this.updateQuantity(id, 'add');
              }}
              className={button}
              type="button"
            >
              +
            </button>
            <p className={itemCount}>{quant}</p>
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

CartItem.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  cart: PropTypes.instanceOf(Array).isRequired,
  activeCurrency: PropTypes.string.isRequired,
  itemId: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  removeThisItemFromCart: PropTypes.func.isRequired,
};

function mapStateToProps({ state }) {
  return state;
}

export default connect(mapStateToProps)(CartItem);
