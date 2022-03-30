import React, { PureComponent } from 'react';
import styles from './header.module.css';
import appLogo from '../assets/images/logo.svg';
import cat from '../assets/images/cat.svg';
import up from '../assets/images/up.svg';
import down from '../assets/images/down.svg';

export default class Header extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currency: '$',
      menuOpen: false,
    };
    this.updateCurrency = this.updateCurrency.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggleMenuOpen = this.toggleMenuOpen.bind(this);
  }

  handleChange(event) {
    this.setState({ currency: event.target.value });
  }

  toggleMenuOpen() {
    const { menuOpen } = this.state;
    this.setState({
      menuOpen: !menuOpen,
    });
  }

  updateCurrency(curr) {
    this.setState({
      currency: curr,
    });
    this.toggleMenuOpen();
  }

  render() {
    const {
      navBar,
      navList,
      navItem,
      logo,
      currencyStyle,
      catCurrency,
      catStyle,
      numOfItemsInCat,
      active,
      dollarDiv,
      currencyArrow,
      currencyList,
      arrow,
    } = styles;

    const menuItems = [
      { text: 'WOMEN', active: true, id: 1 },
      { text: 'MEN', active: false, id: 2 },
      { text: 'KIDS', active: false, id: 3 },
    ];

    const { currency, menuOpen } = this.state;

    return (
      <nav className={navBar}>
        <ul className={navList}>
          {menuItems.map((item) => <li key={item.id} className={`${navItem} ${item.active ? active : ''}`}>{item.text}</li>)}
        </ul>
        <img className={logo} src={appLogo} alt="applogo" />
        <div className={catCurrency}>
          <div className={dollarDiv}>
            <div role="button" tabIndex={0} onClick={this.toggleMenuOpen} onKeyDown={() => this.toggleMenuOpen} className={currencyArrow}>
              <p className={currencyStyle}>{currency}</p>
              {menuOpen ? <img className={arrow} src={up} alt="up arrow" /> : <img className={arrow} src={down} alt="down arrow" />}
            </div>
            {menuOpen && (
            <div className={currencyList}>
              <button onClick={() => this.updateCurrency('$')} type="button">$ USD</button>
              <button onClick={() => this.updateCurrency('€')} type="button">&euro; EUR</button>
              <button onClick={() => this.updateCurrency('¥')} type="button">&yen; JPY</button>
            </div>
            )}
          </div>
          <div>
            <img className={catStyle} src={cat} alt="applogo" />
            <span className={numOfItemsInCat}>9</span>
          </div>
        </div>
      </nav>
    );
  }
}
