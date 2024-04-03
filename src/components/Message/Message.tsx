import styles from './message.module.css';
import { IMessage } from '../../interfaces/IMessage';
import cn from 'classnames';

type MessageProps = {
  message: IMessage;
  isMyMessage: boolean;
  onReply: (message: IMessage) => void;
};

const getTime = (datetime: string) => {
  const date = new Date(datetime);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedHours = hours / 10 < 1 ? `0${hours}` : hours;
  const formattedMinutes = minutes / 10 < 1 ? `0${minutes}` : minutes;
  return `${formattedHours}:${formattedMinutes}`;
};

export default function Message({
  message,
  isMyMessage,
  onReply,
}: MessageProps) {
  return (
    <div className={cn(styles.message, isMyMessage && styles.myMessage)}>
      {message.image && (
        <img
          src={message.image.toString()}
          alt={'Изображение'}
          className={styles.image}
        />
      )}
      {!isMyMessage && <p className={styles.sender}>{message.sender.name}</p>}
      {message.reply && (
        <div className={styles.replyContainer}>
          {message.reply.image && (
            <img
              src={message.reply.image.toString()}
              alt={'Изображение ответа'}
            />
          )}
          <p className={styles.reply}>
            {message.reply.text.length > 50
              ? message.reply.text.slice(0, 50) + '...'
              : message.reply.text}
          </p>
        </div>
      )}
      <p className={styles.text}>{message.text}</p>
      <button
        type={'button'}
        className={styles.replyButton}
        onClick={() => onReply(message)}
      >
        Ответить
      </button>
      <time className={styles.time}>{getTime(message.datetime)}</time>
    </div>
  );
}
