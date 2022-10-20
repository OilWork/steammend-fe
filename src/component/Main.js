import React from 'react';
import './Main.css';
import { Link } from "react-router-dom";



function Main(props){
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
                  <Link to ="/Login">sign in sign up</Link>
                </div>
                <div className="topNav">
                  <span>여기다 topnav
                  </span>
                </div>
                <div className="left-image-post">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="left-image">
                        <img src="" alt="" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="right-text">
                        <h4>Reflux HTML CSS Template</h4>
                        <p>
                          Donec tristique feugiat lacus, at sollicitudin nunc euismod
                          sed. Mauris viverra, erat non sagittis gravida, elit dui
                          mollis ante, sit amet eleifend purus ligula eget eros. Sed
                          tincidunt quam vitae neque pharetra dignissim eget ut
                          libero.
                        </p>
                        <div class="white-button">
                          <a href="#">Read More</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="right-image-post">
                  <div class="row">
                    <div class="col-md-6">
                      <div class="left-text">
                        <h4>Sed sagittis rhoncus velit</h4>
                        <p>
                          Pellentesque habitant morbi tristique senectus et netus et
                          malesuada fames ac turpis egestas. Vestibulum fermentum
                          eleifend nibh, vitae sodales elit finibus pretium.
                          Suspendisse potenti. Ut sollicitudin risus a sollicitudin
                          semper.
                        </p>
                        <div class="white-button">
                          <a href="#">Read More</a>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="right-image">
                        <img src="" alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
      
             </div>
      
          </div>
    );
}

export default Main;