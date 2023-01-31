import { Component } from 'react';
import axios from 'axios';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
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
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  searchImg = ({ inputValue }) => {
    this.setState({ search: inputValue });
    console.log();
  };

  componentDidUpdate(prevProps, prevState) {
    const { search, page } = this.state;
    if (prevState.search !== search) {
      this.setState({ loading: true });
      axios
        .get(
          `https://pixabay.com/api/?q=${search}&page=${page}&key=31880656-95c2fbbe9581639500b790cae&image_type=photo&orientation=horizontal&per_page=12`
        )
        .then(({ data }) => {
          console.log(data.hits);
          this.setState({ items: [...this.state.items, ...data.hits] });
          // this.setState({ items: data.hits });

          console.log(this.state);
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
      <div
        className={css.App}
        // style={{
        //   height: '100vh',
        //   display: 'flex',
        //   justifyContent: 'center',
        //   alignItems: 'center',
        //   fontSize: 40,
        //   color: '#010101',
        // }}
      >
        <Searchbar onSubmit={searchImg} isLoading={loading} />
        <ImageGallery items={items} />
        {error && <p>Something goes wrong. Please try again later.</p>}
        {loading && <p>...loading</p>}
        {Boolean(items.length) && (
          <Button onLoadMore={loadMore} isLoading={loading} />
        )}
      </div>
    );
  }
}

export default App;
