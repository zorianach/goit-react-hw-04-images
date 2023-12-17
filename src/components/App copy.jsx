import { Component } from 'react';
import SearchBar from './Searchbar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import { AppContainer } from './App.styled';
import { Notify } from 'notiflix';
import { paramsForNotify } from './Notify/Notify';
import { getImages, onFetchError } from 'api/api';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';


const perPage = 12;

class App extends Component {
  state = {
    search: '',
    photos: null,
    page: 1,
    loading: false,
    buttonLoadMore: false,
    showModal: false,
    selectedPhoto: null,
  }

  componentDidUpdate(_, prevState) {
    const prevSearch = prevState.search;
    const prevPage = prevState.page;
    const newSearch = this.state.search;
    const newPage = this.state.page;

    if (prevSearch !== newSearch || prevPage !== newPage) {
      this.loadImages(newSearch, newPage);
      this.setState({ loading: true, buttonLoadMore: false});
    }
   ;  
  }

  loadImages = async() => {
    try {
      //ф-ія запиту з арі
      const response = await getImages(this.state.search, this.state.page)
      //   console.log(data);
        const { totalHits, hits } = response;
        const totalPage = Math.floor(totalHits / perPage);
        // console.log(totalPage);
        if (totalHits === 0) {
          return Notify.failure('Sorry, there are no images matching your search query. Please try again.', paramsForNotify);
        }
        //створюємо масив підвантажених зображень 
        const arrPhotos = hits.map(({ id, webformatURL, largeImageURL, tags }) => (
          { id, webformatURL, largeImageURL, tags }
        ));
        // console.log(arrPhotos);       

        //додаємо новий масив зображень до попереднього
        this.setState(prevState => ({
          photos: prevState.photos ? [...prevState.photos, ...arrPhotos] : arrPhotos}), 
        )
        if (totalPage > this.state.page) {
          this.setState({ buttonLoadMore: true })
          } else {
                Notify.info("We're sorry, but you've reached the end of search results.", paramsForNotify);
                this.setState({ buttonLoadMore: false });
              };
      }
      catch(error){
        onFetchError(error)
      }
      finally{
        this.setState({ loading: false });
      };
      // console.log(this.state.photos)
    }

  //  запит пошуку в App з SearchBar
  handleSubmit = (searchValue) => {
    this.setState({
      search: searchValue,
      page: 1,
      photos: null,
      });
  };

  handleLoadMore = () => {
    this.setState({
      page: this.state.page + 1,
      loading: true,
    })
console.log(this.state.page)
  } 

  toggleModal = () => {
    this.setState(({showModal}) => ({
      showModal: !showModal
    }))
  }

   //відкрити модалку
   onOpenModal = (imgUrl, tag) => {
    this.setState({ showModal: true, imgUrl, tag });
  };

  render(){
    // console.log(this.state.photos)
    const {photos, buttonLoadMore, loading, showModal, selectedPhoto, imgUrl, tags} = this.state;

    return (
      <>
      <SearchBar onSubmit={this.handleSubmit}/>
      <AppContainer>
      { photos && <ImageGallery photos={photos} openModal={this.onOpenModal}/>}
      {loading && <Loader />}
      {buttonLoadMore && <Button onClick={this.handleLoadMore} />}
      {showModal && <Modal selectedPhoto={selectedPhoto} onClose={this.toggleModal}>
        <img src={imgUrl} alt={tags}/>
        </Modal>}
      </AppContainer>
      </>
    )
  }
};

export default App;
