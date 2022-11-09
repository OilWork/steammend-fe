import './App.css';
import Main from './component/Main';
import Login from './component/Login';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main content="Game"/>} />
        <Route path="login" element={<Login />} />
        <Route path="comm" element={<Main content="Comm"/>} />
        <Route path="write" element={<Main content="Write"/>} />
        <Route path="DashBoard" element={<Main content="DashBoard"/>} />
        <Route exact path="/Detail/:no" element={<Main content="Detail"/>} />
      </Routes>
    </BrowserRouter>
)}

export default App;
