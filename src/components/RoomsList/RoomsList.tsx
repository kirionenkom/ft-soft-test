import styles from './rooms.module.css';
import { useState } from 'react';
import NewRoom from '../NewRoom/NewRoom';
import { Link } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../localStorage/db';

export default function RoomsList() {
  const [isNewRoomModalOpen, setIsNewRoomModalOpen] = useState(false);
  const rooms = useLiveQuery(() => db.rooms.toArray());

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
