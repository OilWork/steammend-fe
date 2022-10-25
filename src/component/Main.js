import React, { useState } from 'react';
import './Main.css';
import { Link } from "react-router-dom";
import Game from './Game'
import Comm from './Comm'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';


function Main(prop) {
  const components = {
    Game: Game,
    Comm: Comm
  };
  const Test = components[prop.content];

  let [slideValue, setSlideValue] = useState(100000);
  

  function valuetext(value) {
    return `${value}` ;
  }

  function valueLabel(value) {
    return value.toLocaleString('ko-KR');
  }
  const handleChange = (event, newValue) => {
    setSlideValue(newValue);
  };
  return (
    <div>

      <div id="page-wraper">
        <div className="responsive-nav">

          <div id="menu" className="menu">

            <div className="container">
              <div className="image">
                <a href="#"><img alt="main_logo" src="img/logo.png" /></a>
              </div>
              <div className="author-content">
                <h4>Filter</h4>
                <br></br>
                <br></br>
                <Box sx={{ width: 150, textAlign: 'center', margin: 'auto',  color: 'primary.main'}}>
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
              <nav className="main-nav" role="navigation">
                <ul className="main-menu">
                  <li><a href="#section1">Filter2</a></li>
                  <li><a href="#section2">Filter3</a></li>
                  <li><a href="#section3">Filter4</a></li>
                  <li><a href="#section4">Filter5</a></li>
                </ul>
              </nav>


            </div>
          </div>
        </div>

        <section className="section about-me" data-section="section1">
          <div className="container">
            <div className="section-heading">
              <Link to="/Login"><button>sign in sign up</button></Link>
            </div>
            <div className="topNav">
              <div className="topnav">
                <Link to="/">Game</Link>
                <Link to="/Comm">Community</Link>
              </div>
            </div>
            <Test price={slideValue}></Test>
          </div>
        </section>

      </div>

    </div>
  );
}

export default Main;