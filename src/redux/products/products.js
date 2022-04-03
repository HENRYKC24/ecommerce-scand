import fetchData from '../../utils/fetchData';

const ADD_PRODUCTS = 'ecommerce_scandi/product/ADD_PRODUCTS';
const ADD_SELECTED_PRODUCT = 'ecommerce_scandi/product/ADD_SELECTED_PRODUCT';
const ADD_CURRENCIES = 'ecommerce_scandi/product/ADD_CURRENCIES';
const ADD_TO_CART = 'ecommerce_scandi/product/ADD_TO_CART';
const REMOVE_FROM_CART = 'ecommerce_scandi/product/REMOVE_FROM_CART';
const CHANGE_CURRENCY = 'ecommerce_scandi/product/CHANGE_CURRENCY';
const SET_ACTIVE_CATEGORY = 'ecommerce_scandi/product/SET_ACTIVE_CATEGORY';

// Create actions
export function addToCart(payload) {
  return { type: ADD_TO_CART, payload };
}

export function removeBook(payload) {
  return { type: REMOVE_FROM_CART, payload };
}

export function addProducts(payload) {
  return { type: ADD_PRODUCTS, payload };
}

export function addCurrencies(payload) {
  return { type: ADD_CURRENCIES, payload };
}

export function setActiveCategory(payload) {
  return { type: SET_ACTIVE_CATEGORY, payload };
}

export function changeCurrency(payload) {
  return { type: CHANGE_CURRENCY, payload };
}

export function addSelectedProduct(payload) {
  return { type: ADD_SELECTED_PRODUCT, payload };
}

const initialState = {
  categories: [],
  activeCategory: 'clothes',
  currencies: {},
  activeCurrency: '$',
  cart: [],
  products: {
    clothes: [],
    techs: [],
    all: [],
  },
  selectedProduct: {},
};

// Define reducer
export default function state(state = initialState, action = {}) {
  const {
    payload,
    type,
  } = action;
  const { cart } = state;
  switch (type) {
    case ADD_CURRENCIES:
      return { ...state, currencies: payload };
    case ADD_TO_CART:
      cart.push(payload);
      return { ...state, cart };
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: cart.fill((product) => product.id !== payload),
      };
    case ADD_PRODUCTS:
      return {
        ...state,
        products: payload.products,
        categories: payload.categories,
      };
    case CHANGE_CURRENCY:
      return { ...state, activeCurrency: payload };
    case ADD_SELECTED_PRODUCT:
      return { ...state, selectedProduct: payload };
    case SET_ACTIVE_CATEGORY:
      return {
        ...state,
        categories: state.categories.map((category) => {
          if (category.name.toLowerCase() === payload.toLowerCase()) {
            return { ...category, active: true };
          }
          return { ...category, active: false };
        }),
      };
    default:
      return state;
  }
}

export const fetchProducts = () => async (dispatch) => {
  const getProducts = `
    {
      categories {
        name
        products {
          id
          name
          inStock
          gallery
          prices {
            currency {
              label,
              symbol
            }
            amount
          }
          description
          attributes {
            name
            type
            items {
              displayValue,
              value,
              id
            }
          }
          brand
        }
      }
    }
  `;
  const result = await fetchData(getProducts);
  const { categories } = result.data;
  const [all, clothes, tech] = categories;

  dispatch(addProducts({
    products: { all: all.products, clothes: clothes.products, tech: tech.products },
    categories: [
      { name: clothes.name.toUpperCase(), id: 1, active: true },
      { name: tech.name.toUpperCase(), id: 2, active: false },
      { name: all.name.toUpperCase(), id: 3, active: false },
    ],
  }));
};

export const fetchCurrencies = () => async (dispatch) => {
  const getCurrencies = `
    {
      currencies {
        label
        symbol
      }
    }
  `;
  const result = await fetchData(getCurrencies);
  const { currencies } = result.data;
  dispatch(addCurrencies(currencies));
};
