import css from './Button.module.css';
import PropTypes from 'prop-types';

const Button = ({ onLoadMore }) => (
  <button type="button" onClick={onLoadMore} className={css.Button}>
    Load more
  </button>
);
Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};

export default Button;
