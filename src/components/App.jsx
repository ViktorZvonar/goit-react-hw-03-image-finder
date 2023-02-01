import { Component } from 'react';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from 'shared/components/Modal';

import searchPicts from '../shared/services/ImgAPI';

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
    tota: null,
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

  componentDidUpdate(prevProps, prevState) {
    const { search, page } = this.state;
    if (prevState.search !== search || prevState.page !== page) {
      this.fetchPicts();
    }
  }

  fetchPicts = () => {
    const { search, page } = this.state;

    this.setState({ loading: true });

    searchPicts(search, page)
      .then(({ hits, totalHits }) => {
        const totalPages = Math.round(totalHits / 12);
        if (page === totalPages) {
          alert("You've reached the end of search results.");
        }

        this.setState(({ items }) => ({
          items: [...items, ...hits],
          total: totalHits,
        }));
      })
      .catch(error => {
        this.setState({ error: error.message });
      })
      .finally(() => this.setState({ loading: false }));
  };

  render() {
    const { items, currentLargeImageURL, loading, error, total } = this.state;
    const { searchImg, loadMore, showModal, toggleModal } = this;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={searchImg} isLoading={loading} />
        <ImageGallery items={items} onClick={showModal} />
        {error && <p>Something goes wrong. Please try again later.</p>}
        {loading && <Loader />}
        {Boolean(items.length) && items.length < total && (
          <Button onLoadMore={loadMore} />
        )}

        {currentLargeImageURL && (
          <Modal onClose={toggleModal}>
            <img src={currentLargeImageURL} alt="pict" />
          </Modal>
        )}
      </div>
    );
  }
}

export default App;
