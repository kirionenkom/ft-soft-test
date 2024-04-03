import styles from './rooms.module.css';
import { useInterval } from 'usehooks-ts';
import { useState } from 'react';
import NewRoom from '../NewRoom/NewRoom';
import { Link } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../localStorage/db';

const ROOMS_LIST_UPDATE_INTERVAL = 2000;

export default function RoomsList() {
  const [time, setTime] = useState(0);
  const [isNewRoomModalOpen, setIsNewRoomModalOpen] = useState(false);
  const rooms = useLiveQuery(() => db.rooms.toArray(), [time]);

  useInterval(() => {
    setTime(prevState => prevState++);
  }, ROOMS_LIST_UPDATE_INTERVAL);

  if (!rooms) {
    return null;
  }

  return isNewRoomModalOpen ? (
    <NewRoom onClose={() => setIsNewRoomModalOpen(false)} />
  ) : (
    <div className={styles.rooms}>
      {rooms.map(room => (
        <Link className={styles.room} to={room.id} key={room.id}>
          {room.name}
        </Link>
      ))}
      <button
        type={'button'}
        className={styles.newRoom}
        onClick={() => setIsNewRoomModalOpen(true)}
      >
        Создать комнату
      </button>
    </div>
  );
}
