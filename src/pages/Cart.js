import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import OneCartItem from '../components/CartItem';
import styles from './cart.module.css';
import { changeReduxStateToLocalData, removeFromCart } from '../redux/products/products';

class Cart extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
    };
  }

  componentDidMount() {
    const { cart, dispatch } = this.props;
    if (localStorage.getItem('data')) {
      const data = JSON.parse(localStorage.getItem('data'));
      dispatch(changeReduxStateToLocalData(data));
      this.setState(data.cart);
    } else {
      this.setState({ cart });
    }
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
    let useableCart = cart;
    if (localStorage.getItem('data')) {
      const data = JSON.parse(localStorage.getItem('data'));
      useableCart = data.cart;
    }

    return (
      <section className={cartContainer}>
        {useableCart.length > 0 ? (
          <>
            <p className={cartHeading}>Cart</p>
            <ul className={cartList}>
              {useableCart.reverse().map((each) => (
                <OneCartItem
                  key={Math.random()}
                  removeThisItemFromCart={() => {
                    const { dispatch } = this.props;
                    dispatch(removeFromCart(each.id));
                    setTimeout(() => {
                      const { cart } = this.props;
                      this.setState({ cart });
                    }, 50);
                    if (localStorage.getItem('data')) {
                      const data = JSON.parse(localStorage.getItem('data'));
                      const updatedData = {
                        ...data,
                        cart: data.cart.filter((item) => item.id !== each.id),
                      };
                      localStorage.setItem('data', JSON.stringify(updatedData));
                    }
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
