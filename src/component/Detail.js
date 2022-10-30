import React, { useState } from 'react';
import { useParams, useNavigate, Navigate} from 'react-router-dom';
import './Detail.css';






function Detail(props){
  const data = {
                title : '제목',
                createDate : '오늘',
                readCount: 10};


  const { no } = useParams();
  const navigate = useNavigate();

    return(

      <>
      <h2 align="center" className="title-h2">게시글 상세정보</h2>

      <div className="post-view-wrapper">
        {
          data ? (
            <>
              <div className="post-view-row">
                <label>게시글 번호</label>
                <label>{no}</label>
              </div>
              <div className="post-view-row">
                <label>제목</label>
                <label>{ data.title }</label>
              </div>
              <div className="post-view-row">
                <label>작성일</label>
                <label>{ data.createDate }</label>
              </div>
              <div className="post-view-row">
                <label>조회수</label>
                <label>{ data.readCount }</label>
              </div>
              <div className="post-view-row">
                <label>내용</label>
                <div>
                  {
                    data.content
                  }
                </div>
              </div>
            </>
          ) : '해당 게시글을 찾을 수 없습니다.'
        }
        <button className="post-view-go-list-btn" onClick={() => navigate(-1)}>목록으로 돌아가기</button>
      </div>
    </>

    );
}



    export default Detail;