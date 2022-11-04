import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { useAsync } from 'react-async'
import './Game.css';
import { useInView } from "react-intersection-observer"





function Game(props) {
    const [chose, setChoose] = useState("all");


    const preventRef = useRef(true); //중복 실행 방지
    const obsRef = useRef(null); //observer Element
    const endRef = useRef(false); //모든 글 로드 확인

    useEffect(() => {
        const observer = new IntersectionObserver(obsHandler, { threshold: 0.5 });
        if (obsRef.current) observer.observe(obsRef.current);
        return () => { observer.disconnect(); }
    }, []);

    const obsHandler = ((entries) => {
        const target = entries[0];
        if (!endRef.current && target.isIntersecting && preventRef.current) { //옵저버 중복 실행 방지
            preventRef.current = false; //옵저버 중복 실행 방지
            console.log(page);
            setPage(prev => prev + 1); //페이지 값 증가
        }
    })

    function urlLink(id) {
        window.open(`https://store.steampowered.com/app/${id}/`, '_blank');
    }

    const [activeIndex, setActiveIndex] = useState(0);
    const tabClickHandler = (index) => {
        setActiveIndex(index)
    }

    const [page, setPage] = useState(0);
    const [load, setLoad] = useState(false);
    const [items, setItems] = useState([])

    useEffect(()=> {
        
            getItems();
        
    }, []);
    

    const getItems = useCallback(async () => {
        setLoad(true);
        await axios.get(`/api2/${chose}?start=${page}`).then((res) => {
            setItems(prev => prev.concat(res.data));
            preventRef.current = true; 
            setLoad(false);
        })
        console.log(page);
    }, [page])


  


    return (
        <div>
            <div className="list-wrapper">
                <div className="tabs_wrap">
                    <ul>
                        <li id="test" className={activeIndex == 0 ? "active" : ""} onClick={() => tabClickHandler(0)}>인기순</li>
                        <li id="test2" className={activeIndex == 1 ? "active" : ""} onClick={() => tabClickHandler(1)}>test2</li>
                        <li id="test2" className={activeIndex == 2 ? "active" : ""} onClick={() => tabClickHandler(2)}>test3</li>
                        <li id="test2" className={activeIndex == 3 ? "active" : ""} onClick={() => tabClickHandler(3)}>test4</li>
                        <li id="test2" className={activeIndex == 4 ? "active" : ""} onClick={() => tabClickHandler(4)}>test5</li>
                    </ul>
                </div>
                <ul className="list">


                    {items && items.filter(data => parseInt(data.price_overview.final / 100) < props.price || data.is_free == true)
                        .map((data, index) => (

                            <li className="list-item" onClick={() => urlLink(data.steam_appid)}>
                                <div className="list-item__image">
                                    <img src={data.header_image} alt="Thumbnail" />
                                </div>
                                <div className="list-item__content">
                                    <div className='price'><p key={index}>{data.price_overview.final_formatted}</p></div>
                                    <h4>{data.name}</h4>

                                    <p>{data.short_description}</p>
                                </div>

                            </li>

                        ))}
                        {page !==0 && <div ref={obsRef}></div>}
                     

                </ul>
            </div>
        </div>

    );
}



export default Game;