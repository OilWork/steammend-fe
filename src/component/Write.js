import React, { useEffect, useState } from 'react';
import './Write.css';
import axios from 'axios';
import { useLocation } from 'react-router-dom';


function Write() {
    const [head, setHead] = useState('잡담');
    const [title, setTitle] = useState('');
    const [context, setContext] = useState('');
    const [number, setNumber] = useState();
    const location = useLocation();

    


    useEffect(()=>{
        if(location.state){
            console.log(location.state.no);
            setHead(location.state.head);
            setContext(location.state.content);
            setTitle(location.state.title)
        }
    },[]);

    const posting = () => {
        const sendParam = {
            memberId: sessionStorage.getItem('loginId'),
            header: head,
            title: title,
            content: context
        }

        axios.post("/api/add", sendParam)
            .then((res) => {
                if(res.data==true){
                    alert('작성이 완료되었습니다');
                }else{
                    alert('오류가 발생하였습니다 다시 시도해주세요');
                }
                console.log(res);
            })
            .catch((error) => {
                alert('오류가 발생하였습니다 다시 시도해주세요');
                console.log(error.response);
            })
    }

    const update = () => {
        const sendParam = {
            id: location.state.no,
            memberId: sessionStorage.getItem('loginId'),
            header: head,
            title: title,
            content: context
        }

        axios.post("/api/modify", sendParam)
            .then((res) => {
                if(res.data==true){
                    alert('수정이 완료되었습니다');
                }else{
                    alert('오류가 발생하였습니다 다시 시도해주세요');
                }
                console.log(res);
            })
            .catch((error) => {
                alert('오류가 발생하였습니다 다시 시도해주세요');
                console.log(error.response);
            })
    }

    return (



        <div id="board_write">
            <br></br>
            <br></br>
            <h4>글을 작성하는 공간입니다.</h4>
            <br></br>
            <br></br>
            <form>
                <div class="row">
                    <div class="col-25">
                        <label for="fname">제목</label>
                    </div>
                    <div class="col-75">
                        <input type="text" id="fname" name="firstname" value={title} placeholder="제목" onChange={(e) => setTitle(e.target.value)} ></input>
                    </div>
                </div>
                <div class="row">
                    <div class="col-25">
                        <label for="country">글머리</label>
                    </div>
                    <div class="col-75">
                        <select id="head" name="head" value={head} onChange={(e) => setHead(e.target.value)} >
                            <option value="잡담">잡담</option>
                            <option value="파티 모집">파티 모집</option>
                            <option value="공략">공략</option>
                        </select>
                    </div>
                </div>
                <div class="row">
                    <div class="col-25">
                        <label for="subject">내용</label>
                    </div>
                    <div class="col-75">
                        <textarea id="subject" name="subject" value={context} placeholder="내용" onChange={(e) => setContext(e.target.value)}></textarea>
                    </div>
                </div>
                <br></br>
                <div class="row">
                    {location.state ?  <button type='button' onClick={update} > 수정 </button> :  <button type='button' onClick={posting} > 입력 </button>}
                   
                </div>
            </form>
        </div>
    );
}

export default Write;

