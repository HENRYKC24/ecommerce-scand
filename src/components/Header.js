import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './header.module.css';
import appLogo from '../assets/images/logo.svg';
import cat from '../assets/images/cat.svg';
import up from '../assets/images/up.svg';
import down from '../assets/images/down.svg';
import ImportedOverlay from './Overlay';
// import fetchData from '../utils/fetchData';
import { changeCurrency, fetchCurrencies, fetchProducts } from '../redux/products/products';

class Header extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
      overlayOpen: false,
    };
    this.toggle = this.toggle.bind(this);
    this.toggleMenuOpen = this.toggleMenuOpen.bind(this);
    this.toggleOverlayOpen = this.toggleOverlayOpen.bind(this);
    this.handleBodyScroll = this.handleBodyScroll.bind(this);
  }

  async componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
    dispatch(fetchProducts());
  }

  handleBodyScroll() {
    const { overlayOpen } = this.state;
    const { stopScrolling } = styles;
    if (overlayOpen) {
      document.body.classList.remove(stopScrolling);
    } else {
      document.body.classList.add(stopScrolling);
    }
  }

  toggleMenuOpen() {
    const { menuOpen } = this.state;
    this.setState({
      menuOpen: !menuOpen,
    });
  }

  toggleOverlayOpen() {
    const { overlayOpen } = this.state;
    this.setState({
      overlayOpen: !overlayOpen,
    });
    this.handleBodyScroll();
  }

  toggle() {
    this.toggleMenuOpen();
  }

  render() {
    const {
      header,
      navBar,
      navList,
      navItem,
      logo,
      currencyStyle,
      catCurrency,
      cartStyle,
      numOfItemsInCat,
      active,
      dollarDiv,
      currencyArrow,
      currencyList,
      arrow,
      catWrapper,
    } = styles;

    const menuItems = [
      { text: 'WOMEN', active: true, id: 1 },
      { text: 'MEN', active: false, id: 2 },
      { text: 'KIDS', active: false, id: 3 },
    ];

    const {
      menuOpen, overlayOpen,
    } = this.state;

    const state = this.props;

    const { dispatch } = this.props;

    return (
      <section className={header}>
        <nav className={navBar}>
          <ul className={navList}>
            {menuItems.map((item) => <li key={item.id} className={`${navItem} ${item.active ? active : ''}`}>{item.text}</li>)}
          </ul>
          <img className={logo} src={appLogo} alt="applogo" />
          <div className={catCurrency}>
            <div className={dollarDiv}>
              <div role="button" tabIndex={0} onClick={this.toggleMenuOpen} onKeyDown={() => this.toggleMenuOpen} className={currencyArrow}>
                <p className={currencyStyle}>{state.activeCurrency}</p>
                {menuOpen ? <img className={arrow} src={up} alt="up arrow" /> : <img className={arrow} src={down} alt="down arrow" />}
              </div>
              {menuOpen && (
              <div className={currencyList}>
                {state.currencies.map((currency) => (
                  <button
                    key={Math.random()}
                    onClick={() => {
                      dispatch(changeCurrency(currency.symbol));
                      this.toggle();
                    }}
                    type="button"
                  >
                    {currency.symbol}
                    {' '}
                    {currency.label}
                  </button>
                ))}
              </div>
              )}
            </div>
            <div>
              <div className={catWrapper} role="button" tabIndex={0} onClick={this.toggleOverlayOpen} onKeyDown={() => this.toggleOverlayOpen}>
                <img className={cartStyle} src={cat} alt="applogo" />
              </div>
              <span className={numOfItemsInCat}>9</span>
            </div>
          </div>
        </nav>
        {overlayOpen && (
        <ImportedOverlay
          removeOverlay={() => {
            this.setState({ overlayOpen: false });
            this.handleBodyScroll();
          }}
        />
        )}
      </section>
    );
  }
}

function mapStateToProps({ state }) {
  return state;
}

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
  activeCurrency: PropTypes.string.isRequired,
  currencies: PropTypes.instanceOf(Array).isRequired,
};

export default connect(mapStateToProps)(Header);
