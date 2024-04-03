import styles from './messenger.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import Message from '../Message/Message';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useEventListener, useInterval } from 'usehooks-ts';
import { getRoom, sendMessage } from '../../store/messengerSlice';
import { useState } from 'react';
import { IMessage } from '../../interfaces/IMessage';
import EmojiContainer from '../EmojiContainer/EmojiContainer'

const MESSENGER_UPDATE_INTERVAL = 500;

export default function Messenger() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(state => state.messenger.currentUser);
  const room = useAppSelector(state => state.messenger.currentRoom);
  const [message, setMessage] = useState('');
  const [replyMessage, setReplyMessage] = useState<IMessage['reply']>(null);
  const [isEmojiWindowOpen, setIsEmojiWindowOpen] = useState(false);

  useInterval(() => {
    dispatch(getRoom(id));
  }, MESSENGER_UPDATE_INTERVAL);

  const handleSendMessage = () => {
    if (message === '') {
      return;
    }

    dispatch(
      sendMessage({ roomId: id, messageText: message, reply: replyMessage }),
    );
    setMessage('');
    setReplyMessage(null);
    setIsEmojiWindowOpen(false)
  };

  useEventListener('keyup', event => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  });

  if (!room || room.id !== id) {
    return null;
  }

  return (
    <div className={styles.messenger}>
      <div className={styles.menu}>
        <button
          type={'button'}
          className={styles.backButton}
          onClick={() => navigate('/')}
        />
        <h1 className={styles.roomTitle}>{room.name}</h1>
      </div>
      <div className={styles.dialogContainer}>
        <div className={styles.dialog}>
          {room.messages.map(message => (
            <Message
              key={message.id}
              message={message}
              isMyMessage={user === message.sender}
              onReply={setReplyMessage}
            />
          ))}
        </div>
      </div>
      {replyMessage && (
        <div className={styles.replyArea}>
          <div>
            <p className={styles.replyAuthor}>{replyMessage.sender}</p>
            <p className={styles.replyText}>{replyMessage.text}</p>
          </div>
          <button
            className={styles.removeReply}
            type={'button'}
            onClick={() => setReplyMessage(null)}
          />
        </div>
      )}
      <div className={styles.messageArea}>
        <button
          type={'button'}
          className={styles.emojiButton}
          onClick={() => setIsEmojiWindowOpen(prevState => !prevState)}
        />
        <input
          placeholder={'Введите сообщение'}
          value={message}
          onChange={event => setMessage(event.target.value)}
        />
        <button
          type={'button'}
          className={styles.sendButton}
          onClick={handleSendMessage}
          disabled={message === ''}
        ></button>
      </div>
      <EmojiContainer
        isOpen={isEmojiWindowOpen}
        onPick={(emoji: string) => setMessage(prevState => prevState + emoji)}
      />
    </div>
  );
}
