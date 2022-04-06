import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './checkout.module.css';
import { emptyCart } from '../redux/products/products';

export class Checkout extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      activeCurrency: '$',
    };
  }

  componentDidMount() {
    const { cart, activeCurrency } = this.props;

    const total = cart.reduce(
      (total, item) => total
          + item.prices.filter(
            (price) => price.currency.symbol === activeCurrency,
          )[0].amount
            * item.quantity,
      0,
    );
    this.setState({ total, activeCurrency });

    const { dispatch } = this.props;
    setTimeout(() => {
      dispatch(emptyCart([]));
    }, 1000);
  }

  render() {
    const { checkoutContainer, inner, amount } = styles;
    const { total, activeCurrency } = this.state;
    return (
      <div className={checkoutContainer}>
        <div className={inner}>
          <p>You have successfully checked out!</p>
          <div>
            <p>
              Total Amount:
              <strong className={amount}>
                {' '}
                {activeCurrency}
                {' '}
                {total.toLocaleString()}
              </strong>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

Checkout.propTypes = {
  cart: PropTypes.instanceOf(Object).isRequired,
  // history: PropTypes.instanceOf(Object).isRequired,
  activeCurrency: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  // total: PropTypes.number.isRequired,
};

function mapStateToProps({ state }) {
  return state;
}

export default connect(mapStateToProps)(Checkout);
