import styles from './messenger.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import Message from '../Message/Message';
import { useInterval } from 'usehooks-ts';
import { useState } from 'react';
import { IMessage } from '../../interfaces/IMessage';
import { getSession } from '../../localStorage/sessionStorage';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../localStorage/db';
import { nanoid } from '@reduxjs/toolkit';
import ReplyArea from '../ReplyArea/ReplyArea';
import ImageArea from '../ImageArea/ImageArea';
import MessageArea from '../MessageArea/MessageArea';

const MESSENGER_UPDATE_INTERVAL = 500;

export default function Messenger() {
  const [time, setTime] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();

  const user = getSession();
  const room = useLiveQuery(async () => {
    return db.rooms.where({ id: id }).first();
  }, [time]);

  const [image, setImage] = useState<IMessage['image']>();
  const [replyMessage, setReplyMessage] = useState<IMessage['reply']>();

  useInterval(() => {
    setTime(prevState => prevState + 1);
  }, MESSENGER_UPDATE_INTERVAL);

  const handleSendMessage = async (text: IMessage['text']) => {
    if (!room || !user) {
      return;
    }

    try {
      const message: IMessage = {
        id: nanoid(10),
        sender: user,
        text: text,
        datetime: String(new Date()),
        reply: replyMessage ?? null,
        image: image ?? null,
      };
      await db.rooms.put({
        id: room.id,
        name: room.name,
        messages: [...room.messages, message],
      }, room.id);
    } catch (e) {
      console.log(e);
    }

    setReplyMessage(null);
    setImage(null);
  };

  if (!room || room.id !== id || !user) {
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
              isMyMessage={user.id === message.sender.id}
              onReply={setReplyMessage}
            />
          ))}
        </div>
      </div>
      {replyMessage && (
        <ReplyArea
          replyMessage={replyMessage}
          isMessageWithImage={!!image}
          dropReplyImage={() => setReplyMessage(null)}
        />
      )}
      {image && <ImageArea image={image} dropImage={() => setImage(null)} />}
      <MessageArea setImage={setImage} handleSendMessage={handleSendMessage} />
    </div>
  );
}
