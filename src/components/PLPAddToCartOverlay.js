import React, { PureComponent } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './PLPAddToCartOverlay.module.css';
import {
  addToCart,
  removeFromCart,
} from '../redux/products/products';

class PLPAddToCartOverlay extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      content: [],
      buttonContent: 'ADD TO CART',
      info: '',
      display: false,
      queue: '',
      isSuccess: true,
      isInCart: false,
    };
  }

  componentDidMount() {
    const {
      selectedProduct: { attributes },
    } = this.props;
    const choices = [];
    choices.length = attributes.length;
    attributes.forEach((attribute, index) => {
      const { type, name } = attribute;
      choices[index] = { name, type, value: '' };
    });
    this.setState({ content: choices });
  }

  checkProductInCart = (allChoices) => {
    const {
      selectedProduct: { inStock, btnContent, id },
      cart,
    } = this.props;

    const isInCart = cart.find((each) => {
      const attributesString = allChoices
        .map((choice) => choice.value)
        .join('');
      return each.id === id + attributesString;
    }) !== undefined;

    this.setState({ isInCart });

    if (isInCart) {
      this.changeButtonContent('REMOVE ITEM');
    } else {
      this.changeButtonContent(inStock ? btnContent : 'OUT OF STOCK');
    }
  };

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

    const allAreSelected = updatedContent.every((each) => each.value !== '');

    if (allAreSelected) {
      this.checkProductInCart(updatedContent);
    }

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
      inner,
      rightSection,
      sizeContainer,
      size,
      sizeList,
      sizeItem,
      addToCart,
      addToCart2,
      remove,
      pointer,
      greyedOut,
    } = styles;

    const { selectedProduct, setState } = this.props;

    const { attributes, inStock } = selectedProduct;

    const { isInCart } = this.state;
    const {
      buttonContent, info, display, isSuccess,
    } = this.state;

    return (
      <section
        role="button"
        tabIndex={0}
        onKeyDown={() => setState()}
        onClick={() => setState()}
        className={detailsContainer}
      >
        <div
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
          className={inner}
        >
          <p
            className={`${statusBar} ${isSuccess ? success : failure}`}
            style={{
              display: display ? 'block' : 'none',
              padding: display ? '5px' : '0',
            }}
          >
            {info}
          </p>
          <div className={rightSection}>
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
                      const currentChoices = content[index] || {
                        value: '*****',
                      };
                      const currentValue = currentChoices.value;
                      const isSelected = currentValue === item.value;
                      return (
                        <button
                          type="button"
                          onClick={() => this.setSelectedValue(index, item.value)}
                          key={Math.random()}
                          style={{
                            backgroundColor: isSwatch ? item.value : '',
                          }}
                          className={`${sizeItem} ${
                            isSelected ? '' : pointer
                          } ${isSelected ? '' : greyedOut}`}
                        >
                          {isSwatch ? '' : item.value}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
            <button
              className={`${isInCart && inStock && remove} ${
                inStock && !isInCart && addToCart
              } ${!inStock && addToCart2}`}
              type="button"
              onClick={
                !isInCart && inStock
                  ? () => {
                    const { content } = this.state;
                    if (!content.every((each) => each.value !== '')) {
                      const notSelected = content.filter(
                        (each) => each.value === '',
                      );
                      const names = notSelected.map((each) => each.name);
                      const len = names.length;
                      let namesString = 'Please, select one of the options under ';
                      names.forEach((name, index) => {
                        if (index + 1 < len && len - index > 2) {
                          namesString += `"${name}", `;
                        } else if (index + 1 < len && len - index === 2) {
                          namesString += `"${name}", and `;
                        } else if (index + 1 === len) {
                          namesString += `"${name}" attribute${
                            len > 1 ? 's' : ''
                          }.`;
                        }
                      });
                      this.showStatus(namesString, 5, false);
                      return false;
                    }
                    const {
                      brand, id, name, prices, gallery,
                    } = selectedProduct;
                    const attributesString = content
                      .map((choice) => choice.value)
                      .join('');
                    const cartItem = {
                      id: `${id}${attributesString}`,
                      name,
                      brand,
                      prices,
                      choices: content,
                      image: gallery[0],
                      quantity: 1,
                    };
                    this.addProductToCart(cartItem);
                    this.setState({ isInCart: true });
                    this.changeButtonContent('REMOVE ITEM');
                    this.showStatus(
                      'Product successfully added to cart!',
                      3,
                      true,
                    );
                    return true;
                  }
                  : () => {
                    if (inStock) {
                      const { id } = selectedProduct;
                      const { content } = this.state;
                      const attributesString = content
                        .map((choice) => choice.value)
                        .join('');
                      this.removeProductFromCart(id + attributesString);
                      this.setState({ isInCart: false });
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
          </div>
        </div>
      </section>
    );
  }
}

function mapStateToProps({ state }) {
  return state;
}

PLPAddToCartOverlay.propTypes = {
  selectedProduct: propTypes.func.isRequired,
  dispatch: propTypes.func.isRequired,
  setState: propTypes.func.isRequired,
  cart: propTypes.instanceOf(Array).isRequired,
};

export default connect(mapStateToProps)(PLPAddToCartOverlay);
