import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ arrayData }) => {
  return (
    <ul className={css.ImageGallery}>
      {arrayData !== null &&
        arrayData.hits.map(item => {
          return (
            <li key={item.id}>
              <ImageGalleryItem
                webformatURL={item.webformatURL}
                tags={item.tags}
              />
            </li>
          );
        })}
    </ul>
  );
};
