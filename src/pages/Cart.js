import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import OneCartItem from '../components/CartItem';
import styles from './cart.module.css';
import { removeFromCart } from '../redux/products/products';

class Cart extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
    };
  }

  componentDidMount() {
    const { cart } = this.props;
    this.setState({ cart });
  }

  render() {
    const {
      cartContainer,
      cartHeading,
      cartList,
      noProduct,
      noProductContainer,
    } = styles;

    const { cart } = this.state;

    return (
      <section className={cartContainer}>
        {cart.length > 0 ? (
          <>
            <p className={cartHeading}>Cart</p>
            <ul className={cartList}>
              {cart.map((each) => (
                <OneCartItem
                  key={Math.random()}
                  removeThisItemFromCart={() => {
                    const { dispatch } = this.props;
                    dispatch(removeFromCart(each.id));
                    setTimeout(() => {
                      const { cart } = this.props;
                      this.setState({ cart });
                    }, 50);
                  }}
                  itemId={each.id}
                  data={each}
                />
              ))}
            </ul>
          </>
        ) : (
          <div className={noProductContainer}>
            <p className={noProduct}>No product in the cart.</p>
          </div>
        )}
      </section>
    );
  }
}

Cart.propTypes = {
  cart: PropTypes.instanceOf(Array).isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps({ state }) {
  return state;
}

export default connect(mapStateToProps)(Cart);
