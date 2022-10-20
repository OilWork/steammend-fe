import React from 'react';
import './Login.css';





function Login(){

  
    return(

  <div>

<div class="wrapper">

<input id="signUpBtn" class="signUpBtn" type="radio" name="btn" checked />
<label for="signUpBtn"></label>

<input id="loginButton" class="loginBtn" type="radio" name="btn" />
<label for="loginButton"></label>

<form action="" class="form">
  <label for="fname" class="fname"></label>
  <input type="text" id="fname" class="fname" placeholder="First Name" />

  <label for="lname" class="lname"></label>
  <input type="text" id="lname" class="lname" placeholder="Last Name" />

  <label for="email" class="email"></label>
  <input type="email" id="email" class="email" placeholder="Email" />

  <label for="secret" class="pass"></label>
  <input type="password" id="secret" class="pass" placeholder="Password" />

  <input type="checkbox" id="formButton" class="formButton" />
  <label for="formButtom"></label>
</form>
</div>
        </div>

    );
}



    export default Login;