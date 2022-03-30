import React, { PureComponent } from 'react';
import styles from './details.module.css';

export default class Details extends PureComponent {
  render() {
    const {
      detailsContainer,
      leftSection,
      thumbnailList,
      thumbnail,
      image,
      rightSection,
      name,
      status,
      sizeContainer,
      size,
      sizeList,
      sizeItem,
      prizeContainer,
      prizeHeading,
      prize,
      addToCat,
      description,
    } = styles;
    return (
      <section className={detailsContainer}>
        <div className={leftSection}>
          <ul className={thumbnailList}>
            <li className={thumbnail}><img src="https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016108/product-image/2409L_61_b.jpg" alt="thumbnail" /></li>
            <li className={thumbnail}><img src="https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016108/product-image/2409L_61_b.jpg" alt="thumbnail" /></li>
            <li className={thumbnail}><img src="https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016108/product-image/2409L_61_b.jpg" alt="thumbnail" /></li>
          </ul>
          <img className={image} src="https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016108/product-image/2409L_61_b.jpg" alt="thumbnail" />
        </div>
        <div className={rightSection}>
          <h2 className={name}>Apollo</h2>
          <p className={status}>Running short</p>
          <div className={sizeContainer}>
            <h5 className={size}>Size:</h5>
            <ul className={sizeList}>
              <li className={sizeItem}>XL</li>
              <li className={sizeItem}>S</li>
              <li className={sizeItem}>M</li>
              <li className={sizeItem}>L</li>
            </ul>
          </div>
          <div className={prizeContainer}>
            <h5 className={prizeHeading}>Prize:</h5>
            <p className={prize}>$ 50.00</p>
          </div>
          <button className={addToCat} type="button">ADD TO CAT</button>
          <p className={description}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus
            illo voluptate aliquid molestiae accusantium sequi beatae placeat. Earum
            facilis deserunt laborum, accusantium est incidunt qui atque, expedita totam
            vel nemo?
          </p>
        </div>
      </section>
    );
  }
}
