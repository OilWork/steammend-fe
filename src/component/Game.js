import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import './Game.css';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import CryptoJS from 'crypto-js';




function Game(props) {
    const [chose, setChose] = useState("all");
    const [page, setPage] = useState(0);
    const [load, setLoad] = useState(false);
    const [items, setItems] = useState([]);
    const [keyword, setKeyword] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);

    const preventRef = useRef(true); //중복 실행 방지
    const obsRef = useRef(null); //observer Element
    const endRef = useRef(false); //모든 글 로드 확인


    const changeTab = (tab) => {
        setItems([]);
        setPage(0);
        setChose(tab);
    }

    const search = (tab) => {
        setPage(2313);
        setPage(0);
        setItems([]);
        setChose(tab);
        tabClickHandler(6);
    }

    useEffect(() => {
        const observer = new IntersectionObserver(obsHandler, { threshold: 0.5 });
        if (obsRef.current) observer.observe(obsRef.current);
        return () => { observer.disconnect(); }
    }, []);

    const obsHandler = ((entries) => {
        const target = entries[0];
        if (!endRef.current && target.isIntersecting && preventRef.current) { //옵저버 중복 실행 방지
            preventRef.current = false; //옵저버 중복 실행 방지
            setPage(prev => prev + 1); //페이지 값 증가
        }
    })

    function urlLink(id) {
        window.open(`https://store.steampowered.com/app/${id}/`, '_blank');
    }

    const tabClickHandler = (index) => {
        setActiveIndex(index)
    }


    useEffect(() => {
        
        getItems();

    }, [page, chose, activeIndex]);

    const getItems = useCallback(async () => {

        setLoad(true);
        if (chose == 'main-recomm') {
            var url = `/api2/${chose}?id=${JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('loginId'), sessionStorage.getItem("NickName")).toString(CryptoJS.enc.Utf8))['id']}`
        } else {
            if (chose == 'search') {
                var url = `/api2/${chose}?start=${page}&keyword=${keyword}`
            } else {
                var url = `/api2/${chose}?start=${page}`
            }
        }
        await axios.get(url).then((res) => {
            if (res.data.length == 0) {
                alert("검색결과가 없습니다");
            } else {
                setItems(prev => prev.concat(res.data));
                setLoad(false);
                preventRef.current = true;
                if (chose == 'search') {
                }
                if (res.data.length < 30) {
                    endRef.current = true;
                }
            }
        })
    }, [page, chose, activeIndex]);




    return (
        <div>
            <div className="list-wrapper">
                <div className="tabs_wrap">
                    <ul>
                        <li id="test" className={activeIndex == 0 ? "active" : ""} onClick={() => { tabClickHandler(0); changeTab('all'); }}>인기순</li>
                        <li id="test2" className={activeIndex == 1 ? "active" : ""} onClick={() => { tabClickHandler(1); changeTab('free'); }}>무료게임</li>
                        <li id="test2" className={activeIndex == 2 ? "active" : ""} onClick={() => { tabClickHandler(2); changeTab('sale'); }}>세일중인 게임</li>
                        <li id="test2" className={activeIndex == 3 ? "active" : ""} onClick={() => { tabClickHandler(3); changeTab('new'); }}>신규게임</li>
                        {sessionStorage.getItem("loginId") ? <li id="test2" className={activeIndex == 4 ? "active" : ""} onClick={() => { tabClickHandler(4); changeTab('main-recomm'); }}>추천게임</li>
                            : ""}
                    </ul>
                </div>
                <div id="board-search2">
                    <div class="container-comm">
                        <div class="search-window">
                            <div class="search-wrap">
                                <input type="text" placeholder="검색어를 입력해주세요." value={keyword} onChange={(e) => setKeyword(e.target.value)} />
                                <button type="button" class="btn btn-dark" onClick={() => { search('search'); }}>검색</button>



                            </div>
                        </div>
                    </div>
                </div>
                <br></br>
                <ul className="list">


                    {items && chose !== 'main-recomm' ? items.filter(data => parseInt(data.price_overview.final / 100) < props.price || data.is_free == true)
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

                        )) : !load ? items.filter(data => parseInt(data['price_overview.final'] / 100) < props.price || data['is_free'] == true)
                            .map((data, index) => (

                                <li className="list-item" onClick={() => urlLink(data['steam_appid'])}>
                                    <div className="list-item__image">
                                        <img src={data['header_image']} alt="Thumbnail" />
                                    </div>
                                    <div className="list-item__content">
                                        <div className='price'><p key={index}>{data['price_overview.final_formatted']}</p></div>
                                        <h4>{data['name']}</h4>

                                        <p>{data['short_description']}</p>
                                    </div>

                                </li>)) : <div className='Circular'>
                        <br></br><br></br>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <CircularProgress size="10rem" />
                        </Box></div>}
                                

                    {chose == 'main-recomm' ? "" : chose == 'search' ? "" : <div ref={obsRef}></div>}


                </ul>
            </div>
        </div>

    );
}



export default Game;