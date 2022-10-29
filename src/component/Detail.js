import React from 'react';
import './Login.css';





function Login(){

  
    return(

      <div id="board_read">
      <h2>제목</h2>
        <div id="user_info">
          id
            <div id="bo_line"></div>
          </div>
          <div id="bo_content">
           내용
          </div>
      <div id="bo_ser">
        <ul>
          <li><a href="/">[목록으로]</a></li>
          <li><a href="modify.php?idx=<?php echo $board['idx']; ?>">[수정]</a></li>
          <li><a href="delete.php?idx=<?php echo $board['idx']; ?>">[삭제]</a></li>
        </ul>
      </div>
    </div>

    );
}



    export default Login;