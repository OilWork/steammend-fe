import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { useAsync } from 'react-async'
import './Game.css';





function Game(props) {
    function urlLink(id) {
        window.open(`https://store.steampowered.com/app/${id}/`, '_blank');
    }

    const [activeIndex, setActiveIndex] = useState(0);
    const tabClickHandler = (index) => {
        setActiveIndex(index)
    }

    const [listData, setListData] = useState([]);
    useEffect(() => {
        axios.get("/sale")
            .then((response) => {
                console.log(response.data);
                setListData(response.data);
            })
            .catch((error) => {
                console.log(error);
            })

    }, [])

    return (
        <div>
            <div className="list-wrapper">
                <div className="tabs_wrap">
                    <ul>
                        <li id="test" className={activeIndex == 0 ? "active" : ""} onClick={() => tabClickHandler(0)}>test</li>
                        <li id="test2" className={activeIndex == 1 ? "active" : ""} onClick={() => tabClickHandler(1)}>test2</li>
                        <li id="test2" className={activeIndex == 2 ? "active" : ""} onClick={() => tabClickHandler(2)}>test3</li>
                        <li id="test2" className={activeIndex == 3 ? "active" : ""} onClick={() => tabClickHandler(3)}>test4</li>
                        <li id="test2" className={activeIndex == 4 ? "active" : ""} onClick={() => tabClickHandler(4)}>test5</li>
                    </ul>
                </div>
                <ul className="list">


                    {listData.filter(data => parseInt(data.price_overview.final) > props.price)
                        .map((data, index) => (

                            <li className="list-item" onClick={() => urlLink(data.steam_appid)}>
                                <div className="list-item__image">
                                    <img src={data.header_image} alt="Thumbnail" />
                                </div>
                                <div className="list-item__content">
                                    <div className='price'><p key={index}>{data.price_overview.final}</p></div>
                                    <h4>{data.name}</h4>

                                    <p>{data.short_description}</p>
                                </div>

                            </li>

                        ))}

                </ul>
            </div>
        </div>

    );
}



export default Game;