import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styles from './category.module.css';
import noImage from '../assets/images/no_image.webp';
import { addSelectedProduct, fetchCurrencies, fetchProducts } from '../redux/products/products';

class Category extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
    dispatch(fetchProducts());
  }

  updateReduxWithSelectedProduct = (product) => {
    const { dispatch } = this.props;
    dispatch(addSelectedProduct(product));
  }

  addDefaultSrc = (e) => {
    e.target.src = noImage;
  }

  render() {
    const {
      listContainer,
      catName,
      listItems,
      listItem,
      image,
      imageOut,
      dataName,
      amount,
      link,
      grey,
      outOfStock,
    } = styles;

    const state = this.props;
    const { all } = state.products;
    let currentProducts;
    let activeCurrency;
    let category;

    if (all[0]) {
      category = state.categories.filter((cat) => cat.active)[0].name;
      currentProducts = state.products[category.toLowerCase()];
      const currency = state.activeCurrency;
      activeCurrency = currency;
    }

    return (
      <section className={listContainer}>
        {all[0] ? (
          <>
            <h3 className={catName}>{category}</h3>
            <ul className={listItems}>
              {state.categories[0] ? currentProducts.map((singleData) => (

                <li className={`${listItem} ${singleData.inStock ? '' : grey}`} key={Math.random()}>
                  <NavLink onClick={() => this.updateReduxWithSelectedProduct(singleData)} className={link} exact="true" to="/detail">
                    <div className={imageOut}>
                      {!singleData.inStock && <p className={outOfStock}>OUT OF STOCK</p>}
                      <img
                        onError={this.addDefaultSrc}
                        className={image}
                        src={singleData.gallery[0]}
                        alt={singleData.name}
                      />
                    </div>
                    <p className={dataName}>{singleData.name}</p>
                    <p className={amount}>
                      <strong>
                        {activeCurrency}
                        {' '}
                        {singleData.prices.filter(
                          (price) => price.currency.symbol === activeCurrency,
                        )[0].amount}
                      </strong>
                    </p>
                  </NavLink>
                </li>
              )) : null}
            </ul>
          </>
        ) : null}
      </section>
    );
  }
}

Category.propTypes = {
  dispatch: PropTypes.func.isRequired,
  activeCurrency: PropTypes.string.isRequired,
  products: PropTypes.instanceOf(Array).isRequired,
  categories: PropTypes.instanceOf(Array).isRequired,
};

function mapStateToProps({ state }) {
  return state;
}

export default connect(mapStateToProps)(Category);
