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
        if(chose === tab){
            return;
        }
        setPage(0);
        setItems([]);
        setChose(tab);
    }

    const search = (tab) => {
        if(chose === tab){
            return;
        }
        setPage(0);
        setItems([]);
        setChose(tab);
        setActiveIndex(6);
    }

    useEffect(() => {
        const observer = new IntersectionObserver(obsHandler, { threshold: 1 });
        if (obsRef.current) observer.observe(obsRef.current);
        return () => { observer.disconnect(); }
    }, []);

    const obsHandler = ((entries) => {
        const target = entries[0];
        if (!endRef.current && target.isIntersecting && preventRef.current && document.documentElement.clientHeight < document.documentElement.scrollHeight) { 
            preventRef.current = false; 
            setPage(prev => prev + 1); 
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
        let url = '';
        switch (chose) {
            case 'main-recomm':
                url = `/api2/${chose}?id=${JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('loginId'), sessionStorage.getItem("NickName")).toString(CryptoJS.enc.Utf8))['id']}`
                break;
            case 'search':
                url = `/api2/${chose}?start=${page}&keyword=${keyword}`
                break;
            default:
                url = `/api2/${chose}?start=${page}`
        }       
        await axios.get(url).then((res) => {
            if (res.data.length === 0) {
                alert("검색결과가 없습니다");
                return;
            } 
            if (res.data.is_success === false) {
                switch(res.data.error_code){
                    case 1:
                        alert("계정의 플레이타임이 존재하지 않습니다");
                        window.location.replace("/");
                        return;
                    default :
                        alert("로그인이 만료되었습니다 다시 로그인해주십시오");
                        props.logout();
                        return;
                }
            } else {
                setLoad(false);
                preventRef.current = true;
                if (res.data.length < 30) {
                    endRef.current = true;
                }
            }
            setItems(prev => prev.concat(res.data));
        }).catch(error => {
            if (error.response.status === 500) {
                alert("잘못된 steamId64 입니다");
                window.location.replace("/");
            } else {
                alert("예상치 못한 오류가 발생하였습니다");
                window.location.replace("/");
            }
        })
    }, [page, chose, activeIndex]);




    return (
        <div>
            <div className="list-wrapper">
                <div className="tabs_wrap">
                    <ul>
                        <li id="test" className={activeIndex === 0 ? "active" : ""} onClick={() => { tabClickHandler(0); changeTab('all'); }}>인기게임</li>
                        <li id="test2" className={activeIndex === 1 ? "active" : ""} onClick={() => { tabClickHandler(1); changeTab('free'); }}>무료게임</li>
                        <li id="test2" className={activeIndex === 2 ? "active" : ""} onClick={() => { tabClickHandler(2); changeTab('sale'); }}>세일중인 게임</li>
                        <li id="test2" className={activeIndex === 3 ? "active" : ""} onClick={() => { tabClickHandler(3); changeTab('new'); }}>신규게임</li>
                        {sessionStorage.getItem("loginId") ? <li id="test2" className={activeIndex === 4 ? "active" : ""} onClick={() => { tabClickHandler(4); changeTab('main-recomm'); }}>추천게임</li>
                            : ""}
                    </ul>
                </div>
                <div id="board-search2">
                    <div className="container-comm">
                        <div className="search-window">
                            <div className="search-wrap">
                                <input type="text" placeholder="검색어를 입력해주세요." value={keyword} onChange={(e) => setKeyword(e.target.value)} />
                                <button type="button" className="btn btn-dark" onClick={() => { search('search'); }}>검색</button>



                            </div>
                        </div>
                    </div>
                </div>
                <br></br>
                <ul className="list">
                    {items && chose !== 'main-recomm' ?
                        props.gameTab === "All" ?
                            items.filter(data => (parseInt(data.price_overview.final / 100) < props.price || data.is_free === true) && data['required_age'] <= props.age).map((data, index) => (

                                <li className="list-item" onClick={() => urlLink(data.steam_appid)} key={index}>
                                    <div className="list-item__image">
                                        <img src={data.header_image} alt="Thumbnail" />
                                    </div>
                                    <div className="list-item__content">
                                        <div className='price'><p>{data.price_overview.final_formatted}</p></div>
                                        <h4>{data.name}</h4>

                                        <p>{data.short_description}</p>
                                    </div>

                                </li>

                            )) :
                            items.filter(data => (parseInt(data.price_overview.final / 100) < props.price || data.is_free === true) && data['required_age'] <= props.age && data.genres.some(temp => temp.description === props.gameTab))
                                .map((data, index) => (

                                    <li className="list-item" onClick={() => urlLink(data.steam_appid)} key={index}>
                                        <div className="list-item__image">
                                            <img src={data.header_image} alt="Thumbnail" />
                                        </div>
                                        <div className="list-item__content">
                                            <div className='price'><p>{data.price_overview.final_formatted}</p></div>
                                            <h4>{data.name}</h4>

                                            <p>{data.short_description}</p>
                                        </div>

                                    </li>

                                )) :
                        !load ? items.filter(data => (parseInt(data['price_overview.final'] / 100) < props.price || data['is_free'] === true) && data['required_age'] < props.age)
                            .map((data, index) => (
                                <li className="list-item" onClick={() => urlLink(data['steam_appid'])} key={index}>
                                    <div className="list-item__image">
                                        <img src={data['header_image']} alt="Thumbnail" />
                                    </div>
                                    <div className="list-item__content">
                                        <div className='price'><p>{data['price_overview.final_formatted']}</p></div>
                                        <h4>{data['name']}</h4>
                                        <p>{data['short_description']}</p>
                                    </div>
                                </li>)) :
                            <div className='Circular'>
                                <br></br><br></br>

                                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <CircularProgress size="10rem" />
                                </Box></div>}

                </ul>
            </div>
            {chose === 'main-recomm' ? "" : chose === 'search' ? "" : <div ref={obsRef}></div>}
        </div>

    );
}



export default Game;