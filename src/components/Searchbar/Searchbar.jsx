import { Component } from 'react';
import { PropTypes } from 'prop-types';

import css from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    inputValue: '',
  };

  handleChange = event => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { onSubmit } = this.props;
    onSubmit({ ...this.state });
    this.reset();
  };

  reset() {
    this.setState({
      inputValue: '',
    });
  }

  render() {
    const { inputValue } = this.state;
    const { handleChange, handleSubmit } = this;

    return (
      <header className={css.Searchbar}>
        <form className="form" onSubmit={handleSubmit}>
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>

          <input
            className="input"
            value={inputValue}
            name="inputValue"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleChange}
            required
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
