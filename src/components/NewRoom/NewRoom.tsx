import styles from './new-room.module.css';
import { useState } from 'react';
import { db } from '../../localStorage/db';
import { IRoom } from '../../interfaces/IRoom';
import { nanoid } from 'nanoid'

type NewRoomProps = {
  onClose: () => void;
};

export default function NewRoom({ onClose }: NewRoomProps) {
  const [name, setName] = useState('');

  async function handleSubmit() {
    try {
      const room: IRoom = {
        id: nanoid(10),
        name,
        messages: [],
      };
      await db.rooms.add(room, room.id);
      onClose();
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className={styles.newRoomForm}>
      <h1 className={styles.title}>Новая комната</h1>
      <input
        className={styles.nameBox}
        type={'text'}
        placeholder={'Введите название комнаты'}
        value={name}
        onChange={event => setName(event.target.value)}
      />
      <button
        className={styles.submit}
        type={'button'}
        onClick={() => handleSubmit()}
      >
        Создать
      </button>
    </div>
  );
}
