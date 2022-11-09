import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import dayjs from 'dayjs';
import 'dayjs/locale/ko'
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import CryptoJS from 'crypto-js';




function Login() {
  const [joinId, setJoinId] = useState("");
  const [joinPw, setJoinPw] = useState("");
  const [joinName, setJoinName] = useState("");
  const [joinNickName, setJoinNickName] = useState("");
  const [joinBirthday, setJoinBirthday] = useState("");
  const [joinSteam_Id, setJoinSteam_id] = useState("");
  const [joinPwCheck, setJoinPwCheck] = useState("");

  const [check, setCheck] = useState("");

  const [loginId, setLoginId] = useState("");
  const [loginPw, setLoginPw] = useState("");

  let sessionStorage = window.sessionStorage;

  const navigate = useNavigate();

  const dateFormat = dayjs(joinBirthday).format("YYYY-MM-DD");


  async function postLogin() {

    try {
      const response = await axios.post("/api/userlogin.do", null, {
        params: {
          id: loginId,
          pw: loginPw
        }
      });
      if (response.data === 'fail') {
        alert('잘못된 아이디 혹은 비밀번호 입니다')
      } else {
        const temp = {
          id : response.data[0]
        }
        sessionStorage.setItem("loginId", CryptoJS.AES.encrypt(JSON.stringify(temp), response.data[1]).toString());
        sessionStorage.setItem("NickName", response.data[1]);
        navigate(-1);
      }


    } catch (error) {
      alert("예상치 못한 에러가 발생했습니다");
      window.location.replace('/');
      console.error(error);
    }
  };



  async function postSignUp() {
    if(!joinId){
      alert('ID를 입력해주세요');
      return;
    }else if(joinId.length<5){
      alert('ID는 5글자 이상 작성해주세요')
      return;
    }else if(!joinPw){
      alert('PW를 입력해주세요');
      return;
    }else if(!joinName){
      alert('이름을 입력해주세요');
      return;
    }else if(!joinNickName){
      alert('닉네임을 입력해주세요');
      return;
    }else if(!joinSteam_Id){
      alert('SteamID를 입력해주세요');
      return;
    }else if(!joinBirthday){
      alert('생일을 입력해주세요');
      return;
    }
    switch(check){
      case false:
        alert("ID중복검사를 해주세요");
        return;
      case true:
        break;
      default:
    }
    
    
    try {
      await axios.post("/api/join.do", null, {
        params: {
          id: joinId,
          pw: joinPw,
          name: joinName,
          nickname: joinNickName,
          birthday: dateFormat,
          steam_id: joinSteam_Id
        }
      });
      alert("가입이 완료되었습니다");
      window.location.replace('/Login');
    } catch (error) {
      alert("예상치 못한 에러가 발생했습니다");
      window.location.replace('/');
      console.error(error);
    }
  };

  async function checkId() {

    try {
      const response = await axios.post("/api/idcheck.do", null, {
        params: {
          check_id: joinId
        }
      });
      if (response.data === '가입 가능') {
        setCheck("사용가능한 ID입니다");
      } else {
        setCheck('중복된 ID입니다');
      }
    } catch (error) {
      alert("예상치 못한 에러가 발생했습니다");
      console.error(error);
    }
  };

  const findSteamId64 = ()=>{
    window.open('https://steamid.xyz/', '_blank');

  }


  return (

    <div>
      <div className="login-box">
        <h2>Login</h2>
        <form>
          <div className="user-box">
            <input type="text" value={loginId} onChange={(e) => setLoginId(e.target.value)} required />
            <label>Username</label>
          </div>
          <div className="user-box">
            <input type="password" value={loginPw} onChange={(e) => setLoginPw(e.target.value)} required />
            <label>Password</label>
          </div>
          <a onClick={postLogin}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Submit
          </a>
        </form>
      </div>

      <div className="login-box2">
        <h2>Sign up</h2>
        <form>
          <div className="user-box">
            <input type="text" value={joinId} onChange={(e) => {setJoinId(e.target.value); setCheck('');}} required />
            <label>ID</label>
          </div>
          <p className="logCheck" onClick={checkId}>중복 확인</p>
          {check ? <p className="checkResult">{check}</p> : <p className="checkResult" onClick={checkId}>{check}</p>}
          {joinId.length >= 5 ? '': joinId.length===0 ? '' : <p className='infoCheck'>Id는 5글자 이상 작성해주세요</p>}
          <br></br>
          <br></br>
          <div className="user-box">
            <input type="password" value={joinPw} onChange={(e) => setJoinPw(e.target.value)} required />
            <label>Password</label>
            
          </div>
          <div className="user-box">
            <input type="password" value={joinPwCheck} onChange={(e) => setJoinPwCheck(e.target.value)} required />
            <label>Check Password</label>
            {joinPwCheck ? joinPw !== joinPwCheck ? <p className='infoCheck'>비밀번호가 일치하지 않습니다</p> : '' : ''}
          </div>
          <div className="user-box">
            <input type="text" value={joinName} onChange={(e) => setJoinName(e.target.value)} required />
            <label>Name</label>
          </div>
          <div className="user-box">
            <input type="text" value={joinNickName} onChange={(e) => setJoinNickName(e.target.value)} required />
            <label>NickName</label>
          </div>
          <div className="user-box">
            <input className='idLink' type="text" value={joinSteam_Id} onChange={(e) => setJoinSteam_id(e.target.value)} required />
            <label>steamId64</label>
            <p className="logCheck" onClick={findSteamId64}>Find steamId64</p>
            {joinSteam_Id.length !== 0 && (joinSteam_Id.length<17 || joinSteam_Id.length>17) && joinSteam_Id.slice(0,2) !==76 ? <p className='infoCheck'>SteamID64는 76으로 시작하는 17자리의 숫자 입니다</p>: ""}

          </div>
          <br></br>
          <br></br>
          <div className="user-box">
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='ko'>

              <DesktopDatePicker
                label="BirthDay"
                value={joinBirthday}
                inputFormat={"YYYY-MM-DD"}
                mask={"____-__-__"}
                onChange={(newValue) => {
                  setJoinBirthday(newValue);
                }}
                renderInput={(params) => <TextField {...params} fullWidth sx={{
                  svg: { color: '#03e9f4' },
                  label: { color: '#03e9f4' },
                  input: { color: '#03e9f4' }
                }} />}
              />
            </LocalizationProvider>

          </div>

          <a onClick={postSignUp}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Submit
          </a>
        </form>
      </div>

    </div>

  );
}



export default Login;