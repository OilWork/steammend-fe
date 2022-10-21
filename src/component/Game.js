import React from 'react';
import './Game.css';





function Game(){

  
    return(
        <div className="list-wrapper">
        <ul className="list">
    
        <li className="list-item">
            <div className="list-item__image">
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/93.jpg" alt="Thumbnail" />
            </div>
            <div className="list-item__content">
                <h4> Linda Hart </h4>
                <p> 6765 Shady Ln Dr </p>
            </div>
        </li>
    
        <li claclassNamess="list-item">
            <div className="list-item__image">
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/46.jpg" alt="Thumbnail" />
            </div>
            <div className="list-item__content">
                <h4> Roger Medina </h4>
                <p> 2420 Paddock Way </p>
            </div>
        </li>
    
        <li className="list-item">
            <div className="list-item__image">
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/59.jpg" alt="Thumbnail" />
            </div>
            <div className="list-item__content">
                <h4> Dean Sullivan </h4>
                <p> 6727 Airplane Ave </p>
            </div>
        </li>
    
        <li className="list-item">
            <div className="list-item__image">
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/78.jpg" alt="Thumbnail" />
            </div>
            <div className="list-item__content">
                <h4> Elizabeth Austin </h4>
                <p> 6685 Blossom Hill Rd </p>
            </div>
        </li>
    
    </ul>
    </div>
        

        );
    }
    
    
    
        export default Game;