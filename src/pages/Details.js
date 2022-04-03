import React, { PureComponent } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './details.module.css';

class Details extends PureComponent {
  render() {
    const {
      detailsContainer,
      leftSection,
      thumbnailList,
      thumbnail,
      image,
      rightSection,
      nameStyle,
      status,
      sizeContainer,
      size,
      sizeList,
      sizeItem,
      prizeContainer,
      prizeHeading,
      prize,
      addToCat,
      descriptionStyle,
      grey,
    } = styles;

    const { selectedProduct, activeCurrency } = this.props;
    const {
      attributes,
      brand,
      description,
      gallery,
      // id,
      inStock,
      name,
      prices,
    } = selectedProduct;
    console.log(selectedProduct, 'state from details');
    return (
      <section className={detailsContainer}>
        <div className={leftSection}>
          <ul className={thumbnailList}>
            {gallery.map(
              (picture) => <li key={Math.random()} className={thumbnail}><img src={picture} alt="thumbnail" /></li>,
            )}
          </ul>
          <img className={`${image} ${inStock ? grey : ''}`} src={gallery[0]} alt="thumbnail" />
        </div>
        <div className={rightSection}>
          <h2 className={nameStyle}>{name}</h2>
          <p className={status}>{brand}</p>
          { attributes.map((attr) => (
            <div key={Math.random()} className={sizeContainer}>
              <h5 className={size}>
                {attr.name}
                :
              </h5>
              <ul className={sizeList}>
                <li className={sizeItem}>XL</li>
                <li className={sizeItem}>S</li>
                <li className={sizeItem}>M</li>
                <li className={sizeItem}>L</li>
              </ul>
            </div>
          ))}
          <div className={prizeContainer}>
            <h5 className={prizeHeading}>Prize:</h5>
            <p className={prize}>
              {activeCurrency}
              {' '}
              {prices.filter(
                (price) => price.currency.symbol === activeCurrency,
              )[0].amount}
            </p>
          </div>
          <button className={addToCat} type="button">ADD TO CAT</button>
          <div className={descriptionStyle} dangerouslySetInnerHTML={{ __html: description }} />
        </div>
      </section>
    );
  }
}

function mapStateToProps({ state }) {
  return state;
}

Details.propTypes = {
  selectedProduct: propTypes.func.isRequired,
  activeCurrency: propTypes.string.isRequired,
};

export default connect(mapStateToProps)(Details);
