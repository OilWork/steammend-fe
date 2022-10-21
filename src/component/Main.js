import React from 'react';
import './Main.css';
import { Link } from "react-router-dom";
import Game from './Game'


function Main(){
    return(
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
                    <span>제한할 검색 범위</span>
                  </div>
                  <nav className="main-nav" role="navigation">
                    <ul className="main-menu">
                      <li><a href="#section1">About Me</a></li>
                      <li><a href="#section2">What I’m good at</a></li>
                      <li><a href="#section3">My Work</a></li>
                      <li><a href="#section4">Contact Me</a></li>
                    </ul>
                  </nav>
                  
                  
                </div>
              </div>
            </div>
      
            <section className="section about-me" data-section="section1">
              <div className="container">
                <div className="section-heading">
                  <Link to ="/Login"><button>sign in sign up</button></Link>
                </div>
                <div className="topNav">
                  <span>여기다 topnav
                  </span>
                </div>
              <Game />
                
              </div>
            </section>
      
             </div>
      
          </div>
    );
}

export default Main;