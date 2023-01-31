import { Component } from 'react';
import axios from 'axios';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
// import ImgAPI from '../shared/services/ImgAPI';

import css from './App.module.css';

class App extends Component {
  state = {
    search: '',
    items: [],
    page: 1,
    loading: false,
    currentLargeImageURL: '',
    error: null,
  };

  loadMore = () => {
    console.log(this.state);
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  searchImg = ({ inputValue }) => {
    this.setState({ search: inputValue });
  };

  componentDidUpdate(prevProps, prevState) {
    const { search, page } = this.state;
    if (prevState.search !== search || prevState.page !== page) {
      this.setState({ loading: true });
      axios
        .get(
          `https://pixabay.com/api/?q=${search}&page=${page}&key=31880656-95c2fbbe9581639500b790cae&image_type=photo&orientation=horizontal&per_page=12`
        )
        .then(({ data }) => {
          this.setState({ items: [...this.state.items, ...data.hits] });
          // this.setState({ items: data.hits });
        })
        .catch(error => {
          this.setState({ error: error.message });
        })
        .finally(() => this.setState({ loading: false }));
    }
  }

  render() {
    const { items, loading, error } = this.state;
    const { searchImg, loadMore } = this;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={searchImg} isLoading={loading} />
        <ImageGallery items={items} />
        {error && <p>Something goes wrong. Please try again later.</p>}
        {loading && <Loader />}
        {Boolean(items.length) && <Button onLoadMore={loadMore} />}
      </div>
    );
  }
}

export default App;
