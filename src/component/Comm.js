import React, { useEffect, useState, useCallback } from 'react';
import './Comm.css';
import { Link } from "react-router-dom";
import axios from 'axios';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function Comm() {
    const [commPage, setCommPage] = useState(1);
    const [endPage, setEndPage] = useState(true);
    const [dataList, setDataList] = useState();
    const [searchComm, setSearchComm] = useState("");
    const [view, setView] = useState("all");
    const [filterHeader, setFilterHeader] = useState();
    const [commActiveIndex, setCommActiveIndex] = useState(0);

    useEffect(() => {
        getItems();
    }, [commPage, commActiveIndex, view]);


    const getItems = useCallback(async () => {
        if (view == 'all') {
            var url = `/api/allCommunity?page=${commPage}`
        }
        if (view == 'search') {
            var url = `api/search?page=${commPage}&keyword=${filterHeader}`
        }
        await axios.get(url).then((res) => {
            setEndPage(true);
            setDataList(res.data);
            if (res.data.length < 10) {
                setEndPage(false);
            }
        })
    }, [commPage, commActiveIndex, view]);



    const tabClickHandler = (commIndex, header) => {
        setCommActiveIndex(commIndex);
        if (commIndex === 0) {
            setCommPage('sada')
            setDataList();
            setView('all');
            setEndPage(true);
            setCommPage(1);
        } if (!commIndex == 0) {
            setCommPage('sada')
            setView('search');
            setFilterHeader(header);
            setCommPage(1);
        }
    };

    const searchButton = (() => {
        setCommActiveIndex(1344);
        setCommPage('sada')
        setView('search');
        setFilterHeader(searchComm);
        setCommPage(1);

    });

    const forward = (() => {
        setCommPage(prev => prev + 1);
    });
    const backward = (() => {
        setCommPage(prev => prev - 1);
    });
    return (

        <section class="notice">
            <div class="page-title">
                <div class="container">
                    <h3>커뮤니티</h3>
                </div>
            </div>
            <div className="list-wrapper">
                <div className="tabs_wrap">
                    <ul>
                        <li id="test" className={commActiveIndex == 0 ? "active" : ""} onClick={() => { tabClickHandler(0, ''); }}>전체</li>
                        <li id="test2" className={commActiveIndex == 1 ? "active" : ""} onClick={() => { tabClickHandler(1, '잡담'); }}>잡담</li>
                        <li id="test2" className={commActiveIndex == 2 ? "active" : ""} onClick={() => { tabClickHandler(2, '파티 모집'); }}>파티 모집</li>
                        <li id="test2" className={commActiveIndex == 3 ? "active" : ""} onClick={() => { tabClickHandler(3, '공략'); }}>공략</li>

                    </ul>
                </div>
                <div id="board-search">
                    <div class="container-comm">
                        <div class="search-window">
                            <form action="">
                                <div class="search-wrap">
                                    <input type="text" placeholder="검색어를 입력해주세요." value={searchComm} onChange={(e) => setSearchComm(e.target.value)} />
                                    <button type="button" class="btn btn-dark" onClick={() => { searchButton() }}>검색</button>


                                </div>
                                {sessionStorage.getItem('loginId') ? <Link to='/Write'><button type="submit" class="btn btn-dark">게시글 작성</button></Link>
                                    : ""}

                            </form>

                        </div>
                    </div>
                </div>
            </div>

            <div id="board_area_in">
                <table class="list-table">
                    <thead>
                        <tr>
                            <th width="70">번호</th>
                            <th width="120">제목</th>
                            <th width="70">글쓴이</th>
                            <th width="50">조회수</th>
                            <th width="70">작성일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataList && dataList.map((item, index) => (

                            <tr key={index}>

                                <td>{item.id}</td>
                                <td><Link to={`/Detail/${item.id}`}>{item.title}</Link></td>
                                <td>{item.memberId}</td>
                                <td>{item.hit}</td>
                                <td>{item.createdAt}</td>

                            </tr>

                        ))}
                    </tbody>

                </table>
                <br></br>
                <div className='pageArrow'>
                    {commPage == 1 ? "" : <ArrowBackIosIcon sx={{ fontSize: 40 }} onClick={backward}></ArrowBackIosIcon>}

                    {endPage ? <ArrowForwardIosIcon sx={{ fontSize: 40 }} onClick={forward}></ArrowForwardIosIcon> : ""}

                </div>
            </div>

        </section>
    );
}

export default Comm;