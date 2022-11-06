import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Detail.css';
import axios from 'axios';
import CryptoJS from 'crypto-js';




function Detail(props) {

  const [detail, setDatail] = useState({
    title: '',
    header: '',
    memberId: '',
    hit: '',
    content: '',
    createdAt: '',
    updatedAt: '',
    deleted: '',
  });
  const [commentWrite, setCommentWrite] = useState('');
  const [allComment, setAllComment] = useState();
  const [commentUpdate, setCommentUpdate] = useState(true);
  const { no } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getDetail();
    getComment();
  }, [commentUpdate]);
  const update = () => {
    navigate('/Write', {
      state: {
        title: detail.title,
        content: detail.content,
        head: detail.header,
        no: no
      }
    });
  };

  const deletePost = () => {
    const sendParam = {
      memberid: detail.memberId,
      id: no,
      header: detail.header,
      title: detail.title,
      content: detail.content
    }

    axios.post("/api/delete", sendParam)
        .then((res) => {
            window.location.replace("/Comm");
        })
        .catch((error) => {
            alert('오류가 발생하였습니다 다시 시도해주세요');
        })
}

  const getDetail = async () => {

    await axios.get(`/api/community?id=${no}`).then((res) => {
      setDatail(res.data);
    })
  }

  const getComment = async () => {

    await axios.get(`/api/reply/allReply?communityId=${no}`).then((response) => {
      setAllComment(response.data);
      setCommentUpdate(true);
    })
  }

 

  const addComment = () => {
    const sendParam = {
      communityId: no,
      memberId: JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('loginId'), sessionStorage.getItem("NickName")).toString(CryptoJS.enc.Utf8))['id'],
      content: commentWrite
    }

    axios.post("/api/reply/add", sendParam)
        .then((res) => {
          setCommentUpdate(false);
        })
        .catch((error) => {
            alert('오류가 발생하였습니다 다시 시도해주세요');
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



        <div class="actionBox">
          <ul class="commentList">
          {allComment ? allComment.map((item, index) =>(
            <li>
              <div class="commentText" key={index}>
                <p class="">{item.content}</p> 
                <span class="date sub-text">{item.createdAt}</span>
                <span class="date sub-text">{item.memberId}</span>
              </div>
            </li>
          )): ""}

          </ul>
          {sessionStorage.getItem('loginId') ? <form class="form-inline" role="form">
            <div class="form-group">
              <input class="form-control" type="text" value={commentWrite} placeholder="Your comments" onChange={(e) => setCommentWrite(e.target.value)}/>
            </div>
            <div class="form-group">
              <button type="button" class="btn btn-default" onClick={addComment}>Add</button>
            </div>
          </form> : ""}
          
        </div>


        <button className="post-view-go-list-btn" onClick={() => navigate(-1)}>목록으로 돌아가기</button>
        {JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('loginId'), sessionStorage.getItem("NickName")).toString(CryptoJS.enc.Utf8))['id'] == detail.memberId ? <><button className="post-view-go-list-btn" onClick={update}>수정하기</button>
        <button className="post-view-go-list-btn" onClick={deletePost}>삭제하기</button></> : ""}

      </div>
    </>

  );
}



export default Detail;