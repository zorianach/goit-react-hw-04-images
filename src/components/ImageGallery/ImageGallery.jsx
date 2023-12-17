import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import { GalleryLayout } from './ImageGallery.styled';


const ImageGallery = ({photos, openModal}) => {
    return (
    <GalleryLayout>
      {photos.map(photo => (
        <ImageGalleryItem key={photo.id} item={photo} openModal={openModal} />
        
      ))}
    </GalleryLayout>
  );
}

export default ImageGallery;