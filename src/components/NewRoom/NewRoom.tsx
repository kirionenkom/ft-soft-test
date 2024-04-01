import styles from './new-room.module.css';
import { MouseEventHandler, useState } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { createNewRoom } from '../../store/messengerSlice';

type NewRoomProps = {
  onClose: () => void;
};

export default function NewRoom({ onClose }: NewRoomProps) {
  const [name, setName] = useState('');
  const dispatch = useAppDispatch();

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = evt => {
    dispatch(createNewRoom(name));
    onClose();
  };

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
      <button className={styles.submit} type={'button'} onClick={handleSubmit}>
        Создать
      </button>
    </div>
  );
}
