import { IMessage } from '../../interfaces/IMessage';
import styles from './image-area.module.css';

type ImageAreaProps = {
  image: IMessage['image'];
  dropImage: () => void;
};

export default function ImageArea({ image, dropImage }: ImageAreaProps) {
  return (
    <div className={styles.imageContainer}>
      <img
        src={image.toString()}
        width={100}
        height={100}
        alt={'Изображение'}
      />
      <button
        className={styles.removeImage}
        type={'button'}
        onClick={dropImage}
      />
    </div>
  );
}
