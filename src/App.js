import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css';

import MyHeader from './components/MyHeader';
import Nav from './components/Nav';
import UserList from './pages/UserList';
import UserEdit from './pages/UserEdit';
import AvgWeight from './pages/AvgWeight'
import AIModel from './pages/AIModel';
import Login from "./components/Login";
import Inquiry from "./pages/Inquiry";
import InquiryList from "./pages/InquiryList";
import User from "./pages/User";
import { AuthProvider } from "./components/AuthContext";
import InquiryAnswer from "./pages/InquiryAnswer";
import Home from "./pages/Home";
import WalkDataqGraph from "./pages/WalkDataqGraph";
import ImageSlider from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="App">
          <MyHeader />
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/userList" element={<UserList />} />
            <Route path="/userDetail/:id" element={<User />} />
            <Route path="/userEdit/:id" element={<UserEdit />} />
            <Route path="/graph" element={<AvgWeight />} />
            <Route path="/AvgWeight" element={<AvgWeight />} />
            <Route path="/walkData" element={<WalkDataqGraph />} />
            <Route path="/inquiryList" element={<InquiryList />} />
            <Route path="/inquiryDetail/:id" element={<Inquiry />} />
            <Route path="/inquiryAnswer/:id" element={<InquiryAnswer />} />
            <Route path="/aimodel" element={<AIModel />} />
          </Routes>
        </div>
      </AuthProvider>
      <ImageSlider />
    </BrowserRouter>
  );
}

export default App;
