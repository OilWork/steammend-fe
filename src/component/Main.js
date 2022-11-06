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

  let [slideValue, setSlideValue] = useState(100000);


  function valuetext(value) {
    return `${value}`;
  }

  function valueLabel(value) {
    return value.toLocaleString('ko-KR');
  }
  const handleChange = (event, newValue) => {
    setSlideValue(newValue);
  };

  const location = useLocation();
  if (location.pathname == '/' || location.pathname=='/DashBoard') {
    var sidebar = { display: 'block' }
  } else {
    var sidebar = { display: 'none' }
  }

    async function logout() {

      try {
        //응답 성공 
        const response = await axios.post("/api/userlogout.do", null, {
          params: {
            id: JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('loginId'), sessionStorage.getItem("NickName")).toString(CryptoJS.enc.Utf8))['id']
          }
        });
        if (response.data == 'logout') {
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
  
    const [mainActiveIndex, setMainActiveIndex] = useState();
    const tabClickHandler = (index) => {
      setMainActiveIndex(index)
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
              {location.pathname == '/' ?
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

                </div>
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
                    <li className={mainActiveIndex == 0 ? "active" : ""} onClick={() => { tabClickHandler(0);}}>Visualization</li>
                    <li className={mainActiveIndex == 1 ? "active" : ""} onClick={() => { tabClickHandler(1);}}>Recommend Game</li>
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
            <Test price={slideValue} menuSeleted={mainActiveIndex} />




          </div>
        </section>

      </div>

    </div>
  );
}

export default Main;