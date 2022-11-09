import React, { useState } from 'react';
import './Main.css';
import { Link, useLocation } from "react-router-dom";
import axios from 'axios';
import Game from './Game'
import Comm from './Comm'
import Write from './Write'
import Detail from './Detail';
import DashBoard from './DashBoard';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import CryptoJS from 'crypto-js';



function Main(prop) {
  const components = {
    Game: Game,
    Comm: Comm,
    Write: Write,
    Detail: Detail,
    DashBoard: DashBoard
  };
  const Test = components[prop.content];
  const [gameTab, setGameTab] = useState('All');

  let [slideValue, setSlideValue] = useState(100000);
  let [ageValue, setAgeValue] = useState(20);

  function valuetext(value) {
    return `${value}`;
  }

  function valueLabel(value) {
    return value.toLocaleString('ko-KR');
  }
  const handleChange = (event, newValue) => {
    setSlideValue(newValue);
  };

  function valuetextAge(value) {
    return `${value}`;
  }

  function valueLabelAge(value) {
    return `${value}`;
  }
  const handleChangeAge = (event, newValue) => {
    setAgeValue(newValue);
  };



  const location = useLocation();

  if (location.pathname === '/' || location.pathname === '/DashBoard') {
    var sidebar = { display: 'block' }
  } else {
    sidebar = { display: 'none' }
  }

  async function logout() {

    try {
      //응답 성공 
      const response = await axios.post("/api/userlogout.do", null, {
        params: {
          id: JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('loginId'), sessionStorage.getItem("NickName")).toString(CryptoJS.enc.Utf8))['id']
        }
      });
      if (response.data === 'logout') {
        sessionStorage.clear();
        window.location.replace("/");
      } else {
        alert('오류발생');
      }
    } catch (error) {
      //응답 실패
      console.error(error);
    }
  }

  const [mainActiveIndex, setMainActiveIndex] = useState(0);
  const tabClickHandler = (index) => {
    setMainActiveIndex(index)
  }

  const [gameActiveIndex, setGameActiveIndex] = useState(0);
  const gameTabClickHandler = (index) => {
    setGameTab(index);
    switch(index){
      case "All":
        setGameActiveIndex(0);
        break;
      case "Action":
        setGameActiveIndex(1);
        break;
      case "Adventure":
        setGameActiveIndex(2)
        break;
      case "RPG":
        setGameActiveIndex(3)
        break;
      case "Sports":
        setGameActiveIndex(4)
        break;
      case "Indie":
        setGameActiveIndex(5)
        break;
      default:
        
    }
    
  }

  return (
    <div>

      <div id="page-wraper">
        <div className="responsive-nav">

          <div id="menu" className="menu">

            <div className="container">
              <div className="image">
                <a href="/"><img alt="main_logo" src="img/logo_transparent.png" /></a>
              </div>
              {location.pathname === '/' ?
                <div style={sidebar}>
                  <div className="author-content" >
                    <br></br>
                    <h4>가격</h4>
                    <br></br>
                    <br></br>
                    <Box sx={{ width: 150, textAlign: 'center', margin: 'auto', color: 'primary.main' }}>
                      <Slider
                        aria-label="Always visible"
                        defaultValue={100000}
                        getAriaValueText={valuetext}
                        valueLabelFormat={valueLabel}
                        onChange={handleChange}
                        min={10000}
                        max={100000}
                        step={10000}
                        valueLabelDisplay="on"
                      />
                    </Box>
                    <br></br>
                    <h4>연령</h4>
                    <br></br>
                    <br></br>
                    <Box sx={{ width: 150, textAlign: 'center', margin: 'auto', color: 'primary.main' }}>
                      <Slider
                        aria-label="Always visible"
                        defaultValue={20}
                        getAriaValueText={valuetextAge}
                        valueLabelFormat={valueLabelAge}
                        onChange={handleChangeAge}
                        min={0}
                        max={20}
                        step={1}
                        valueLabelDisplay="on"
                      />
                    </Box>
                    
                  </div>
                  <nav className="main-nav" role="navigation">
                    <ul className="main-menu">
                      <li className={gameActiveIndex === 0 ? "active" : ""} onClick={() => { gameTabClickHandler("All"); }}>All</li>
                      <li className={gameActiveIndex === 1 ? "active" : ""} onClick={() => { gameTabClickHandler("Action"); }}>Action</li>
                      <li className={gameActiveIndex === 2 ? "active" : ""} onClick={() => { gameTabClickHandler("Adventure"); }}>Adventure</li>
                      <li className={gameActiveIndex === 3 ? "active" : ""} onClick={() => { gameTabClickHandler("RPG"); }}>RPG</li>
                      <li className={gameActiveIndex === 4 ? "active" : ""} onClick={() => { gameTabClickHandler("Sports"); }}>Sports</li>
                      <li className={gameActiveIndex === 5 ? "active" : ""} onClick={() => { gameTabClickHandler("Indie"); }}>Indie</li>
                    </ul>
                  </nav>

                </div> : <div style={sidebar}>
                  <div className="author-content" >
                    <br></br>
                    <h4>Menu</h4>
                    <br></br>
                    <br></br>

                    <br></br>

                  </div>
                  <nav className="main-nav" role="navigation">
                    <ul className="main-menu">
                      <li className={mainActiveIndex === 0 ? "active" : ""} onClick={() => { tabClickHandler(0); }}>DashBoard</li>
                      <li className={mainActiveIndex === 1 ? "active" : ""} onClick={() => { tabClickHandler(1); }}>Recommend Game</li>
                    </ul>
                  </nav>
                </div>}


            </div>
          </div>
        </div>

        <section className="section about-me" data-section="section1">
          <div className="container">
            <div className="section-heading">
              {sessionStorage.getItem("loginId") ?
                <Link><button onClick={logout}>Logout</button></Link>
                : <Link to="/Login"><button>sign in sign up</button></Link>}
            </div>
            <div className="topNav">
              <div className="topnav">
                <Link to="/">Game</Link>
                <Link to="/Comm">Community</Link>
                {sessionStorage.getItem("loginId") ?
                  <Link to="/DashBoard">My Info</Link>
                  : ""}
              </div>
            </div>
            <Test age={ageValue} price={slideValue} menuSeleted={mainActiveIndex} logout={logout} gameTab={gameTab}/>




          </div>
        </section>

      </div>

    </div>
  );
}

export default Main;