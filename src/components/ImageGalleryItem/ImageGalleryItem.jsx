// import PropTypes from 'prop-types';

import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ webformatURL, largeImageURL, tags, onClick }) => (
  <li className={css.ImageGalleryItem}>
    <img className={css.ImageGalleryItemImage} src={webformatURL} alt={tags} />
  </li>
);

export default ImageGalleryItem;
