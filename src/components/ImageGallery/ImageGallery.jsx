// import PropTypes from 'prop-types';

import css from './ImageGallery.module.css';

import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ items }) => {
  const elements = items.map(({ id, webformatURL, largeImageURL, tags }) => (
    <ImageGalleryItem
      key={id}
      webformatURL={webformatURL}
      largeImageURL={largeImageURL}
      tags={tags}
    />
  ));
  return <ul className={css.ImageGallery}>{elements}</ul>;
};

// ImageGallery.propTypes = {
//   items: PropTypes.arrayOf(PropTypes.object),
//   onClick: PropTypes.func.isRequired,
// };

ImageGallery.defaultProps = {
  items: [],
};

export default ImageGallery;
