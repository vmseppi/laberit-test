import { Routes, Route } from 'react-router-dom';
import UserList from './components/UserList';
import UserDetail from './components/UserDetail';
import CreateUser from './components/CreateUser';

function App() {
  return (
    <Routes>
      <Route path="/" element={<UserList />} />
      <Route path="/user/:id" element={<UserDetail />} />
      <Route path="/user/create" element={<CreateUser />} />
    </Routes>
  );
}

export default App
