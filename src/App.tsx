import './App.css';
import { Route, Routes } from 'react-router-dom';
import Messenger from './components/Messenger/Messenger';
import Authorization from './components/Authorization/Authorization';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import RoomsList from './components/RoomsList/RoomsList';

function App() {
  return (
    <Routes>
      <Route path={'/login'} element={<Authorization />} />
      <Route
        path={'/'}
        element={
          <PrivateRoute>
            <RoomsList />
          </PrivateRoute>
        }
      />
      <Route
        path={'/:id'}
        element={
          <PrivateRoute>
            <Messenger />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
