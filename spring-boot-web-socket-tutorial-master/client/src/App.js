import './App.css';
import { Route } from 'react-router-dom';
import RoomListPage from './pages/RoomListPage';
import ChatRoomContainer from './containers/chat/ChatRoomContainer';

const App = () => {
  return (
    <>
      <Route path="/lobby" component={RoomListPage} />
      <Route path="/room/:roomId" component={ChatRoomContainer} />
    </>
  );
};

export default App;
