import styles from './authorization.module.css';
import { MouseEventHandler, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { nanoid } from '@reduxjs/toolkit';
import { db } from '../../localStorage/db';
import { setSession } from '../../localStorage/sessionStorage';

export default function Authorization() {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = async () => {
    try {
      const id = await db.users.where({ name: name }).toArray();

      if (id.length === 0) {
        const user = { name: name, id: nanoid(10) };
        db.users.add(user, user.id);
        setSession(user);
      } else {
        setSession(id[0]);
      }
    } catch (e) {
      console.log(e);
    }
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
