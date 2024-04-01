import styles from './authorization.module.css';
import { MouseEventHandler, useState } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { setUser } from '../../store/messengerSlice';
import { useNavigate } from 'react-router-dom';

export default function Authorization() {
  const [name, setName] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = evt => {
    dispatch(setUser(name));
    navigate('/');
  };

  return (
    <div className={styles.authorization}>
      <h1 className={styles.title}>Авторизация</h1>
      <input
        className={styles.nameBox}
        type={'text'}
        placeholder={'Введите ваше имя'}
        value={name}
        onChange={event => setName(event.target.value)}
      />
      <button className={styles.submit} type={'button'} onClick={handleSubmit}>
        Войти
      </button>
    </div>
  );
}