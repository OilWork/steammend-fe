import './App.css';
import Main from './component/Main';
import Login from './component/Login';
import Game from './component/Game'
import Comm from './component/Comm'
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
      </Routes>
    </BrowserRouter>
)}

export default App;
