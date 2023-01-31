import css from './Button.module.css';

const Button = ({ onLoadMore, isLoading }) => {
  <div>
    <button
      type="button"
      onClick={onLoadMore}
      disabled={isLoading}
      className={css.Button}
    >
      Load more
    </button>
    ;
  </div>;
};

export default Button;
