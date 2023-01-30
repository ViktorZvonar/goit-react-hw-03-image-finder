// import PropTypes from 'prop-types';

import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ items }) => {
  return (
    <ul className="gallery">
      {items.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
          tags={tags}
        />
      ))}
    </ul>
  );
};

// ImageGallery.propTypes = {
//   items: PropTypes.arrayOf(PropTypes.object),
//   onClick: PropTypes.func.isRequired,
// };

ImageGallery.defaultProps = {
  items: [],
};

export default ImageGallery;
