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
    const [filterHeader, setFilterHeader] = useState("");
    const [commActiveIndex, setCommActiveIndex] = useState(0);

    useEffect(() => {
        getItems();
    }, [commPage, commActiveIndex, view]);


    const getItems = useCallback(async () => {
        switch(view){
            case 'all':
                var url = `/api/allCommunity?page=${commPage}`;
                break;
            case 'search':
                var url = `/api/search?page=${commPage}&keyword=${filterHeader}`
                break;
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
            setCommPage(1);
            setDataList();
            setView('all');
        } if (commIndex !== 0) {
            setCommPage(1);
            setDataList();
            setView('search');
            setFilterHeader(header);
        }
        // console.log(header);
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

    const dateFormatter = (writeDate) =>{
        let temp = writeDate.split('T');

        let today = new Date();   

        let year = today.getFullYear(); // 년도
        let month = today.getMonth() + 1;  // 월
        let date = today.getDate();  // 날짜
        if(date < 10){
            date = `0${date}`
        }
        if(`${year}-${month}-${date}` === temp[0]){
            return temp[1]
        }else{
            return temp[0]
        }
    
    }

    return (

        <section className="notice">
            <div className="page-title">
                <div className="container">
                    <h3>커뮤니티</h3>
                </div>
            </div>
            <div className="list-wrapper">
                <div className="tabs_wrap">
                    <ul>
                        <li id="test" className={commActiveIndex === 0 ? "active" : ""} onClick={() => { tabClickHandler(0, ''); }}>전체</li>
                        <li id="test2" className={commActiveIndex === 1 ? "active" : ""} onClick={() => { tabClickHandler(1, '잡담'); }}>잡담</li>
                        <li id="test2" className={commActiveIndex === 2 ? "active" : ""} onClick={() => { tabClickHandler(2, '파티 모집'); }}>파티 모집</li>
                        <li id="test2" className={commActiveIndex === 3 ? "active" : ""} onClick={() => { tabClickHandler(3, '공략'); }}>공략</li>

                    </ul>
                </div>
                <div id="board-search">
                    <div className="container-comm">
                        <div className="search-window">
                            <form action="">
                                <div className="search-wrap">
                                    <input type="text" placeholder="검색어를 입력해주세요." value={searchComm} onChange={(e) => setSearchComm(e.target.value)} />
                                    <button type="button" className="btn btn-dark" onClick={() => { searchButton() }}>검색</button>


                                </div>
                                {sessionStorage.getItem('loginId') ? <Link to='/Write'><button type="submit" className="btn btn-dark">게시글 작성</button></Link>
                                    : ""}

                            </form>

                        </div>
                    </div>
                </div>
            </div>

            <div id="board_area_in">
                <table className="list-table">
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
                                <td>{dateFormatter(item.createdAt)}</td>

                            </tr>

                        ))}
                    </tbody>

                </table>
                <br></br>
                <div className='pageArrow'>
                    {commPage === 1 ? "" : <ArrowBackIosIcon sx={{ fontSize: 40 }} onClick={backward}></ArrowBackIosIcon>}

                    {endPage ? <ArrowForwardIosIcon sx={{ fontSize: 40 }} onClick={forward}></ArrowForwardIosIcon> : ""}

                </div>
            </div>

        </section>
    );
}

export default Comm;