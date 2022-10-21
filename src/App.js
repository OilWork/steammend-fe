import './App.css';
import Main from './component/Main';
import Login from './component/Login';
import Game from './component/Game'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
)}

export default App;
