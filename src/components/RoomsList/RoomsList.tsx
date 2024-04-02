import styles from './rooms.module.css';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useInterval } from 'usehooks-ts';
import { getRooms } from '../../store/messengerSlice';
import { useState } from 'react';
import NewRoom from '../NewRoom/NewRoom';
import { Link } from 'react-router-dom';

const ROOMS_LIST_UPDATE_INTERVAL = 2000;

export default function RoomsList() {
  const [isNewRoomModalOpen, setIsNewRoomModalOpen] = useState(false);
  const rooms = useAppSelector(state => state.messenger.rooms);
  const dispatch = useAppDispatch();

  useInterval(() => {
    dispatch(getRooms());
  }, ROOMS_LIST_UPDATE_INTERVAL);

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