import { useState, useEffect } from 'react';
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

const App = () => {
  const [search, setSearch] = useState('')
  const [photos, setPhotos] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [buttonLoadMore, setButtonLoadMore] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [selectedPhoto, setSelectedPhoto] = useState([])
  // const [imgUrl, setImgUrl] = useState('')
  // const [tag, setTag] = useState('');


  useEffect(() => {
    if(!search) return;

    const loadImages= async ()=> {
      setLoading(true);
      try {
        //ф-ія запиту з арі
        const response = await getImages(search, page)
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
          setPhotos(prevState=> [...prevState, ...arrPhotos]); 
          
          if (totalPage > page) {
            setButtonLoadMore(true)
            } else {
                  Notify.info("We're sorry, but you've reached the end of search results.", paramsForNotify);
                  setButtonLoadMore(false);
                };
        }
        catch(error){
          onFetchError(error)
        }
        finally{
          setLoading(false);
        };

    };
    loadImages();
    setButtonLoadMore(false)
    }, [search, page]);

    //  запит пошуку в App з SearchBar
    const handleSubmit = (searchValue) => {
        setSearch(searchValue)
        setPage(1)
        setPhotos([]);
    };

    const handleLoadMore = () => {
        setPage(page + 1);
        setLoading(true)
  // console.log(this.state.page)
    } 

    const toggleModal = () => {
      setShowModal((prev) => !prev)
    }

    //відкрити модалку
    const onOpenModal = (images) => {
      setShowModal(true);
      setSelectedPhoto(images);
      // setImgUrl(imgUrl);
      // setTag(tag);
    };

    // render(){
    //   // console.log(this.state.photos)
    //   const {photos, buttonLoadMore, loading, showModal, selectedPhoto, imgUrl, tags} = this.state;

      return (
        <>
        <SearchBar onSubmit={handleSubmit}/>
        <AppContainer>
        { photos && <ImageGallery photos={photos} openModal={onOpenModal}/>}
        {loading && <Loader />}
        {buttonLoadMore && <Button onClick={handleLoadMore} />}
        {showModal && <Modal selectedPhoto={selectedPhoto} onClose={toggleModal}>
          {/* <img src={imgUrl} alt={tag}/> */}
          </Modal>}
        </AppContainer>
        </>
      )
    };

  export default App;
