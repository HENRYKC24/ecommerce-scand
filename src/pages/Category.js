import React, { PureComponent } from 'react';
import data from '../assets/dummyData';
import styles from './category.module.css';
import noImage from '../assets/images/no_image.webp';

class Category extends PureComponent {
  addDefaultSrc = (e) => {
    e.target.src = noImage;
  }

  render() {
    const {
      listContainer, catName, listItems, listItem, image, dataName, amount,
    } = styles;
    return (
      <section className={listContainer}>
        <h3 className={catName}>Category Name</h3>
        <ul className={listItems}>
          {data.map((singleData) => (
            <li className={listItem} key={Math.random()}>
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
            </li>
          ))}
        </ul>
      </section>
    );
  }
}

export default Category;
