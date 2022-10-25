import React, { useState , useRef} from 'react';
import './Game.css';





function Game(props){
    function urlLink(){
        window.open('https://store.steampowered.com/app/1174180/','_blank');
    }

    const [activeIndex, setActiveIndex] = useState(0);
    const tabClickHandler=(index)=>{
        setActiveIndex(index)
    }

    const test = [40000, 50000, 60000, 70000];

    return(
        <div className="list-wrapper">
          <div className="tabs_wrap">
            <ul>
            <li id="test" className={activeIndex==0 ? "active" : ""} onClick={()=>tabClickHandler(0)}>test</li>
            <li id="test2" className={activeIndex==1 ? "active" : ""} onClick={()=>tabClickHandler(1)}>test2</li>
            <li id="test2" className={activeIndex==2 ? "active" : ""} onClick={()=>tabClickHandler(2)}>test3</li>
            <li id="test2" className={activeIndex==3 ? "active" : ""} onClick={()=>tabClickHandler(3)}>test4</li>
            <li id="test2" className={activeIndex==4 ? "active" : ""} onClick={()=>tabClickHandler(4)}>test5</li>
            </ul>
        </div>
        <ul className="list">

        <li className="list-item" onClick={urlLink}>
            <div className="list-item__image">
                <img src="https://cdn.akamai.steamstatic.com/steam/apps/1174180/header.jpg?t=1656615305" alt="Thumbnail" />
            </div>
            <div className="list-item__content">
            <div className='price'><p>30000</p></div>
                <h4>Red Dead Redemption 2 </h4>
                
                <p> 올해의 게임 175여 개를 수상하고 250개 이상의 완벽한 평가를 받은 Red Dead Redemption 2는 현대 시대가 시작될 무렵 무법자인 아서 모건과 악명 높은 반 더 린드 갱단이 미국 전역을 따라 도주하는 장대한 서사시입니다. 모두가 함께 즐길 수 있는 생생한 세계인 Red Dead 온라인 역시 포함됩니다. </p>
            </div>
            
        </li>
        {test.filter(data => data > props.price)
        .map((price, index) => (
            <li className="list-item" onClick={urlLink}>
            <div className="list-item__image">
                <img src="https://cdn.akamai.steamstatic.com/steam/apps/1174180/header.jpg?t=1656615305" alt="Thumbnail" />
            </div>
            <div className="list-item__content">
            <div className='price'><p key={index}>{price}</p></div>
                <h4>Red Dead Redemption 2 </h4>
                
                <p> 올해의 게임 175여 개를 수상하고 250개 이상의 완벽한 평가를 받은 Red Dead Redemption 2는 현대 시대가 시작될 무렵 무법자인 아서 모건과 악명 높은 반 더 린드 갱단이 미국 전역을 따라 도주하는 장대한 서사시입니다. 모두가 함께 즐길 수 있는 생생한 세계인 Red Dead 온라인 역시 포함됩니다. </p>
            </div>
            
        </li>

        ))}
    
    </ul>
    </div>
        

        );
    }
    
    
    
        export default Game;