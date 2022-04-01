import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import data from '../assets/dummyData';
import styles from './category.module.css';
import noImage from '../assets/images/no_image.webp';
import { fetchCurrencies, fetchProducts } from '../redux/products/products';

class Category extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
    dispatch(fetchProducts());
  }

  addDefaultSrc = (e) => {
    e.target.src = noImage;
  }

  render() {
    const {
      listContainer, catName, listItems, listItem, image, dataName, amount, link,
    } = styles;

    const state = this.props;

    console.log(state, 'Category State......');

    return (
      <section className={listContainer}>
        <h3 className={catName}>Category Name</h3>
        <ul className={listItems}>
          {data.map((singleData) => (

            <li className={listItem} key={Math.random()}>
              <NavLink className={link} exact="true" to="/detail">
                <img
                  onError={this.addDefaultSrc}
                  className={image}
                  src={singleData.image}
                  alt={singleData.name}
                />
                <p className={dataName}>{singleData.name}</p>
                <p className={amount}>
                  <strong>
                    $
                    {' '}
                    {singleData.amount}
                  </strong>
                </p>
              </NavLink>
            </li>
          ))}
        </ul>
      </section>
    );
  }
}

Category.propTypes = {
  dispatch: PropTypes.func.isRequired,
  // activeCurrency: PropTypes.string.isRequired,
  // currencies: PropTypes.instanceOf(Array).isRequired,
  // categories: PropTypes.instanceOf(Array).isRequired,
};

function mapStateToProps({ state }) {
  return state;
}

export default connect(mapStateToProps)(Category);
