import React, { useEffect, useState } from 'react';
import './Comm.css';
import { Link } from "react-router-dom";


function Comm() {

    const [dataList, setDataList] = useState({
        no: 1,
        item: [{
            no: '1',
            title: '제목12',
            autor: '나님',
            data: '오늘'
        }, {
            no: '1',
            title: '제목12',
            autor: '나님',
            data: '오늘'
        }]
    });
 

    return (

        <section class="notice">
            <div class="page-title">
                <div class="container">
                    <h3>커뮤니티</h3>
                </div>
            </div>

            <div id="board-search">
                <div class="container-comm">
                    <div class="search-window">
                        <form action="">
                            <div class="search-wrap">
                                <label for="search" class="blind">공지사항 내용 검색</label>
                                <input id="search" type="search" name="" placeholder="검색어를 입력해주세요." value="" />
                                <button type="submit" class="btn btn-dark">검색</button>


                            </div>
                            <Link to='/Write'><button type="submit" class="btn btn-dark">게시글 작성</button></Link>
                        </form>

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
                        {dataList && dataList.item.map((item, index) => (
                            
                            <tr key={index}>
                                
                                <td>{item.no}</td>
                                <td><Link to={`/Detail/${item.no}`}>{item.title}</Link></td>
                                <td>{item.autor}</td>
                                <td>{item.data}</td>
                               
                            </tr>
                            
                        ))}

                    </tbody>
                    <tbody>
                        <tr>
                            <td>2</td>
                            <td> 제목 </td>
                            <td>글쓴이</td>
                            <td>작성일</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </section>
    );
}

export default Comm;