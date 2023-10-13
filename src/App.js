import { BrowserRouter, Routes, Route } from "react-router-dom";

import MyHeader from './components/MyHeader';
import Nav from './components/Nav';
import UserList from './pages/UserList';
import Community from './pages/Community'
import AIModel from './pages/AIModel';
import Home from "./pages/Home";
import Login from "./components/Login";
import Register from "./components/Register";

import './App.css';
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
          <Route path="/community" element={<Community />} />
          <Route path="/aimodel" element={<AIModel />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
