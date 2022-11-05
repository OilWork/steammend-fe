import React, { useEffect, useState, useCallback } from 'react';
import './Comm.css';
import { Link } from "react-router-dom";
import axios from 'axios';

function Comm() {
    const [commPage, setCommPage] = useState(0);

    const [dataList, setDataList] = useState();
    useEffect(() => {
        getItems();

    }, [commPage]);


    const getItems = useCallback(async () => {

        await axios.get('/api/allCommunity?page=0').then((res) => {
            setDataList(res.data);
            console.log(res.data);
            // setItems(prev => prev.concat(res.data));
        })
    }, [commPage])



    const [commActiveIndex, setCommActiveIndex] = useState(0);
    const tabClickHandler = (index) => {
        setCommActiveIndex(index)
    }

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
                        <li id="test" className={commActiveIndex == 0 ? "active" : ""} onClick={() => { tabClickHandler(0);}}>인기순</li>
                        <li id="test2" className={commActiveIndex == 1 ? "active" : ""} onClick={() => { tabClickHandler(1);}}>무료게임</li>
                        <li id="test2" className={commActiveIndex == 2 ? "active" : ""} onClick={() => { tabClickHandler(2);}}>세일중인 게임</li>
                        <li id="test2" className={commActiveIndex == 3 ? "active" : ""} onClick={() => { tabClickHandler(3);}}>신규게임</li>
                        
                    </ul>
                </div>
                <div id="board-search">
                    <div class="container-comm">
                        <div class="search-window">
                            <form action="">
                                <div class="search-wrap">
                                    <input id="search" type="search" name="" placeholder="검색어를 입력해주세요." value="" />
                                    <button type="submit" class="btn btn-dark">검색</button>


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
                            <th width="100">제목</th>
                            <th width="120">글쓴이</th>
                            <th width="100">작성일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataList && dataList.map((item, index) => (

                            <tr key={index}>

                                <td>{item.id}</td>
                                <td><Link to={`/Detail/${item.id}`}>{item.title}</Link></td>
                                <td>{item.memberId}</td>
                                <td>{item.createdAt}</td>

                            </tr>

                        ))}

                    </tbody>
                </table>
            </div>

        </section>
    );
}

export default Comm;