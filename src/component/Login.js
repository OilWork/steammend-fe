import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './Login.css';
import dayjs from 'dayjs';
import 'dayjs/locale/ko'
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';




function Login() {
  const [joinId, setJoinId] = useState("");
  const [joinPw, setJoinPw] = useState("");
  const [joinName, setJoinName] = useState("");
  const [joinNickName, setJoinNickName] = useState("");
  const [joinBirthday, setJoinBirthday] = useState("");
  const [joinSteam_Id, setJoinSteam_id] = useState("");

  const [check, setCheck] = useState("");

  const [loginId, setLoginId] = useState("");
  const [loginPw, setLoginPw] = useState("");

  let sessionStorage = window.sessionStorage;

  const navigate = useNavigate();

  const dateFormat = dayjs(joinBirthday).format("YYYY-MM-DD");


  async function postLogin() {

    try {
      //응답 성공 
      const response = await axios.post("/api/userlogin.do", null, {
        params: {
          id: loginId,
          pw: loginPw
        }
      });
      if (response.data === 'fail') {
        console.log(response);
        alert('잘못된 아이디 혹은 비밀번호 입니다')
      } else {
        console.log(response);
        sessionStorage.setItem("loginId", response.data[0]);
        sessionStorage.setItem("NickName", response.data[1]);
        console.log(sessionStorage.getItem("loginId"));
        navigate(-1);
      }


    } catch (error) {
      //응답 실패
      console.error(error);
    }
  }



  async function postSignUp() {

    try {
      //응답 성공 
      const response = await axios.post("/api/join.do", null, {
        params: {
          id: joinId,
          pw: joinPw,
          name: joinName,
          nickname: joinNickName,
          birthday: dateFormat,
          steam_id: joinSteam_Id
        }
      });
      console.log(response);
      alert("가입이 완료되었습니다");
    } catch (error) {
      //응답 실패
      console.error(error);
    }
  }

  async function checkId() {

    try {
      //응답 성공 
      const response = await axios.post("/api/idcheck.do", null, {
        params: {
          check_id: joinId
        }
      });
      if (response.data == '가입 가능') {
        setCheck("사용가능한 ID입니다");
      } else {
        setCheck("중복되는 ID입니다");
      }
    } catch (error) {
      console.error(error);
    }
  }


  return (

    <div>
      <div class="login-box">
        <h2>Login</h2>
        <form>
          <div class="user-box">
            <input type="text" value={loginId} onChange={(e) => setLoginId(e.target.value)} required="" />
            <label>Username</label>
          </div>
          <div class="user-box">
            <input type="password" value={loginPw} onChange={(e) => setLoginPw(e.target.value)} required="" />
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

      <div class="login-box2">
        <h2>Sign up</h2>
        <form>
          <div class="user-box">
            <input type="text" value={joinId} onChange={(e) => setJoinId(e.target.value)} required="" />
            <label>ID</label>
          </div>
          <p className="logCheck" onClick={checkId}>중복 확인</p>
          <p className="checkResult">{check}</p>
          <br></br>
          <br></br>
          <div class="user-box">
            <input type="password" value={joinPw} onChange={(e) => setJoinPw(e.target.value)} required="" />
            <label>Password</label>
          </div>
          <div class="user-box">
            <input type="text" value={joinName} onChange={(e) => setJoinName(e.target.value)} required="" />
            <label>Name</label>
          </div>
          <div class="user-box">
            <input type="text" value={joinNickName} onChange={(e) => setJoinNickName(e.target.value)} required="" />
            <label>NickName</label>
          </div>
          <div class="user-box">
            <input type="text" value={joinSteam_Id}  onChange={(e) => setJoinSteam_id(e.target.value)} required="" />
            <label>steam_id</label>
          </div>
          <div class="user-box">
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