import styles from './message-area.module.css';
import { IMessage } from '../../interfaces/IMessage';
import { useState } from 'react';
import { useEventListener } from 'usehooks-ts';
import EmojiContainer from '../EmojiContainer/EmojiContainer';

type MessageAreaProps = {
  setImage: (image: IMessage['image']) => void;
  handleSendMessage: (text: IMessage['text']) => void;
};

function getBase64(image: File, setImage: (image: IMessage['image']) => void) {
  if (!image) {
    return;
  }
  const reader = new FileReader();
  reader.readAsDataURL(image);
  reader.onload = function () {
    console.log(reader.result);
    setImage(reader.result);
  };
  reader.onerror = function (error) {
    console.log('Error: ', error);
  };
}

export default function MessageArea({
  handleSendMessage,
  setImage,
}: MessageAreaProps) {
  const [messageText, setMessageText] = useState('');
  const [isEmojiWindowOpen, setIsEmojiWindowOpen] = useState(false);

  const handleSendButtonClick = () => {
    if (messageText === '') {
      return;
    }
    handleSendMessage(messageText);
    setIsEmojiWindowOpen(false);
    setMessageText('');
  };

  useEventListener('keyup', async event => {
    if (event.key === 'Enter') {
      handleSendButtonClick();
    }
  });

  return (
    <>
      <div className={styles.messageArea}>
        <label className={styles.inputImage}>
          <input
            type='file'
            name='file'
            accept={'.png, .jpeg, .jpg'}
            onChange={evt => {
              if (evt.target.files) {
                getBase64(evt.target.files[0], setImage);
              }
            }}
          />
          <span className={styles.inputButton}></span>
        </label>
        <button
          type={'button'}
          className={styles.emojiButton}
          onClick={() => setIsEmojiWindowOpen(prevState => !prevState)}
        />
        <input
          placeholder={'Введите сообщение'}
          value={messageText}
          onChange={event => setMessageText(event.target.value)}
        />
        <button
          type={'button'}
          className={styles.sendButton}
          onClick={handleSendButtonClick}
          disabled={messageText === ''}
        ></button>
      </div>
      <EmojiContainer
        isOpen={isEmojiWindowOpen}
        onPick={(emoji: string) =>
          setMessageText(prevState => prevState + emoji)
        }
      />
    </>
  );
}
