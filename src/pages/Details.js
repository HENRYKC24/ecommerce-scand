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
      addToCat2,
      descriptionStyle,
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
          <img className={image} src={gallery[0]} alt="thumbnail" />
        </div>
        <div className={rightSection}>
          <h2 className={nameStyle}>{name}</h2>
          <p className={status}>{brand}</p>
          { attributes.map((attr) => {
            const { name, type, items } = attr;
            const isSwatch = type === 'swatch';
            return (
              <div key={Math.random()} className={sizeContainer}>
                <h5 className={size}>
                  {name}
                  :
                </h5>
                <ul className={sizeList}>
                  {items.map((item) => (
                    <li
                      key={Math.random()}
                      style={{ backgroundColor: isSwatch ? item.value : '' }}
                      className={sizeItem}
                    >
                      { isSwatch ? '' : item.value }
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
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
          <button style={{ opacity: inStock ? '' : 0.5 }} className={inStock ? addToCat : addToCat2} type="button">{inStock ? 'ADD TO CAT' : 'OUT OF STOCK'}</button>
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
