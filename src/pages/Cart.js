import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import OneCartItem from '../components/CartItem';
import styles from './cart.module.css';

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
    const { cartContainer, cartHeading, cartList } = styles;

    const { cart } = this.state;

    return (
      <section className={cartContainer}>
        <p className={cartHeading}>Cart</p>
        <ul className={cartList}>
          {cart.map((each) => (
            <OneCartItem key={Math.random()} data={each} />
          ))}
        </ul>
      </section>
    );
  }
}

Cart.propTypes = {
  cart: PropTypes.instanceOf(Array).isRequired,
};

function mapStateToProps({ state }) {
  return state;
}

export default connect(mapStateToProps)(Cart);
