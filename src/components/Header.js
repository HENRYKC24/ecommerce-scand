import React, { PureComponent } from 'react';
import styles from './header.module.css';
import appLogo from '../assets/images/logo.svg';
import cat from '../assets/images/cat.svg';

export default class Header extends PureComponent {
  render() {
    const {
      navBar, navList, navItem, logo, currency, catCurrency, catStyle, numOfItemsInCat,
    } = styles;
    return (
      <nav className={navBar}>
        <ul className={navList}>
          <li className={navItem}>WOMEN</li>
          <li className={navItem}>MEN</li>
          <li className={navItem}>KIDS</li>
        </ul>
        <img className={logo} src={appLogo} alt="applogo" />
        <div className={catCurrency}>
          <select className={currency} name="currency" id="currency">
            <option value="$" hidden>$</option>
          </select>
          <div>
            <img className={catStyle} src={cat} alt="applogo" />
            <span className={numOfItemsInCat}>9</span>
          </div>
        </div>
      </nav>
    );
  }
}
