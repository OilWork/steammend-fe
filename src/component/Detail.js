import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import './Detail.css';
import axios from 'axios';
import { Link } from "react-router-dom";






function Detail(props) {
  
  const [detail, setDatail] = useState({
    title: '',
    header:'',
    memberId: '',
    hit: '',
    content:'',
    createdAt:'',
    updatedAt:'',
    deleted:'',
  });

  const { no } = useParams();
  const navigate = useNavigate();

  useEffect(()=> {
    getDetail();

}, []);
const update = () =>{
  navigate('/Write',{state:{
    title: detail.title,
    content: detail.content,
    head: detail.header,
    no: no
  }});
};

const getDetail = async () => {

await axios.get(`/api/community?id=${no}`).then((res) => {
    setDatail(res.data);
    console.log(res.data);
    })
}

  return (

    <>
    <br></br>
      <h2 align="center" className="title-h2">게시글 상세정보</h2>
      <br></br>
      <div className="post-view-wrapper">
        {
          detail ? (
            <>
              <div className="post-view-row">
                <label>게시글 번호</label>
                <label>{no}</label>
              </div>
              <div className="post-view-row">
                <label>제목</label>
                <label>{detail.title}</label>
              </div>
              <div className="post-view-row">
                <label>글머리</label>
                <label>{detail.header}</label>
              </div>
              <div className="post-view-row">
                <label>작성자</label>
                <label>{detail.memberId}</label>
              </div>
              <div className="post-view-row">
                <label>작성일</label>
                <label>{detail.createdAt}</label>
              </div>
              <div className="post-view-row">
                <label>수정일</label>
                <label>{detail.updatedAt}</label>
              </div>
              <div className="post-view-row">
                <label>조회수</label>
                <label>{detail.hit}</label>
              </div>
              <div className="post-view-row">
                <label>내용</label>
                <div>
                  {detail.content}
                </div>
              </div>
            </>
          ) : '해당 게시글을 찾을 수 없습니다.'
        }
        <button className="post-view-go-list-btn" onClick={() => navigate(-1)}>목록으로 돌아가기</button>
        {sessionStorage.getItem('loginId')==detail.memberId ? <button className="post-view-go-list-btn" onClick={update}>수정하기</button> : ""}
        
      </div>
    </>

  );
}



export default Detail;