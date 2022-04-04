import React, { PureComponent } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './details.module.css';
import { addToCart, removeFromCart } from '../redux/products/products';

class Details extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      content: [],
      buttonContent: 'ADD TO CART',
      info: '',
      display: false,
      queue: '',
      isSuccess: true,
    };
  }

  componentDidMount() {
    const {
      selectedProduct: {
        attributes, inStock, btnContent, id,
      },
      cart,
    } = this.props;
    const isInCart = cart.find((each) => each.id === id) !== undefined;
    const choices = [];
    choices.length = attributes.length;
    attributes.forEach((attribute, index) => {
      const { type, name } = attribute;
      choices[index] = { name, type, value: '' };
    });
    this.setState({ content: choices });
    if (isInCart) {
      this.changeButtonContent('REMOVE ITEM');
    } else {
      this.changeButtonContent(inStock ? btnContent : 'OUT OF STOCK');
    }
  }

  addProductToCart = (product) => {
    const { dispatch } = this.props;
    dispatch(addToCart(product));
  };

  removeProductFromCart = (id) => {
    const { dispatch } = this.props;
    dispatch(removeFromCart(id));
  };

  showStatus = (text, minutes, isSuccess) => {
    const { queue } = this.state;
    clearTimeout(queue);
    this.setState({ info: text, display: true, isSuccess });
    const cancel = setTimeout(() => {
      this.setState({ display: false, isSuccess: false });
    }, minutes * 1000);
    this.setState({ queue: cancel });
  };

  setSelectedValue = (index, value) => {
    const {
      state: { content },
    } = this;
    const updatedContent = content.map((eachChoice, ind) => {
      if (index === ind) {
        const updatedChoice = {
          ...eachChoice,
        };
        updatedChoice.value = value;
        return updatedChoice;
      }
      return eachChoice;
    });
    this.setState({ content: updatedContent });
  };

  changeButtonContent = (text) => {
    this.setState({ buttonContent: text });
  };

  render() {
    const {
      statusBar,
      success,
      failure,
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
      remove,
      descriptionStyle,
      pointer,
      greyedOut,
    } = styles;

    const { selectedProduct, activeCurrency, cart } = this.props;

    const {
      attributes,
      brand,
      description,
      gallery,
      inStock,
      name,
      id,
      prices,
    } = selectedProduct;

    const isInCart = cart.find((each) => each.id === id) !== undefined;
    const {
      buttonContent, info, display, isSuccess,
    } = this.state;

    return (
      <section className={detailsContainer}>
        <p
          className={`${statusBar} ${isSuccess ? success : failure}`}
          style={{
            display: display ? 'block' : 'none',
            padding: display ? '5px' : '0',
          }}
        >
          {info}
        </p>
        <div className={leftSection}>
          <ul className={thumbnailList}>
            {gallery.map((picture) => (
              <li key={Math.random()} className={thumbnail}>
                <img src={picture} alt="thumbnail" />
              </li>
            ))}
          </ul>
          <img className={image} src={gallery[0]} alt="thumbnail" />
        </div>
        <div className={rightSection}>
          <h2 className={nameStyle}>{name}</h2>
          <p className={status}>{brand}</p>
          {attributes.map((attr, index) => {
            const { name, type, items } = attr;
            const isSwatch = type === 'swatch';
            return (
              <div key={Math.random()} className={sizeContainer}>
                <h5 className={size}>
                  {name}
                  :
                </h5>
                <div className={sizeList}>
                  {items.map((item) => {
                    const { content } = this.state;
                    const currentChoices = content[index] || { value: '*****' };
                    const currentValue = currentChoices.value;
                    const isSelected = currentValue === item.value;
                    return (
                      <button
                        type="button"
                        onClick={() => this.setSelectedValue(index, item.value)}
                        key={Math.random()}
                        style={{ backgroundColor: isSwatch ? item.value : '' }}
                        className={`${sizeItem} ${isSelected ? '' : pointer} ${
                          isSelected ? '' : greyedOut
                        }`}
                      >
                        {isSwatch ? '' : item.value}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
          <div className={prizeContainer}>
            <h5 className={prizeHeading}>Prize:</h5>
            <p className={prize}>
              {activeCurrency}
              {' '}
              {
                prices.filter(
                  (price) => price.currency.symbol === activeCurrency,
                )[0].amount
              }
            </p>
          </div>
          <button
            className={`${isInCart && inStock && remove} ${
              inStock && !isInCart && addToCat
            } ${!inStock && addToCat2}`}
            type="button"
            onClick={
              !isInCart && inStock
                ? () => {
                  const { content } = this.state;
                  if (!content.every((each) => each.value !== '')) {
                    const notSelected = content.filter((each) => each.value === '');
                    const names = notSelected.map((each) => each.name);
                    const len = names.length;
                    let namesString = 'Please, select one of the options under ';
                    names.forEach((name, index) => {
                      if (index + 1 < len && len - index > 2) {
                        namesString += `"${name}", `;
                      } else if (index + 1 < len && len - index === 2) {
                        namesString += `"${name}" and `;
                      } else if (index + 1 === len) {
                        namesString += `"${name}" attribute${len > 1 ? 's' : ''}.`;
                      }
                    });
                    this.showStatus(namesString, 5, false);
                    return false;
                  }
                  const {
                    brand, id, name, prices,
                  } = selectedProduct;
                  const cartItem = {
                    id,
                    name,
                    brand,
                    prices,
                    choices: content,
                  };
                  this.addProductToCart(cartItem);
                  this.changeButtonContent('REMOVE ITEM');
                  this.showStatus('Product successfully added to cart!', 3, true);
                  return true;
                }
                : () => {
                  if (inStock) {
                    const { id } = selectedProduct;
                    this.removeProductFromCart(id);
                    this.changeButtonContent('ADD TO CART');
                    this.showStatus(
                      'Product successfully removed from cart!',
                      3,
                      true,
                    );
                  }
                }
            }
          >
            {buttonContent}
          </button>
          <div
            className={descriptionStyle}
            dangerouslySetInnerHTML={{ __html: description }}
          />
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
  dispatch: propTypes.func.isRequired,
  activeCurrency: propTypes.string.isRequired,
  cart: propTypes.instanceOf(Array).isRequired,
};

export default connect(mapStateToProps)(Details);
