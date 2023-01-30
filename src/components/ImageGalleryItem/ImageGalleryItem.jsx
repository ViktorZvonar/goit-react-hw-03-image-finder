// import PropTypes from 'prop-types';

const ImageGalleryItem = ({ webformatURL, largeImageURL, tags, onClick }) => (
  <li className="gallery-item">
    <img src={webformatURL} alt={tags} />
  </li>
);

export default ImageGalleryItem;
