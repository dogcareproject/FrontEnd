import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css';

import MyHeader from './components/MyHeader';
import Nav from './components/Nav';
import UserList from './pages/UserList';
import UserEdit from './pages/UserEdit';
import Community from './pages/Community'
import AIModel from './pages/AIModel';
import Home from "./pages/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import PostEdit from "./pages/PostEdit";
import Post from "./pages/Post";
import User from "./pages/User";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <MyHeader />
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/userList" element={<UserList />} />
          <Route path="/userDetail/:id" element={<User />} />
          <Route path="/userEdit/:id" element={<UserEdit />} />
          <Route path="/community" element={<Community />} />
          <Route path="/postDetail/:id" element={<Post />} />
          <Route path="/postEdit/:id" element={<PostEdit />} />
          <Route path="/aimodel" element={<AIModel />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
