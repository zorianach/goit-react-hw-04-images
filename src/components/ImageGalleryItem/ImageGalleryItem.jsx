import {ImageItem, Image} from './ImageGalleryItem.styled'


const ImageGalleryItem = ({item, openModal}) => {
    // console.log(item)
    // 
        const { tags, webformatURL, largeImageURL } = item;
  return (
    <>
    <ImageItem
      onClick={e => {
        e.preventDefault();
        openModal({largeImageURL, tags});
      }}
    >
      <Image src={webformatURL} alt={tags} loading="lazy" />
    </ImageItem>
    </>
  );
};


export default ImageGalleryItem;