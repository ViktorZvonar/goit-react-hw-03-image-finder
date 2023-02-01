import { Component } from 'react';
import axios from 'axios';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from 'shared/components/Modal';
// import ImgAPI from '../shared/services/ImgAPI';

import css from './App.module.css';

class App extends Component {
  state = {
    search: '',
    items: [],
    page: 1,
    loading: false,
    showModal: false,
    currentLargeImageURL: '',
    error: null,
  };

  showModal = url => {
    this.setState({
      currentLargeImageURL: url,
    });
  };

  toggleModal = () => {
    this.setState(() => ({
      currentLargeImageURL: '',
    }));
  };

  searchImg = ({ inputValue }) => {
    this.setState({ search: inputValue, items: [], page: 1 });
  };

  loadMore = () => {
    console.log(this.state);
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  // async fetchImg() {
  //   try {
  //   } catch {}
  // }

  componentDidUpdate(prevProps, prevState) {
    const { search, page } = this.state;
    if (prevState.search !== search || prevState.page !== page) {
      this.setState({ loading: true });
      axios
        .get(
          `https://pixabay.com/api/?q=${search}&page=${page}&key=31880656-95c2fbbe9581639500b790cae&image_type=photo&orientation=horizontal&per_page=12`
        )
        .then(({ data }) => {
          this.setState(({ items }) => ({
            items: [...items, ...data.hits],
          }));
        })
        .catch(error => {
          this.setState({ error: error.message });
        })
        .finally(() => this.setState({ loading: false }));
    }
  }

  render() {
    const { items, currentLargeImageURL, loading, error } = this.state;
    const { searchImg, loadMore, showModal, toggleModal } = this;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={searchImg} isLoading={loading} />
        <ImageGallery items={items} onClick={showModal} />
        {error && <p>Something goes wrong. Please try again later.</p>}
        {loading && <Loader />}
        {Boolean(items.length) && <Button onLoadMore={loadMore} />}

        {currentLargeImageURL && (
          <Modal onClose={toggleModal}>
            <img src={currentLargeImageURL} alt="" />
          </Modal>
        )}
      </div>
    );
  }
}

export default App;
